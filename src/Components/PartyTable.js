import React, {useState} from 'react';
import {Table,Segment,Dimmer,Container,Loader} from 'semantic-ui-react';

import PartyTableRow from './PartyTableRow'

function PartyTable(props) {
  const [column, setColumn] = useState('pulls');
  const [direction, setDirection] = useState('descending');

  const handleSort = clickedColumn => {
    if(column !== clickedColumn) {
      setColumn(clickedColumn);
      setDirection(direction);
    } else {
      setDirection(direction === 'ascending' ? 'descending' :'ascending');
    }
  }

  const sortHelper = (percentage,column) => [].concat(props.allies).sort((a,b) => a[column] - b[column])

  const data = direction === 'ascending' ? sortHelper(props.allies,column) : sortHelper(props.percentage,column).reverse();

  const partyTableRow = () => {
    if(data.length > 0 && !(props.allies === null)) {
      return data.map(ally =>
        <PartyTableRow
          key={ally.name}
          name={ally.name}
          pulls={ally.pulls}
          fights={ally.fights}
          percentage={ally.percentage}
        />)
    }
    else if (!(props.allies === null)){
      return (
        <Table.Row>
          <Table.Cell colSpan='5'>
            <Segment>
              <Dimmer active>
                <Loader />
              </Dimmer>
            </Segment>
          </Table.Cell>
        </Table.Row>
      );
    }
  }

  return (
    <Container>
      <Table compact celled sortable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>
              Name
            </Table.HeaderCell>
            <Table.HeaderCell>
              Server/Job
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={column === 'pulls' ? direction : null}
              onClick={() => handleSort('pulls')}
            >
              # Pulls
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={column === 'percentage' ? direction : null}
              onClick={() => handleSort('percentage')}
            >
              Avg. Boss % (0 is a kill)
            </Table.HeaderCell>
            <Table.HeaderCell>
              Actions
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {partyTableRow()}
        </Table.Body>
      </Table>
    </Container>
  );
}

export default PartyTable;