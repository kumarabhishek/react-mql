import React from 'react';
import Media from '../src';
import CompStateless from './comp_stateless.jsx';
import CompMatchesUsingMediaContext from './comp_matches_using_media_context.jsx';
import CompMatchesAsProps from './comp_matches_as_props.jsx';


export default class extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      enabled: true
    }
    
    this.list = {
      bigScreen: '(min-width: 100px) and (max-width: 1080px)',
      landscape: '(orientation: landscape)'
    };
  }

  render(){
    return <React.Fragment>
      <h2>Resize browser window and observe changes in values as below:</h2>
      <button onClick={() => { this.setState({enabled: !this.state.enabled});}}>Toggle listening for MediaQueryList</button>
      <Media enabled={this.state.enabled} list={this.list} dev>
        {CompStateless}
      </Media>
      <Media enabled={this.state.enabled} list={this.list} dev>
        { () => <CompMatchesUsingMediaContext />}
      </Media>
      <Media enabled={this.state.enabled} list={this.list} dev>
        { v => <CompMatchesAsProps {...v}/>}
      </Media>
    </React.Fragment>;
  }
};
