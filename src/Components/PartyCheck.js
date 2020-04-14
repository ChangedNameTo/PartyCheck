import React, { useState,useEffect,Fragment } from 'react';

import { Divider,Grid,Container,Segment,Message } from 'semantic-ui-react'

import PartyTable from './PartyTable'
import FFLogsInput from './FFLogsInput'
import PartyTableFilters from './PartyTableFilters';
import PartyTableOptions from './PartyTableOptions';

const axios = require('axios').default;
const API_KEY = '57867123b1f24ca0a00384cdb92cc4c7';

function PartyCheck() {
  const [username,setUsername] = useState(null);
  const [reports,setReports] = useState(null);
  const [fights,setFights] = useState(null);
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
    if(!fights) return;

    const collapseAlliesInJob = allies => {
      return Object.keys(allies).reduce(
        (acc, cur) => ({
          ...acc,
          [cur]: allies[cur].flatMap(f => f.fights.map(x => ({ ...x, job: f.job, url: f.url, server:f.server })))
        }),
        {}
      );
    }

    const getAllies = fights => {
      return fights
        .flatMap(fight =>
          fight.friendlies.reduce(
            (acc, friendly) => {
              return {
                ...acc,
                [friendly.name]: {
                  fights: friendly.fights.map(({ id }) => {
                    return {...fight.fights[id - 1],realtime:(fight.start + fight.fights[id - 1].start_time)}
                  }),
                  job: friendly.type,
                  server: friendly.server,
                  url:fight.url
                }
              }
            },
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

        let newAllies = {}

        Object.keys(allies).filter((ally) => {
          let allyFightFiltered = allies[ally].filter((fights) => { // eslint-disable-line
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

          return null;
        })
        
        return newAllies
      }
      else {
        return allies
      }
    }

    const pullFights = fightArray => {
      return fightArray
        .reduce((acc,curr) => {
          return [...acc,...curr.fights.map((y) => y.zoneName)]
        },[])
    }

    const filterFights = allies => {
      if(!Array.isArray(allies)) {
        const fightChoiceNames = Object.keys(allies) 
          .reduce((acc,key) => {
            return [...acc,...pullFights(allies[key])]
          },[])
          .filter((fight,ind,arr) => {
            return (arr.indexOf(fight) === ind)
          })
          .filter((fight,ind,arr) => {
            return (fight.includes("(Savage)") || fight.includes("(Extreme)"));
          })

        const fightChoiceOptions = fightChoiceNames.map((job) => {
          return {key:job,text:job,value:job}
        })

        setFightChoices(fightChoiceOptions)

        let newAllies = {}

        Object.keys(allies).filter((ally) => { // eslint-disable-line
          let allyFightFiltered = allies[ally].filter((fights) => { // eslint-disable-line
            // Are options set? Filter. If not, return fights
            if((options.fights.value) && (options.fights.value.length > 0)) {
              const filteredFight =  {fights:fights.fights.filter((x) => options.fights.value.indexOf(x.zoneName) !== -1),job:fights.job}

              if(filteredFight.fights.length > 0) {
                return filteredFight
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

    const filterKills = allies => {
      if(!Array.isArray(allies)) {
        let newAllies = {}

        Object.keys(allies).filter((ally) => { // eslint-disable-line
          const allyKillFiltered = allies[ally].map((fights) => { // eslint-disable-line
            if(options.kills === 0) {
              const filteredFight =  {fights:fights.fights.filter((x) => x.bossPercentage === 0),job:fights.job}

              if(filteredFight.fights.length > 0) {
                return filteredFight
              }
            }
            else if(options.kills === 1) {
              return fights
            }
            else {
              const filteredFight =  {fights:fights.fights.filter((x) => x.bossPercentage !== 0),job:fights.job}

              if(filteredFight.fights.length > 0) {
                return filteredFight
              }
            }
          })
          
          if(allyKillFiltered.indexOf(undefined) === -1) {
            newAllies[ally] = allyKillFiltered
          }
        })
        return newAllies
      }
      else {
        return allies
      }
    }

    const filterNaNs = allies => {
      if(!Array.isArray(allies)) {
        let newAllies = {}

        Object.keys(allies).filter((ally) => { // eslint-disable-line
          const allyKillFiltered = allies[ally].map((fights) => { // eslint-disable-line
            const filteredFight =  {
              fights:fights.fights.filter((x) => x.boss !== 0),
              job:fights.job,
              server:fights.server,
              url:fights.url,
            }

            if(filteredFight.fights.length > 0) {
              return filteredFight
            }
          })
          
          if(allyKillFiltered.indexOf(undefined) === -1) {
            newAllies[ally] = allyKillFiltered
          }
        })
        return newAllies
      }
      else {
        return allies
      }
    }

    const generateFilters = allies => {
      // These aren't actually players but are reported as such in the API. Filtered here.
      delete allies['Limit Break']
      delete allies['Multiple Players']
      delete allies['Ground Effect']
      
      const alliesFilteredJobs = filterJobs(allies);
      const alliesFilteredFights = filterFights(alliesFilteredJobs);
      const alliesFilteredKills = filterKills(alliesFilteredFights);
      const alliesFilteredNaNs = filterNaNs(alliesFilteredKills);

      return alliesFilteredNaNs;
    }

    const calculatePercentage = fights => {
      const allies = getAllies(fights)
      const filteredAllies = generateFilters(allies)

      const collapsedInJob = collapseAlliesInJob(filteredAllies);

      return Object.keys(collapsedInJob)
        .map((x) => {
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
    
    const calPercentage = calculatePercentage(fights)
    setPercentage(calPercentage);
  },[fights,setPercentage,options])

  useEffect(() => {
    if (reports && reports.data) {
      Promise.all(
        reports.data
          .filter(report => report.title === "Eden's Verse" || report.title === "Trials (Extreme)")
          .map(report => axios.get(`https://www.fflogs.com/v1/report/fights/${report.id}?api_key=${API_KEY}`))
      ).then(result => {
        const fights = result.reduce((acc,cur) => {
          const re = /fights\/(\S+)\?/;
          cur.data['url'] = cur.config.url.match(re)[1]
          return [...acc,cur.data]
        },[])
        
        setFights(fights)
      });
    }
  },[reports])

  const displayTable = () => {
    if(!error && fights) {
      return (
        <PartyTable
          allies={percentage}
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
            <Message.Header
              as="h4"
            >Welcome to PartyCheck!</Message.Header>
            <p>
              Please enter a valid FFLogs username.
            </p>
            <Divider />
            <p>
              After having a lot of issues clearing e5s, I started to notice the same people in parties over and over, and wanted a quick way to look through my logs to find them. Please do not use this site for harassment, it is purely for reference.
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
              >
                <FFLogsInput
                  onClick = {(i) => setUsername(i)}
                />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column
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