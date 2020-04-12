import React, {useState,useEffect, Fragment} from 'react';
import {Dropdown,Segment,Header, Button, Grid} from 'semantic-ui-react';

function PartyTableOptions(props) {
  console.log(props)
  const options = [
    {
      key:'edensversesavage',
      text:"Eden's Verse: Fulmination (Savage)", value:'edensversesavage'
    }
  ]

  const jobsChangeOptions = (jobs) => {
    if(jobs !== props.options.jobs) {
      props.setOptions({
        fights:props.options.fights,
        jobs:jobs,
        kills:props.options.kills
      })
    }
  }

  const fightsChangeOptions = (fights) => {
    if(fights !== props.options.fights) {
      props.setOptions({
        fights:fights,
        jobs:props.options.jobs,
        kills:props.options.kills
      })
    }
  }

  const killsChangeOptions = (kills) => {
    if(kills !== props.options.kills) {
      props.setOptions({
        fights:props.options.fights,
        jobs:props.options.jobs,
        kills:kills
      })
    }
  }

  if(props.visible){
    return (
      <Grid>
        <Grid.Row>
          <Grid.Column
            width={5}
          >
            <Segment.Group vertical >
              <Segment>
                <Header
                  as='h4'
                >
                  Fights
                </Header>
              </Segment>
              <Segment>
                <Dropdown
                  placeholder='Fight Names'
                  fluid
                  multiple
                  selection
                  search
                  onChange={(e,fights) => fightsChangeOptions(fights)}
                  options={options}
                >

                </Dropdown>
              </Segment>
            </Segment.Group>
          </Grid.Column>
          <Grid.Column
            width={6}
          >
            <Segment.Group vertical>
              <Segment>
                <Header
                  as='h4'
                >
                  Jobs
                </Header>
              </Segment>
              <Segment>
                <Dropdown
                  placeholder='Fight Names'
                  fluid
                  multiple
                  search
                  selection
                  onChange={(e,jobs) => jobsChangeOptions(jobs)}
                  options={options}/>
              </Segment>
            </Segment.Group>
          </Grid.Column>
          <Grid.Column
            width={5}
          >
            <Segment.Group vertical>
              <Segment>
                <Header
                  as='h4'
                >
                  Kills
                </Header>
              </Segment>
              <Segment>
                <Button.Group>
                  <Button
                    color={props.options.kills === 0 ? 'green' : 'standard'}
                    onClick={() => killsChangeOptions(0)}
                  >
                    Kills
                  </Button>
                  <Button.Or />
                  <Button
                    color={props.options.kills === 1 ? 'yellow' : 'standard'}
                    onClick={() => killsChangeOptions(1)}
                  >
                    All
                  </Button>
                  <Button.Or />
                  <Button
                    color={props.options.kills === 2 ? 'red' : 'standard'}
                    onClick={() => killsChangeOptions(2)}
                  >
                    Wipes
                  </Button>
                </Button.Group>
              </Segment>
            </Segment.Group>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
  else {
    return <Fragment />;
  }
}

export default PartyTableOptions;