import React, { useState, useEffect, Fragment } from 'react';
import {Input, Container, Segment, Table, Button, Icon, Message, Dimmer, Loader} from 'semantic-ui-react'
var format = require('string-template');
const axios = require('axios').default;
require('dotenv').config();

const API_KEY = '57867123b1f24ca0a00384cdb92cc4c7';

function FFLogsInput(props) {
  const [username, setUsername] = useState('');

  const handleChange = (x) => {if(x !== username) {
    setUsername(x.value)}};

  return (
    <div>
      <Input
        fluid
        action={{
          color: 'green',
          labelPosition: 'left',
          icon: 'search',
          content: 'Search',
          onClick:() => props.onClick(username),
        }}
        onChange ={(e,username) => handleChange(username)}
        icon = 'search'
        iconPosition = 'left'
        name = "fflogslink"
        placeholder = 'Enter your FFLogs Username'
      />
    </div>
  );
}

function PartyTableRow(props) {
  const [visible, setVisible] = useState(false);

  const showFights = () => {
    setVisible(!visible)
  }

  const subRows = () => {
    if(visible) {
      return (
        props.fights.map((x,i) => {
          const fight_date = new Date(x.realtime).toDateString();
          return(
            <Fragment>
              <Table.Row>
                <Table.Cell>{fight_date}</Table.Cell>
                <Table.Cell>{x.zoneName}</Table.Cell>
                <Table.Cell>{(x.bossPercentage / 100)}</Table.Cell>
                <Table.Cell></Table.Cell>
              </Table.Row>
            </Fragment>
          );
        })
      );
    }
  };

  return(
    <Fragment>
      <Table.Row>
        <Table.Cell>{props.name}</Table.Cell>
        <Table.Cell>{props.fights.length}</Table.Cell>
        <Table.Cell>{props.percentage}</Table.Cell>
        <Table.Cell>
          <Button
            key={props.name}
            onClick={() => showFights()}
          >
            Show Fights <Icon name="angle double down" />
          </Button>
        </Table.Cell>
      </Table.Row>
      {subRows()}
    </Fragment>
  );
}

const getAllies = fights => {
  return fights
    .flatMap(fight =>
      fight.friendlies.reduce(
        (acc, friendly) => ({
          ...acc,
          [friendly.name]: {
            fights: friendly.fights.map(({ id }) => {
              return {...fight.fights[id - 1],realtime:(fight.start + fight.fights[id - 1].start_time)}
            }),
            job: friendly.type,
          }
        }),
        {}
      )
    )
    .reduce(
      (merge, entries) =>
        Object.keys(entries).reduce(
          (acc, key) => ({
            ...acc,
            [key]: (acc[key] || []).concat(entries[key])
          }),
          merge
        ),
      {}
    );
}

const collapseAlliesInJob = allies => {
  return Object.keys(allies).reduce(
    (acc, cur) => ({
      ...acc,
      [cur]: allies[cur].flatMap(f => f.fights.map(x => ({ ...x, job: f.job })))
    }),
    {}
  );
}

const calculatePercentage = fights => {
  const collapsedInJob = collapseAlliesInJob(getAllies(fights));

  return Object.keys(collapsedInJob).map((x) => {
    return {
      name: x,
      fights: collapsedInJob[x],
      percentage: collapsedInJob[x]
        .reduce(
          (acc, cur, _, src) =>
            acc + (!isNaN(parseInt(cur.bossPercentage)) ? parseInt(cur.bossPercentage) : 0) / 100 / src.length,
          0
        )
        .toFixed(2),
      pulls:collapsedInJob[x].length,
    };
  });
};

const sortHelper = (percentage,column) => [].concat(percentage).sort((a,b) => a[column] - b[column])

function PartyTable({ reports }) {
  const [percentage, setPercentage] = useState([]);
  const [column, setColumn] = useState('pulls');
  const [direction, setDirection] = useState('descending');

  useEffect(() => {
    if (reports && reports.data) {
      Promise.all(
        reports.data
          .filter(report => report.title === "Eden's Verse" || report.title === "Trials (Extreme)")
          .map(report => axios.get(`https://www.fflogs.com/v1/report/fights/${report.id}?api_key=${API_KEY}`))
      ).then(result => {
        const fights = result.flatMap((r) => r.data);
        setPercentage(calculatePercentage(fights));
      });
    }
  }, [reports, setPercentage]);

  const handleSort = clickedColumn => {
    if(column !== clickedColumn) {
      setColumn(clickedColumn);
      setDirection(direction);
    } else {
      setDirection(direction === 'ascending' ? 'descending' :'ascending');
    }
  }

  const data = direction === 'ascending' ? sortHelper(percentage,column) : sortHelper(percentage,column).reverse();

  const partyTableRow = () => {
    if(data.length > 0 && !(reports === null)) {
      return data.map(ally =>
        <PartyTableRow
          key={ally.name}
          name={ally.name}
          pulls={ally.pulls}
          fights={ally.fights}
          percentage={ally.percentage}
        />)
    }
    else if (!(reports === null)){
      return (
        <Table.Row>
          <Table.Cell colSpan='4'>
            <Segment>
              <Dimmer active>
                <Loader />
              </Dimmer>
            </Segment>
          </Table.Cell>
        </Table.Row>
      );
    }
  }

  return (
    <Container>
      <Table compact celled sortable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>
              Name/Job
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={column === 'pulls' ? direction : null}
              onClick={() => handleSort('pulls')}
            >
              # Pulls
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={column === 'percentage' ? direction : null}
              onClick={() => handleSort('percentage')}
            >
              Avg. Boss % (0 is a kill)
            </Table.HeaderCell>
            <Table.HeaderCell>
              Actions
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {partyTableRow()}
        </Table.Body>
      </Table>
    </Container>
  );
}

class PartyCheck extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      link: null,
      reports: null,
      fights:null,
      error:null,
    }

    this.checkAndGo = this.checkAndGo.bind(this);
  }

  goHome(i) {
    return;
  }

  checkAndGo(username) {
    if (username)
    {
      this.setState({
        link: username,
        error:false,
      });

      const report_query = format("https://www.fflogs.com/v1/reports/user/{username}?api_key={api_key}", {
        username:username,
        api_key:API_KEY,
      });

      axios.get(report_query)
        .then((response) => {
          this.setState({
            reports:response,
          });
        })
        .catch((error) => {
          this.setState({
            reports:null,
            error:true,
          });
        });
    }
    return;
  }

  displayTable() {
    if(!this.state.error && this.state.reports) {
      return (<PartyTable
        link={this.state.link}
        reports={this.state.reports}
      />);
    }
    else if (this.state.error) {
      return (
      <Container>
        <Message warning>
          <Icon name='error' />
          You need to enter a valid FFLogs username.
        </Message>
      </Container>);
    }
    else {
      return(
        <Container>
          <Message>
            <Message.Header>Welcome to PartyCheck!</Message.Header>
            <p>
              Please enter a valid FFLogs username.
            </p>
          </Message>
        </Container>
      );
    }
  }

  render() {
    return (
      <div>
        <Container />
        <Container>
          <Segment>
            <div>
              <FFLogsInput
                onClick = {this.checkAndGo}
              />
            </div>
          </Segment>
        </Container>
        <br></br>
        {this.displayTable()}
      </div>
    );
  }
}

function App() {
  return (
    <PartyCheck />
  );
}

export default App;