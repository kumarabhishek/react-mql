import React from 'react';
import { MediaContext } from '../src';

export default class CompMatchesUsingMediaContext extends React.Component {
	render() {
		return <MediaContext>
			{ v => (
				<div style={{ background: v.bigScreen ? '#aaccee' : '#66ccaa', padding: '0.5rem' }}>
					<h3>Component with matches using MediaContext</h3>
					<h4>CSS Media Query Matches:<br/>{JSON.stringify(v, 4)}</h4>
				</div>
			)}
		</MediaContext>;
	}
};
