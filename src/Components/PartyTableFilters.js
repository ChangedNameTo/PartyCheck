import React from 'react';
import {Icon,Button,Container} from 'semantic-ui-react'

function PartyTableFilters(props) {
  const showOptionsButton = () => {
    if(!props.visible) {
      return <Icon name="angle double down" />
    }
    else {
      return <Icon name="angle double up" />
    }
  }

  return(
    <Container>
      <Button
        onClick={props.onClick}
      >
        Options {showOptionsButton()}
      </Button>
    </Container>
  );
}

export default PartyTableFilters;