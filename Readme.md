# react-mql

`CSS Media Queries HOC and MediaContext for React`

A React based component to match media as per CSS Media Queries using browser-native window.matchMedia(). `react-mql` provide two components namely `Media` and `MediaContext`. Both these components can have just one single functional component as only child.

Use `<Media>` as the top most component which accept list of media queries as prop and it passes on the matches to its immediate single functional component. In case we need to have statefull component as child of `<Media>` then it need to be enclosed inside functional component wrapper.

`MediaContext` is a helper component which can be used anywhere and any number of times in the component sub-tree inside `Media`. It is more helpfull when we do not want to keep passing media query matches as `props` down the component sub-tree. Anywhere in the sub-tree when we need to access `matches` we can get using `MediaContext`

## Install

```
npm i @kaweb/react-mql
```

## Usage

* ### Media component

`Media` accept following props:

Name | type | Description         | Example
-----|------|---------------------|---------
list |Object| Object with key as media-query name and value as _CSS media queries_. | ```{landscape: '(orientation: landscape)'}```, where `landscape` is media-query name and `'(orientation: landscape)'` is media-query value. When there is a match for this media-query, matches object provided to functional component will be ```{landscape: true/false}```
enabled | Boolean | Enable/disable listening for media-queries. | Pass false to disable: `<Media enabled={false}>`. When enabled is false <Media> act as normal container component.
dev | Boolean | Enable/disable console log when media-queries matches. | <Media dev>
```js
import React from 'react';
import Media from '@kaweb/react-mql/lib/es';

const CompStateless = (props) => {
  return <div style={{background: '#cceecc', padding: '1rem'}}>
    <h3>Stateless Component</h3>
    <h4>CSS Media Query Matches:<br/>{JSON.stringify(props)}</h4>
  </div>
};

class CompMatchesAsProps extends React.Component {
  render() {
    return <div style={{background: '#eeccee', padding: '0.5rem'}}>
      <h3>Component with matches coming from passed props</h3>
      <h4>CSS Media Query Matches:<br/>{JSON.stringify(this.props)}</h4>
    </div>;
  }
};

class App extends React.Component {
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
      <button onClick={() => { this.setState({enabled: !this.state.enabled});}}>
      Toggle listening for MediaQueryList</button>
      <Media enabled={this.state.enabled} list={this.list} dev>
        {CompStateless}
      </Media>
      <Media enabled={this.state.enabled} list={this.list} dev>
        { v => <CompMatchesAsProps {...v}/>}
      </Media>
    </React.Fragment>;
  }
};
```

* ### MediaContext component
```js
import React from 'react';
import Media from '@kaweb/react-mql/lib/es';

class CompMatchesUsingMediaContext extends React.Component {
  render() {
    return <MediaContext>
      { v => (
        <div style={{background: '#aaccee', padding: '0.5rem'}}>
          <h3>Component with matches using MediaContext</h3>
          <h4>CSS Media Query Matches:<br/>{JSON.stringify(v)}</h4>
        </div>
      )}
    </MediaContext>;
  }
};

class App extends React.Component {
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
        { () => <CompMatchesUsingMediaContext />}
      </Media>
    </React.Fragment>;
  }
};
```

[Check out live demo](https://kumarabhishek.github.io/apps/react-mql).

## Example

To try out example provided as part of react-mql follow following steps:

### Clone repo

```
git clone https://github.com/kumarabhishek/react-mql.git
```

### Install npm modules

```
npm i
```

### Run example

```
npm start
```

Now open [http://localhost:3000](http://localhost:3000).
## Facts

* `react-mql` has **ZERO** dependencies and is **< 1KB** (gzipped) in size.
* It is purely based on browser native MediaQueryList feature.
