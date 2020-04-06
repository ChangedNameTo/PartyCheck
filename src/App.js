import React from 'react';
import {Input, Container, Menu, Segment, Table} from 'semantic-ui-react'
import rp from "request-promise";

class PartyCheckMenu extends Menu {
  render() {
    const {activeItem} = this.state

    return (
      <Menu>
        <Container>
          <Menu.Item
            name='Home'
            active={activeItem === 'home'}
            onClick={this.props.onClick}
          />
        </Container>
      </Menu>
    );
  }
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

class FFLogsInput extends Input {
  render() {
    return (
      <div>
        <Input
          fluid
          icon = 'search'
          iconPosition = 'left'
          name = "fflogslink"
          placeholder = 'Paste your FFLogs Profile'
          onChange = {this.props.onChange}
        />
      </div>
    );
  }
}

function PartyTableRows(props) {
  rp(props.link)
    .then(html => console.log(html))
  console.log('blah')
  return(
    <Table.Row>
      <Table.Cell>1</Table.Cell>
      <Table.Cell>2</Table.Cell>
      <Table.Cell>3</Table.Cell>
      <Table.Cell>4</Table.Cell>
    </Table.Row>
  );
}

class PartyTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      link: props.link,
    }
    console.log(this.state.link);
  }

  generateTable() {
    if(this.state.link){
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
            <PartyTableRows
              link={this.state.link}
            />
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

  render() {
    return (
      this.generateTable()
    );
  }
}

class PartyCheck extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      link: null,
    }

    this.checkAndGo = this.checkAndGo.bind(this);
  }

  goHome(i) {
    return;
  }

  checkAndGo(i) {
    if (i.target.value === 'https://www.fflogs.com/user/reports-list/237412/')
    {
      this.setState({
        link: i.target.value,
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
