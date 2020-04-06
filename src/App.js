import React from 'react';
import {Input, Container, Menu, Segment} from 'semantic-ui-react'

class PartyCheckMenu extends Menu {
  render() {
    const {activeItem} = this.state

    return (
      <Menu>
        <Container>
          <Menu.Item
            name='Home'
            active={activeItem === 'home'}
            onCLick={this.props.onCLick}
          />
        </Container>
      </Menu>
    );
  }
}

class Header extends React.Component {
  render() {
    return (
      <PartyCheckMenu
        onCLick={this.props.onCLick}
      />
    );
  }
}

class FFLogsInput extends Input {
  render() {
    return (
      <div>
        <Input
          fluid
          icon = 'search'
          iconPosition = 'left'
          name = "fflogslink"
          placeholder = 'Paste your FFLogs Profile'
          onChange = {this.props.onChange}
        />
      </div>
    );
  }
}

class PartyCheck extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      link: null,
    }
  }

  goHome(i) {
    return;
  }

  checkAndGo(i) {
    if (i.target.value === 'https://www.fflogs.com/user/reports-list/237412/')
    {
      console.log(true);
      return;
    }
    else
    {
      console.log(false);
      return;
    }
  }

  render() {
    return (
      <div>
        <Header
          onCLick={this.goHome}
        />
        <Container>
          <Segment>
            <div>
              <FFLogsInput
                onChange = {this.checkAndGo}
              />
            </div>
          </Segment>
        </Container>
      </div>
    );
  }
}

function App() {
  return (
    <html>
      <PartyCheck />
    </html>
  );
}

export default App;
