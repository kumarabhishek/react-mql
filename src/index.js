/**
 * Copyright (c) 2018-present, Kumar Abhishek.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
const Context = React.createContext();
export const MediaContext = Context.Consumer;

class MqlProvider extends React.Component {

	constructor (props) {
		super(props);
		this.state = {};
		this.handlerMap = {};
		this.subscribe = this.subscribe.bind(this);
		this.unSubscribe = this.unSubscribe.bind(this);
	}

	getHandler (name) {
		return {
			handler: e => { this.setState({ [name]: e.matches }); }, name
		};
	}

	subscribe () {
		let currentMatches = {};
		Object.keys(this.props.list).map(m => {
			const mqObj = window.matchMedia(this.props.list[m]);
			const handlerObj = this.getHandler(m);
			mqObj.addListener(handlerObj.handler);
			currentMatches[m] = mqObj.matches;
			this.handlerMap[m] = { handlerObj: handlerObj, mqObj };
		});
		this.setState(currentMatches);
	}

	unSubscribe () {
		Object.keys(this.handlerMap).map(m => {
			this.handlerMap[m].mqObj.removeListener(this.handlerMap[m].handlerObj.handler);
		});
		this.handlerMap = {};
	}

	componentDidMount () {
		this.props.list && typeof (this.props.list) === 'object' && this.subscribe();
	}

	componentWillUnmount () { this.unSubscribe(); }

	render () {
		if (Object.keys(this.state).length !== 0) {
			return <Context.Provider value={this.state}>
				{this.props.children}
			</Context.Provider>;
		} else {
			return this.props.children;
		}
	}
}

const Media = (props) => {
	let { children, ...other } = props;
	if (children && typeof (children) === 'function') {
		return <MqlProvider {...other}>
			<MediaContext>
				{ v => v && children(v) }
			</MediaContext>
		</MqlProvider>;
	} else {
		return null;
	}
};

export default Media;
