import React, {useState, Fragment} from 'react';
import {Dropdown,Segment,Header, Button, Grid} from 'semantic-ui-react';

function PartyTableOptions(props) {
  const options = [
    {
      key:'edensversesavage', text:"Eden's Verse: Fulmination (Savage)", value:'edensversesavage'
    }
  ]

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
                  selection
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
                  <Button color='green'>Kills</Button>
                  <Button.Or />
                  <Button color='yellow'>All</Button>
                  <Button.Or />
                  <Button color='red'>Wipes</Button>
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