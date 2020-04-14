import React, {useState} from 'react';
import {Input} from 'semantic-ui-react';

function FFLogsInput(props) {
  const [username, setUsername] = useState('');

  const handleChange = (x) => {if(x !== username) {
    setUsername(x.value)}};

  return (
    <div>
      <Input
        fluid
        action={{
          color: 'green',
          labelPosition: 'left',
          icon: 'search',
          content: 'Search',
          onClick:() => props.onClick(username),
        }}
        onChange ={(e,username) => handleChange(username)}
        icon = 'search'
        iconPosition = 'left'
        name = "fflogslink"
        placeholder = 'Enter your FFLogs Username'
      />
    </div>
  );
}

export default FFLogsInput;