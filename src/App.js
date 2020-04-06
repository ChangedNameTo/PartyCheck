import React from 'react';
import {Input, Container} from 'semantic-ui-react'

const ConsoleLog = ({ children }) => {
  console.log(children);
  return false;
};

class FFLogsInput extends Input {
  constructor(props) {
    super(props);
    this.state = {
      link: null,
    }
  }

  checkAndGo() {
    this.state.link = i;
    return (i === 'https://www.fflogs.com/user/reports-list/237412/');
  }

  render() {
    return (
      <div>
        <ConsoleLog>{this.state.link}</ConsoleLog>
        <Input
          placeholder = 'Paste your FFLogs Profile'
          onChange = {this.checkAndGo()}
        />
      </div>
    );
  }
}

class PartyCheck extends React.Component {
  render() {
    return (
      <Container>
        <div>
          <FFLogsInput />
        </div>
      </Container>
    );
  }
}

function App() {
  return (
    <PartyCheck />
  );
}

export default App;
