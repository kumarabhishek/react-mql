import React from 'react';

export default class CompMatchesAsProps extends React.Component {
  render() {
    return <div style={{background: '#eeccee', padding: '0.5rem'}}>
      <h3>Component with matches coming from passed props</h3>
      <h4>CSS Media Query Matches:<br/>{JSON.stringify(this.props)}</h4>
    </div>;
  }
};
