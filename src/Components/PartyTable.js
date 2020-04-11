import React, {useState, useEffect} from 'react';
import {Table,Segment,Dimmer,Container,Loader} from 'semantic-ui-react';

import PartyTableRow from './PartyTableRow'

const axios = require('axios').default;

const API_KEY = '57867123b1f24ca0a00384cdb92cc4c7';

const collapseAlliesInJob = allies => {
  return Object.keys(allies).reduce(
    (acc, cur) => ({
      ...acc,
      [cur]: allies[cur].flatMap(f => f.fights.map(x => ({ ...x, job: f.job })))
    }),
    {}
  );
}

const calculatePercentage = fights => {
  const collapsedInJob = collapseAlliesInJob(getAllies(fights));

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

const sortHelper = (percentage,column) => [].concat(percentage).sort((a,b) => a[column] - b[column])

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

function PartyTable({ reports }) {
  const [percentage, setPercentage] = useState([]);
  const [column, setColumn] = useState('pulls');
  const [direction, setDirection] = useState('descending');

  useEffect(() => {
    if (reports && reports.data) {
      Promise.all(
        reports.data
          .filter(report => report.title === "Eden's Verse" || report.title === "Trials (Extreme)")
          .map(report => axios.get(`https://www.fflogs.com/v1/report/fights/${report.id}?api_key=${API_KEY}`))
      ).then(result => {
        const fights = result.flatMap((r) => r.data);
        setPercentage(calculatePercentage(fights));
      });
    }
  }, [reports, setPercentage]);

  const handleSort = clickedColumn => {
    if(column !== clickedColumn) {
      setColumn(clickedColumn);
      setDirection(direction);
    } else {
      setDirection(direction === 'ascending' ? 'descending' :'ascending');
    }
  }

  const data = direction === 'ascending' ? sortHelper(percentage,column) : sortHelper(percentage,column).reverse();

  const partyTableRow = () => {
    if(data.length > 0 && !(reports === null)) {
      return data.map(ally =>
        <PartyTableRow
          key={ally.name}
          name={ally.name}
          pulls={ally.pulls}
          fights={ally.fights}
          percentage={ally.percentage}
        />)
    }
    else if (!(reports === null)){
      return (
        <Table.Row>
          <Table.Cell colSpan='4'>
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
              Name/Job
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