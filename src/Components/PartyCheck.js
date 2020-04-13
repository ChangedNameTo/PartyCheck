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
  const [percentage, setPercentage] = useState([]);
  const [fightChoices, setFightChoices] = useState([]);
  const [jobChoices, setJobChoices] = useState([]);

  // When the username changes, queries fflogs api and sets the reports output
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

  // Processes the reports output into useful information for the rows and filters
  useEffect(() => {
    const collapseAlliesInJob = allies => {
      return Object.keys(allies).reduce(
        (acc, cur) => ({
          ...acc,
          [cur]: allies[cur].flatMap(f => f.fights.map(x => ({ ...x, job: f.job })))
        }),
        {}
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

    const pullJobs = fightArray => {
      return fightArray
        .map((curr) => {
          return curr.job
        })
    }

    const filterJobs = allies => {
      if(!Array.isArray(allies)) {
        // Job Names
        // Takes the fight object in the form of {"Ally Name":[Fights]}
        // Returns the array of [{key:JobName,text:JobName,value:JobName}]
        const jobChoiceNames = Object.keys(allies).reduce((acc,key) => {
          return [...acc,...pullJobs(allies[key])]
        },[]).filter((job,ind,arr) => {
          return (arr.indexOf(job) === ind)
        })

        const jobChoiceOption = jobChoiceNames.map((job) => {
          return {key:job,text:job,value:job}
        })
        setJobChoices(jobChoiceOption)

        // Filters based on job names
        console.log(allies)

        let newAllies = {}
        const filteredOutJobs =  Object.keys(allies).filter((ally) => {
          let allyFightFiltered = allies[ally].filter((fights) => {
            // Are options set? Filter. If not, return fights
            if((options.jobs.value) && (options.jobs.value.length > 0)) {
              if((options.jobs.value.indexOf(fights.job) !== -1)){
                return(fights)
              }
            }
            else{
              return fights
            }
          })
          if(allyFightFiltered.length > 0) {
            newAllies[ally] = allyFightFiltered
          }
        })
        
        return newAllies
      }
      else {
        return allies
      }
    }

    const generateFilters = allies => {
      const alliesFilteredJobs = filterJobs(allies);
      // Fight Names

      return alliesFilteredJobs;
    }

    const calculatePercentage = fights => {
      const allies = getAllies(fights)
      const filteredAllies = generateFilters(allies)

      const collapsedInJob = collapseAlliesInJob(filteredAllies);

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

    if (reports && reports.data) {
      Promise.all(
        reports.data
          .filter(report => report.title === "Eden's Verse" || report.title === "Trials (Extreme)")
          .map(report => axios.get(`https://www.fflogs.com/v1/report/fights/${report.id}?api_key=${API_KEY}`))
      ).then(result => {
        const fights = result.flatMap((r) => r.data);
        const calPercentage = calculatePercentage(fights)
        // setPercentage(calPercentage);
      });


    }
  },[reports,setPercentage,options])

  


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
                  fightChoices={fightChoices}
                  jobChoices={jobChoices}
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