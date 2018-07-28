import React from 'react';
import Media from '../src';
import CompStateless from './comp_stateless.jsx';
import CompMatchesUsingMediaContext from './comp_matches_using_media_context.jsx';
import CompMatchesAsProps from './comp_matches_as_props.jsx';


export default class App extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			enabled: true
		}
		
		this.list = {
			bigScreen: '(min-width: 1080px) and (max-width: 1920px)',
			landscape: '(orientation: landscape)'
		};
	}

	render(){
		return <React.Fragment>
			<h2>Resize browser / rotate your mobile and observe changes in values as below:</h2>
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
}
