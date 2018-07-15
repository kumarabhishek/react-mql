import React from 'react';
import ReactDOM from 'react-dom';
import Media, {MediaContext} from '../index';
import renderer from 'react-test-renderer';

const CompStateless = (props) => {
  console.log('CompStateless', props);
  return <div>{JSON.stringify(props)}</div>;
};

class CompMatchesAsProps extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      name: 'Matches as props'
    }
  }
  render() {
    return <div>
      <h1>{this.state.name}</h1>
      <h2>{JSON.stringify(this.props)}</h2>
    </div>;
  }
};

class CompMatchesUsingMediaContext extends React.Component {
  render() {
    return <MediaContext>
      { v => (
        <div>
          {JSON.stringify(v)}
        </div>
      )}
    </MediaContext>;
  }
};

class Wrapper extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      enabled: props.enabled
    }
  }
  componentDidMount(){
    this.setState({enabled: !this.state.enabled});
  }
  render() {
    return <Media enabled={this.state.enabled} list={list}>
      { matches => <CompMatchesAsProps {...matches}/>}
    </Media>;
  }
};

const list = {
	bigScreen: '(min-width: 920px and max-width: 1200px)',
  screen: '(screen)',
  print: '(print)'
};

describe('<Media>', () => {
	let node;
  beforeEach(() => {
    node = document.createElement('div');
	});

  afterEach(() => {
    ReactDOM.unmountComponentAtNode(node);
	});
  
  it('with no query list and no child function', () => {
    const tree = renderer.create(<Media></Media>).toJSON();
    expect(tree).toMatchSnapshot();
  });

	it('with no query list but single child function', () => {
    const tree = renderer.create(<Media>{() => {}}</Media>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('with query list and single child function', () => {
    const tree = renderer.create(<Media list={list}>{() => {}}</Media>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('with query list and single child function receiving initial matches as bigScreen: true', () => {
    const element = (
      <Media enabled={true} list={list}>
        {
          (matches) => {
            expect(matches.bigScreen).toBe(true);
          }
        }
      </Media>
    );
    ReactDOM.render(element, node);
  });

  it('with query list and single child function receiving initial matches as bigScreen: false', () => {
    const element = (
      <Media enabled={true} list={list}>
        {
          (matches) => {
            expect(matches.bigScreen).toBe(false);
          }
        }
      </Media>
    );
    window.resizeTo(900, 600);
    ReactDOM.render(element, node);
  });


  it('with stateless functional component as single child and dev prop passed', () => {
    const element = (
      <Media enabled={true} list={list} dev>
        {CompStateless}
      </Media>
    );
    ReactDOM.render(element, node);
    window.resizeTo(900, 600);
    expect(node.firstChild.innerHTML).toMatch(/bigScreen":false/);
    window.resizeTo(1100, 600);
    expect(node.firstChild.innerHTML).toMatch(/bigScreen":true/);
  });


  it('with function as child passing matches to stateful component CompMatchesAsProps as props', () => {
    const element = (
      <Media enabled={true} list={list}>
        { matches => <CompMatchesAsProps {...matches}/>}
      </Media>
    );
    ReactDOM.render(element, node);
    window.resizeTo(900, 600);
    expect(node.firstChild.innerHTML).toMatch(/bigScreen":false/);
    window.resizeTo(1100, 600);
    expect(node.firstChild.innerHTML).toMatch(/bigScreen":true/);
  });

  it('with function as child passing matches to stateful component CompMatchesUsingMediaContext (using MediaContext) as props', () => {
    const element = (
      <Media enabled={true} list={list}>
        { matches => <CompMatchesUsingMediaContext {...matches}/>}
      </Media>
    );
    ReactDOM.render(element, node);
    window.resizeTo(900, 600);
    expect(node.firstChild.innerHTML).toMatch(/bigScreen":false/);
    window.resizeTo(1100, 600);
    expect(node.firstChild.innerHTML).toMatch(/bigScreen":true/);
  });


  it('with enabled changing from true to false', () => {
    ReactDOM.render(<Wrapper enabled={true} />, node);
    window.resizeTo(900, 600);
    expect(node.firstChild.innerHTML).toMatch(/<h2>{}<\/h2>/);
  });

  it('with enabled changing from false to true', () => {
    ReactDOM.render(<Wrapper enabled={false} />, node);
    window.resizeTo(900, 600);
    expect(node.firstChild.innerHTML).toMatch(/bigScreen":false/);
  });

});
