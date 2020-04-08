import React, { useState, useEffect } from 'react';
import {Input, Container, Menu, Segment, Table, Button, Icon} from 'semantic-ui-react'
var format = require('string-template');
const axios = require('axios').default;
require('dotenv').config();

const API_KEY = '57867123b1f24ca0a00384cdb92cc4c7';

function PartyCheckMenu(props) {
  return (
    <Menu>
      <Container>
        <Menu.Item
          name='Home'
          onClick={props.onClick}
        />
      </Container>
    </Menu>
  );
}

class Header extends React.Component {
  render() {
    return (
      <PartyCheckMenu
        onCLick={this.props.onCLick}
      />
    );
  }
}

function FFLogsInput(props) {
  return (
    <div>
      <Input
        fluid
        icon = 'search'
        iconPosition = 'left'
        name = "fflogslink"
        placeholder = 'Enter your FFLogs Username'
        onChange = {props.onChange}
      />
    </div>
  );
}

function PartyTableRow(props) {
  const pulls = props.fights
    .map(x => x.fights)
    .reduce((acc,curr) => [...acc,...curr],[]);

  // const avgPercentage = props.fights
  //   .map(x => x.fights)
  //   .reduce((acc,curr) => [...acc,...curr],[])
  //   .reduce((acc,curr) => acc.concat(parseInt(curr.bossPercentage)/100),[])
  //   .reduce((acc,curr,idx,src) => {
  //     if(!isNaN(curr)) {
  //       return (acc + (curr/src.length));
  //     }
  //     else {
  //       return acc;
  //     }
  //   },0).toFixed(2);

    const avgPercentage = props.fights
      .map(x => x.fights)
      .reduce((acc,curr) => [...acc,...curr],[])
      .reduce((acc,curr) => acc.concat(parseInt(curr.bossPercentage)/100),[])
      .reduce((acc,curr,idx,src) => (!isNaN(curr) ? (acc + (curr/src.length)) : (acc)),0)
      .toFixed(2);


  return(
    <Table.Row>
      <Table.Cell>{props.name}</Table.Cell>
      <Table.Cell>{pulls.length}</Table.Cell>
      <Table.Cell>{avgPercentage}</Table.Cell>
      <Table.Cell><Button>Show Fights <Icon name="angle double down" /></Button></Table.Cell>
    </Table.Row>
  );
}

function PartyTable({ reports }) {
  const [fights, setFights] = useState([]);
  useEffect(() => {
    if (reports && reports.data) {
      Promise.all(
        reports.data
          .filter(report => report.title === "Eden's Verse" || report.title === "Trials (Extreme)")
          .map(report => axios.get(`https://www.fflogs.com/v1/report/fights/${report.id}?api_key=${API_KEY}`))
      ).then(result => {
        setFights(result.flatMap((r) => r.data));
      });
    }
  }, [reports, setFights]);

  const allies = fights.flatMap(fight => {
    let allyobj = {};
    fight.friendlies.forEach(friendly => {
      let fightArr = [];
      friendly.fights.forEach(fFight => fightArr.push(fight.fights[fFight.id - 1]));
      allyobj[friendly.name] = {fights:[]}
      allyobj[friendly.name].fights = fightArr;
      allyobj[friendly.name].job = friendly.type;
    });
    return allyobj;
  });

  const flatAllies = allies.reduce((merge, entries) =>
    Object.keys(entries).reduce(
      (acc, key) => ({ ...acc, [key]: (acc[key] || []).concat(entries[key]) }),
      merge
    ),{});

  return (
    <Container>
      <Table compact celled sortable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Name/Job</Table.HeaderCell>
            <Table.HeaderCell># Pulls</Table.HeaderCell>
            <Table.HeaderCell># Kills</Table.HeaderCell>
            <Table.HeaderCell>Actions</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {Object.keys(flatAllies).map(ally => <PartyTableRow key={ally} name={ally} fights={flatAllies[ally]} />)}
        </Table.Body>
        {/* <Table.Footer>
          <Table.Row>
            <Table.HeaderCell colspan='4'>
              <Menu floated='right' pagination>
                <Menu.Item as='a' icon>
                  <Icon name='chevron left' />
                </Menu.Item>
                <Menu.Item as='a'>1</Menu.Item>
                <Menu.Item as='a'>2</Menu.Item>
                <Menu.Item as='a'>3</Menu.Item>
                <Menu.Item as='a'>4</Menu.Item>
                <Menu.Item as='a' icon>
                  <Icon name='chevron right' />
                </Menu.Item>
              </Menu>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer> */}
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
    }

    this.checkAndGo = this.checkAndGo.bind(this);
  }

  goHome(i) {
    return;
  }

  checkAndGo(i) {
    if (i.target.value === 'TheAlpacalypse')
    {
      this.setState({
        link: i.target.value,
      });

      const report_query = format("https://www.fflogs.com/v1/reports/user/{username}?api_key={api_key}", {
        username:i.target.value,
        api_key:API_KEY
      });

      axios.get(report_query)
        .then((response) => {
          this.setState({
            reports:response,
          });
        });

    }
    return;
  }

  render() {
    return (
      <div>
        <Header
          onCLick={this.goHome}
        />
        <Container>
          <Segment>
            <div>
              <FFLogsInput
                onChange = {this.checkAndGo}
              />
            </div>
          </Segment>
        </Container>
        <br></br>
        <PartyTable
          link={this.state.link}
          reports={this.state.reports}
        />
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
