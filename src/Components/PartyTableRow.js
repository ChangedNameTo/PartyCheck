import React, {useState, Fragment} from 'react';
import {Table,Icon,Button} from 'semantic-ui-react';

function PartyTableRow(props) {
  const [visible, setVisible] = useState(false);

  const showFights = () => {
    setVisible(!visible)
  }

  const subRows = () => {
    if(visible) {
      return (
        props.fights.map((x,i) => {
          const fight_date = new Date(x.realtime).toDateString();
          return(
            <Fragment>
              <Table.Row>
                {/* <Table.Cell
                  textAlign="right"
                >{fight_date}</Table.Cell>
                <Table.Cell>{x.zoneName}</Table.Cell>
                <Table.Cell>{(x.bossPercentage / 100)}</Table.Cell>
                <Table.Cell></Table.Cell> */}
              </Table.Row>
            </Fragment>
          );
        })
      );
    }
  };

  const showFightsButton = () => {
    if(!visible) {
      return <Icon name="angle double down" />
    }
    else {
      return <Icon name="angle double up" />
    }
  }

  return(
    <Fragment>
      <Table.Row>
        {/* <Table.Cell>{props.name}</Table.Cell>
        <Table.Cell>{props.fights.length}</Table.Cell>
        <Table.Cell>{props.percentage}</Table.Cell>
        <Table.Cell>
          <Button
            key={props.name}
            onClick={() => showFights()}
          >
            Show Fights {showFightsButton()} 
          </Button>
        </Table.Cell> */}
      </Table.Row>
      {subRows()}
    </Fragment>
  );
}

export default PartyTableRow;