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
        'position':'fixed',
        'bottom':0,
      }}
    >
      <Container textAlign='center'>
        <Button
          color="black"
          icon
          inverted
          labelPosition='left'
          href='https://github.com/ChangedNameTo/PartyCheck'
        >
          <Icon name='github' />
          View on Github
        </Button>
        <Button
          color="blue"
          inverted
          icon
          labelPosition='left'
          href='https://www.linkedin.com/in/will--mitch/'
        >
          <Icon name='linkedin' />
          Find me on LinkedIn
        </Button>
      </Container>
    </Segment>
  );
}

export default PartyFooter;