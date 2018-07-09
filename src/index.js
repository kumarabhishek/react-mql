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
  
  /**
   * Constructor for MqlProvider
   * @param {Object} props
   */
  constructor(props){
		super(props);
		this.dev = this.props.dev;
		this.state = {};
		this.mqlist = {};
		this.subscribe(props.list);
  }

  /**
   * Get a media_query_list handler closure of given `name` 
   * @param {string} name 
   */
	getHandler(name){
		return {
			handler: e => {
				this.dev && console.log(`react-mql('${name}): matches for ${e.media} is ${e.matches}`);
				this.setState({ [name]: e.matches });
			},
			name
		};
	}

  /**
   * Subscribe for MediaQueryList
   * @param {Object} mqlist Config object of the form { media_query_name: media_query }
   */
	subscribe(mqlist) {
		Object.keys(mqlist).map( m => {
			const mqObj = window.matchMedia(mqlist[m]);
			const handlerObj = this.getHandler(m);
			mqObj.addListener(handlerObj.handler);
			this.dev && console.log(`react-mql('${m}): subscribed to ${mqlist[m]}`);
			this.state[m] = mqObj.matches; // Store current matches in state
			this.mqlist[m] = { handlerObj: handlerObj, mqObj };
		});
	}

  /**
   * Un-subscribe for MediaQueryList
   * @param {Object} mqlist Config object of the form { media_query_name: { handlerObj: media_query_event_handler, mqObj: media_query_object } }
   */
	unSubscribe(mqlist) {
		Object.keys(mqlist).map( m => {
			mqlist[m].mqObj.removeListener(mqlist[m].handlerObj.handler);
			// this.dev && console.log('Unsubscribed MediaQueryListEvent:', m, mqlist[m].handlerObj);
			this.dev && console.log(`react-mql('${m}): unsubscribed to ${mqlist[m].mqObj.media}`);
		});
	}

  componentWillUnmount(){
		this.unSubscribe(this.mqlist);
	}
	
	componentWillReceiveProps(nextProps) {
		if(nextProps.enabled){
			this.subscribe(nextProps.list);
		} else {
			this.unSubscribe(this.mqlist);
		}
	}

  render() {
		if(this.props.enabled){
			return <Context.Provider value={this.state}>
				{this.props.children}
			</Context.Provider>;
		} else return this.props.children;
  }
}

const Media = (props) => {
  const {children, enabled, ...other} = props;
  return <MqlProvider {...other} enabled={enabled}>
    <MediaContext>
      {v => children(v)}
    </MediaContext>
  </MqlProvider>;
};

export default Media;
