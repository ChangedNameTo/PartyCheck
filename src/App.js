import React from 'react';
import {Input, Container, Menu, Segment, Table} from 'semantic-ui-react'
var format = require('string-template');
const axios = require('axios').default;
require('dotenv').config();

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
  return(
    <Table.Row>
      <Table.Cell>{props.id}</Table.Cell>
      <Table.Cell>{props.title}</Table.Cell>
      <Table.Cell>{props.start}</Table.Cell>
      <Table.Cell>{props.end}</Table.Cell>
    </Table.Row>
  );
}

class PartyTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rows:null,
    }
  }

  render() {
    const reports = this.props.reports;

    if(reports){
      var rows = reports.data.map((report,number) => {
        console.log(report.id);
        return (
          <PartyTableRow
            key={report.id}
            id={report.id}
            title={report.title}
            start={report.start}
            end={report.end}
          />
        )
      });
    }
    else {
      rows = <PartyTableRow/>;
    }

    if(this.props.link){
      return (
        <Container>
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Name/Job</Table.HeaderCell>
                <Table.HeaderCell># Pulls</Table.HeaderCell>
                <Table.HeaderCell># Kills</Table.HeaderCell>
                <Table.HeaderCell>Actions</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {rows}
            </Table.Body>
          </Table>
        </Container>
      );
    }
    else {
      return(
        <Container>
          <Segment>
            Enter a link
          </Segment>
        </Container>
      );
    }
  }
}

class PartyCheck extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      link: null,
      reports: null,
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

      console.log(this.state.link);
      const query = format("https://www.fflogs.com/v1/reports/user/{username}?api_key={api_key}", {
        username:i.target.value,
        // api_key:process.env.API_KEY
        api_key:''
      });

      console.log(query);

      axios.get(query)
        .then((response) => {
          console.log(response);
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
