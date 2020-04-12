import React, { useState,useEffect,Fragment } from 'react';

import {Grid,Container,Segment,Message } from 'semantic-ui-react'

import PartyTable from './PartyTable'
import FFLogsInput from './FFLogsInput'
import PartyTableFilters from './PartyTableFilters';
import PartyTableOptions from './PartyTableOptions';

const axios = require('axios').default;
const API_KEY = '57867123b1f24ca0a00384cdb92cc4c7';

function PartyCheck() {
  const [username,setUsername] = useState(null);
  const [reports,setReports] = useState(null);
  const [error,setError] = useState(false);
  const [visible,setVisible] = useState(false);
  const [options,setOptions] = useState({fights:[],jobs:[],kills:1})

  useEffect(() => {
    if(username) {
      axios
        .get(`https://www.fflogs.com/v1/reports/user/${username}?api_key=${API_KEY}`)
        .then(reports => {
          setReports(reports)
        }).catch((error) => {
          console.log(error);
          setReports(null);
          setError(true);
        })
    }
  },[username])

  const displayTable = () => {
    if(!error && reports) {
      return (
        <PartyTable
          username={username}
          reports={reports}
        />
      );
    }
    else if (error) {
      return (
      <Container>
        <Message error>
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

  const showOptions = () => {
    return setVisible(!visible);
  }

  return (
    <Fragment>
      <br />
      <Container>
        <Segment>
          <Grid>
            <Grid.Row>
              <Grid.Column
                width={13}
              >
                <FFLogsInput
                  onClick = {(i) => setUsername(i)}
                />
              </Grid.Column>
              <Grid.Column
                width={3}
              >
                <PartyTableFilters
                  visible={visible}
                  onClick={() => showOptions()}
                />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column 
                centered="true"
              >
                <PartyTableOptions
                  visible={visible}
                  reports={reports}
                  options={options}
                  setOptions={(newOptions) => setOptions(newOptions)}
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      </Container>
      <br />
      {displayTable()}
      <br />
    </Fragment>
  );
}

export default PartyCheck;