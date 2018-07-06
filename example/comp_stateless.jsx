import React from 'react';
const CompStateless = (props) => {
  return <div style={{background: '#cceecc', padding: '1rem'}}>
    <h3>Stateless Component</h3>
    <h4>CSS Media Query Matches:<br/>{JSON.stringify(props)}</h4>
  </div>
};

export default CompStateless;
