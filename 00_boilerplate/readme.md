# 01 Hello Redux

In this sample we will create a full react + redux app just to display a HelloWorld like message.
Of course doing such a thing is an overkill. We use this simple sample to learn the
concepts.

We will take as our startup point "sample _00 Boilerplate".


Summary steps:

- Install react, react-dom, redux libraries.
- Install react, react-dom, redux typescript definitions.
- Update the index.html to create a placeholder for the react components.
- Create a HelloWorld component.
- Create an _main.tsx_ as entry point.
- Create the react-dom entry point _main.tsx_.
- Create a reducer (it will hold user name).
- Wire it up.
- Create a HelloworldContainer component and perform the connections.
- Include this HelloworldContainer component in the _main.tsx_

# Prerequisites

Install [Node.js and npm](https://nodejs.org/en/) (v6.6.0) if they are not already installed on your computer.

> Verify that you are running at least node v6.x.x and npm 3.x.x by running `node -v` and `npm -v` in a terminal/console window. Older versions may produce errors.

## Steps to build it

- Copy the content from _00 Boilerplate_ and execute _npm install_.

- Let's install react, react-dom and redux libraries:

```javascript
npm install react react-dom redux react-redux --save
```

- let's install typescript definitions for these libraries:

```
npm install @types/react @types/react-dom @types/react-redux --save-dev
```

- Rename _./src/main.ts_ to _./src/main.tsx_.

- Update webpack config in the _./src/webpack.config.js_ file, in order to take as entry point _main.tsx_

### ./webpack.config.js
```diff
entry: [
- './main.ts',
+ './main.tsx',
  '../node_modules/bootstrap/dist/css/bootstrap.css'
],

```

- Update the index.html to create a placeholder for the react components

### ./src/index.html
```diff
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title></title>
  </head>
  <body>
    <h1>Sample app</h1>
+   <div id="root">
+   </div>    
  </body>
</html>
```

- Create the react-dom entry point _main.tsx_ (and remove the old `main.ts`).

### ./src/main.tsx
```javascript
import * as React from 'react';
import * as ReactDOM from 'react-dom';

ReactDOM.render(
  <h2>Temp content</h2>,
  document.getElementById('root'));
```

- Create a HelloWorld component, path : _./src/helloWorld.tsx_.

_./src/components/hello/helloWorld.tsx_

```javascript
import * as React from 'react';

export const HelloWorldComponent = (props : {userName : string}) => {
  return (
    <h2>Hello Mr. {props.userName} !</h2>
  );
}
```

- Let's create a smart component that will hold the user name, let's name it HelloWorldContainer.

_./src/components/hello/helloWorldContainer.tsx_

```typescript
import * as React from 'react';
import {HelloWorldComponent} from './helloWorld';

interface State {
  username : string;
}

export class HelloWorldContainer extends React.Component<{}, State> {
  public constructor(props) {
    super(props);
    this.state = {username: 'John Doe' };
  }

  public render() {
    return (
      <HelloWorldComponent userName={this.state.username}/>
    )
  }
}
```

- Let's create a barrel.

_./src/components/index.ts_

```typescript
export * from './hello/helloWorldContainer';
```

- Let's check that we got the basics working.

_./src/main.tsx_

```diff
import * as React from 'react';
import * as ReactDOM from 'react-dom';
+ import { HelloWorldContainer } from './components';

ReactDOM.render(
-  <h2>Temp content</h2>,
+  <HelloWorldContainer/>,
  document.getElementById('root'));
```

- Time to give a try and check if we have this base working.

```bash
npm start
```

- Let's start with the redux fun, in order to clasiffy, a thumb rule:
  - Containers got state, state use to be ported to reducers.
  - Callbacks use to map to actions.

- Right now we only have state.

- Let's create a reducer to store the userProfile.

_./src/reducers/userProfile.ts_

```javascript
export interface UserProfileState {
  firstname : string;
}

const defaultUserState : () => UserProfileState = () => ({
  firstname: 'John Doe'
});

export const userProfileReducer = (state = defaultUserState(), action) => {
  // Later on we will have a switch statement to replace state on changes.
  return state;
}
```

- Let's create an index file under _./src/reducers/index.ts_

```typescript
import { combineReducers} from 'redux';
import { userProfileReducer, UserProfileState } from './userProfile';

export interface State {
  userProfileReducer : UserProfileState;
};

export const reducers = combineReducers<State>({
  userProfileReducer
});
```

- Let's wire it up this reducers into the _main.tsx_

```diff
import * as React from 'react';
import * as ReactDOM from 'react-dom';
+ import { createStore } from 'redux';
+ import { Provider } from 'react-redux';
+ import {reducers } from './reducers';
import { HelloWorldContainer } from './components';

+ const store = createStore(reducers);

ReactDOM.render(
- <h2>Temp content</h2>,
+ <Provider store={store}>
+   <>    
    <HelloWorldContainer/>
+   </>    
+ </Provider>,
  document.getElementById('root'));
```

- Now it's time to replace the mock helloWorldContainer that we created with one
connected to redux, (**replace the whole file content**).

_./src/components/hello/helloWorldContainer.tsx_

```typescript
import {connect} from 'react-redux';
import {State} from '../../reducers';
import {HelloWorldComponent} from './helloWorld';

const mapStateToProps = (state : State) => {
  return {
    userName: state.userProfileReducer.firstname
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export const HelloWorldContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(HelloWorldComponent);
```

- Let's give a try to the sample.

```
npm start
```


