import React, { Fragment } from 'react';
import { Container, Segment, Button, Icon, Message } from 'semantic-ui-react'

import FFLogsInput from './Components/FFLogsInput'
import PartyTable from './Components/PartyTable'

var format = require('string-template');
const axios = require('axios').default;

require('dotenv').config();

const API_KEY = '57867123b1f24ca0a00384cdb92cc4c7';

function PartyFooter() {
  return(
    <Segment
      inverted
      raised
      vertical
      // color='black'
      style={{
        'width':'100%',
        'height':'60px',
        'background-repeat': 'repeat',
        'background-attachment': 'scroll',
        'background-position': '0% 0%',
        'position':'fixed',
        'bottom':0,
      }}
    >
      <Container textAlign='center'>
        <Button 
          color="black" 
          content='black'
          icon 
          inverted
          labelPosition='left'
          onClick={() => window.open('https://github.com/ChangedNameTo/PartyCheck','_blank')}
        >
          <Icon name='github' />
          View on Github
        </Button>
        <Button 
          color="blue"
          inverted
          icon
          labelPosition='left'
          onClick={() => window.open('https://www.linkedin.com/in/will--mitch/','_blank')}
        >
          <Icon name='linkedin' />
          Find me on LinkedIn
        </Button>
      </Container>
    </Segment>
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
      return (
        <PartyTable
          link={this.state.link}
          reports={this.state.reports}
        />
      );
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
      <Fragment>
        <br />
        <Container>
          <Segment>
            <div>
              <FFLogsInput
                onClick = {this.checkAndGo}
              />
            </div>
          </Segment>
        </Container>
        <br />
        {this.displayTable()}
        <br />
      </Fragment>
    );
  }
}

function App() {
  return (
    <Fragment>
      <PartyCheck />
      <PartyFooter />
    </Fragment>
  );
}

export default App;