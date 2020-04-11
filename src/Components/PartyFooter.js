import React from 'react';
import { Container, Segment, Button, Icon} from 'semantic-ui-react'

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

export default PartyFooter;