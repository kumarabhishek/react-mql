# react-mql

[![CircleCI](https://circleci.com/gh/kumarabhishek/react-mql/tree/master.svg?style=svg)](https://circleci.com/gh/kumarabhishek/react-mql/tree/master) 
[![npm](https://img.shields.io/npm/v/@kaweb/react-mql.svg)](https://www.npmjs.com/package/@kaweb/react-mql) 
[![npm](https://img.shields.io/npm/dt/@kaweb/react-mql.svg)](https://www.npmjs.com/package/@kaweb/react-mql) [![MIT Licence](https://badges.frapsoft.com/os/mit/mit.svg?v=103)](https://github.com/kumarabhishek/react-mql/blob/master/LICENSE)

`CSS Media Queries HOC and MediaContext for React`

![Demo](https://raw.githubusercontent.com/kumarabhishek/react-mql/master/example/demo.gif)

## Introduction

A React based component to match media as per CSS Media Queries using browser-native window.matchMedia(). `react-mql` provide two components namely `Media` and `MediaContext`. Both these components can have just one single functional component as only child.

Use `Media` as the top most component which accept list of media queries as prop and it passes on the matches to its immediate single functional component. In case we need to have statefull component as child of `Media` then it need to be enclosed inside functional component wrapper.

`MediaContext` is a helper component which can be used anywhere and any number of times in the component sub-tree inside `Media`. It is more helpfull when we do not want to keep passing media query matches as `props` down the component sub-tree. Anywhere in the sub-tree when we need to access `matches` we can get using `MediaContext`.

## Demo

[![Edit on codepen](https://www.vectorlogo.zone/logos/codepen/codepen-ar21.svg)](https://codepen.io/webprofessional/pen/ZjJgKL?editors=0010)

[![Edit vyklk855w7](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/vyklk855w7?expanddevtools=1&hidenavigation=1&view=preview)



## Features

* It has **ZERO** dependencies and is **< 1KB** (gzipped) in size.
* It is purely based on browser native HTML5 feature _[MediaQueryList](https://developer.mozilla.org/en-US/docs/Web/API/MediaQueryList)_.
* Uses latest React 16.x _[Context](https://reactjs.org/docs/context.html)_ API

## Install

### NPM

```
npm i @kaweb/react-mql
```

### UMD

Add script tag as below:

```
<script src="https://unpkg.com/@kaweb/react-mql/lib/react-mql.js"></script>
```

Then use following global object:

```
const Media = ReactMql.default;
const MediaContext = ReactMql.MediaContext;
```

## Usage

`react-mql` provide both es5 and es6+ version so that you can choose based on your requirement. Default package is es5 version which can be imported in your application as below:

```js
import Media, {MediaContext} from '@kaweb/react-mql';
```

Similary es6+ version can be imported as below:

```js
import Media, {MediaContext} from '@kaweb/react-mql/lib/es';
```

* **Media component**

`Media` accept following props:

Name | type | Description         | Example
-----|------|---------------------|---------
list |Object| Object with key as media-query name and value as _CSS media queries_. If `list` is not passed, `<Media>` simply render its children. | ```{landscape: '(orientation: landscape)'}```, where `landscape` and `'(orientation: landscape)'` are respectively name and value of media-query. When there is a match for this media-query, matches object provided to functional component will be ```{landscape: true/false}```
dev | Boolean | Enable/disable console log when media-queries matches. Default is `false` | `<Media dev>`
---------------------------------------------

```js
import React from 'react';
import Media from '@kaweb/react-mql/lib/es';

const CompStateless = (props) => {
  return <div style={{background: props.bigScreen ? '#edeeed' : '#66ee66', padding: '1rem'}}>
    <h3>Stateless Component</h3>
    <h4>CSS Media Query Matches:<br/>{JSON.stringify(props, 4)}</h4>
  </div>
};

class CompMatchesAsProps extends React.Component {
	render() {
		return <div style={{ background: this.props.bigScreen ? '#ffccff' : '#66cc66', padding: '0.5rem' }}>
			<h3>Component with matches coming from passed props</h3>
			<h4>CSS Media Query Matches:<br/>{JSON.stringify(this.props, 4)}</h4>
		</div>;
	}
}

const list = {
  bigScreen: "(min-width: 1080px) and (max-width: 1920px)",
  landscape: "(orientation: landscape)"
};
export default class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <h2>
          Resize browser / rotate your mobile and observe changes in values as
          below:
        </h2>
        <Media list={list} dev>
          {CompStateless}
        </Media>
        <Media list={list} dev>
          {v => <CompMatchesAsProps {...v} />}
        </Media>
      </React.Fragment>
    );
  }
}

render(<App />, document.getElementById("root"));
```

* **MediaContext component**

We use `MediaContext` to access mediaquery `matches` anywhere inside the component hierarchy of `Media` as shown below:

```js
import React from 'react';
import Media, {MediaContext} from '@kaweb/react-mql/lib/es';

class CompMatchesUsingMediaContext extends React.Component {
  render() {
    return (
      <MediaContext>
        {v => (
          <div
            style={{
              background: v.bigScreen ? "#aaccee" : "#66ccaa",
              padding: "0.5rem"
            }}
          >
            <h3>Component with matches using MediaContext</h3>
            <h4>
              CSS Media Query Matches:<br />
              {JSON.stringify(v, 4)}
            </h4>
          </div>
        )}
      </MediaContext>
    );
  }
}

const list = {
  bigScreen: "(min-width: 1080px) and (max-width: 1920px)",
  landscape: "(orientation: landscape)"
};

export default class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <h2>
          Resize browser / rotate your mobile and observe changes in values as
          below:
        </h2>
        <Media list={list} dev>
          {() => <CompMatchesUsingMediaContext />}
        </Media>
      </React.Fragment>
    );
  }
}

render(<App />, document.getElementById("root"));
```

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

## Tests

Jest is used for unit testing with coverage ans eslint is used as linter. To run the test suite, first install the dependencies, then run `npm test` inside root folder:

```
npm test
```

## Contributing

Your contributions are welcome!

Refer [contributing guide](https://github.com/kumarabhishek/react-mql/blob/master/CONTRIBUTING.md) for more details.
