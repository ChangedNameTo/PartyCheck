import React, { Fragment } from 'react';

import { Container, Segment, Icon, Message } from 'semantic-ui-react'

import PartyTable from './PartyTable'
import FFLogsInput from './FFLogsInput'

const axios = require('axios').default;
const API_KEY = '57867123b1f24ca0a00384cdb92cc4c7';

var format = require('string-template');

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
        <Message error>
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

export default PartyCheck;