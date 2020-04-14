import React, { Fragment } from 'react';

import PartyFooter from './Components/PartyFooter'
import PartyCheck from './Components/PartyCheck'

require('dotenv').config();

function App() {
  return (
    <Fragment>
      <PartyCheck />
      <PartyFooter />
    </Fragment>
  );
}

export default App;