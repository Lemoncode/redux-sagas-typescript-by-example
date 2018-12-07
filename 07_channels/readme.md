# 07 Channels

# Summary

Channels is a power mechanism, makes a lot of sense when combined with sockets (real time information) on
the server side.

In this sample: 
  - We are going to expose a fake socket server (it will just emulate sending patients heart bits real time).

  - We are going list through that socket using sagas + channels.

You will need to run both server and client side.

# Steps

- We will take as starting point _01_hello_saga_ let's copy the content of that project 
and execute from bash / cmd the following command:

Change directory to _./frontend_ and execute:

```bash
npm install
```

Change directory to _./backend_ and execute:

```bash
npm install
```


- Let's run the server side project.

Change directory to _./backend_ and execute:

```
npm start
```

- Now we will change directory to front end and start working on that.

- Let's start by working on the saga that will read from the socket on por 1337 (to avoid
adding extra steps to this sample we won't bother about configuring enviroment variables
for this project).

Steps:

0. Let's install _socket.io_ library to read fro the websocket.

1. We will define two tasks: 
 
 - START_SOCKET_SUBSCRIPTION: Will be called on the _componentWillMount_ event of the table that will display that data in real time.
 
 - STOP_SOCKET_SUBSCRIPTION: Will be called on the _componentWillUnmount_ event of of the table that will display that data in real time.

2. We will c

Le'ts get started

- First let's install _socket.io_ library (under frontend folder) and it's type definition:

```bash
npm install socket.io-client --save
```

```bash
npm install @types/socket.io-client --save-dev
```

- Let's create the action Id's:

_./common/index.ts_

```diff
export const actionIds = {
  GET_NUMBER_REQUEST_START: '[0] Request a new number to the NumberGenerator async service.',
  GET_NUMBER_REQUEST_COMPLETED: '[1] NumberGenerator async service returned a new number.',
+  START_SOCKET_SUBSCRIPTION: '[2] Start listening to the web socket',
+  STOP_SOCKET_SUBSCRIPTION: '[3] Close socket connection',
}

export interface BaseAction {
  type : string;
  payload: any;
}
```

- Now let's define the action creators (real life project would pass extra params in this 
action creators). Add this content to the bottom of the file.

_./actions/index.ts_

```typescript
export const startSocketSubscriptionAction : () => BaseAction = () => ({
 type: actionIds.START_SOCKET_SUBSCRIPTION,
 payload: null,
});

export const stopSocketSubscriptionAction : () => BaseAction = () => ({
 type: actionIds.STOP_SOCKET_SUBSCRIPTION,
 payload: null,
});
```

- Let's start implementing the _socket_ sagas.

First we will add a helper method that will allow us connect to a server and return
a promise wrapping the result of this connection in a promise (socket.io returns
just a callback), we could wrap this into a separate file.

_./src/sagas/socket.ts_

```typescript
import * as ioClient from 'socket.io-client';
import { all, fork, take, call } from 'redux-saga/effects';
import { actionIds } from '../common';

function connect() {
  // Real life project extract this into an API module
  const socket = ioClient.connect('http://localhost:1337/', null);

  // We need to wrap the socket connection into a promise (socket returs callback)
  return new Promise((resolve, reject) => {
    socket.on('connect', () => {
      socket.emit('messages');
      resolve({ socket });
    });

    socket.on('connect_error', err => {
      console.log('connect failed :-(');
      reject(new Error('ws:connect_failed '));
    });
  }).catch(error => ({ socket, error }));
}
```

> We have harcoded connection url and settings, in a real project we would parametrize this info.

- Let's register the _flow_ saga in the _index_ saga file. This will listen for the *START_LISTENING_SOCKET*
action, once is fired it will try to establish a connection with the socket (we will extend that saga 
later on). Append this content to the bottom of the file.

_./src/sagas/socket.ts_

```typescript
function* flow() {
	while(true) {
		yield take(actionIds.START_SOCKET_SUBSCRIPTION);
		const {socket, error} = yield call(connect);
		if(socket) {
			console.log('connection to socket succeeded');
		} else {
			console.log('error connecting');
		}
	}
}
```

- Let's wrap all this in a _socketRootSaga_. Append this content to the bottom of the file.

_./src/sagas/socket.ts_

```typescript
export function *socketRootSaga() {
	yield all([
		fork(flow),
	])
}
```

- Let's register this _socketRootSaga_ in the _saga/index_ main saga.

_./src/sagas/index.ts_

```diff
import { actionIds } from '../common'
+ import { socketRootSaga } from './socket'

// Register all your watchers
export const rootSaga = function* root() {
  yield all([
    fork(watchNewGeneratedNumberRequestStart),
+   fork(socketRootSaga),    
  ])
}
```

- Right now let's make a quick stop and check that we are able to establish connection with the socket.

- Time to jump into the ui side.

- Let's create a component we will call it _bids-table.component.tsx_, it will just 
fire the _Start Socket Subscription_ task.

_./src/components/bids-table/bids-table.component.tsx_

```typescript
import * as React from 'react';

interface Props {
  connectBidsSockets : () => void;
  disconnectBidsSockets : () => void;
}

export class BidsTableComponent extends React.PureComponent<Props> {
  componentWillMount() {
    this.props.connectBidsSockets();  
  }

  componentWillUnmount() {
    this.props.disconnectBidsSockets();  
  }

  render() {
    return (
      <h3>Bids Table component</h3>
    )
  }
}
```

- Let's create a container we will call it _bids-table.container.tsx_,it will connect
the _START_SOCKET_SUBSCRIPTION_ action creator with the _startSocketConnection_ 
component prop callback.

_./src/components/bids-table/bids-table.container.tsx_

```typescript
import {connect} from 'react-redux';
import {State} from '../../reducers';
import {BidsTableComponent} from './bids-table.component';
import {startSocketSubscriptionAction, stopSocketSubscriptionAction} from '../../actions';

const mapStateToProps = (state : State) => ({
})

const mapDispatchToProps = (dispatch) => ({
  connectBidsSockets: () => dispatch(startSocketSubscriptionAction()),
  disconnectBidsSockets: () => dispatch(stopSocketSubscriptionAction()),
})

export const BidsTableContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(BidsTableComponent);
```

- Let's add the _BidsTableContainer_ to the components barrel.

_./src/components/index.ts_

```diff
export {MyNumberBrowserContainer} from './my-number/browser/my-number-container';
export {MyNumberSetterContainer} from './my-number/setter/my-number-setter.container';
+ export {BidsTableContainer} from './bids-table/bids-table.container';
```

- Let's add this container to the _main.tsx_ main component:

_./src/main.tsx_

```diff
- import { MyNumberBrowserContainer, MyNumberSetterContainer } from './components';
+ import { MyNumberBrowserContainer, MyNumberSetterContainer, BidsTableContainer } from './components';
//(...)

ReactDOM.render(
  <Provider store={store}>
    <>
+     <BidsTableContainer/>
+     <br/>    
      <MyNumberSetterContainer />
      <MyNumberBrowserContainer />    
    </>
  </Provider>,
  document.getElementById('root'));
```

- Let's launch the project and include breakpoints in the _socket_ saga to check that
connection is succesfully established.

```bash
npm start
```

> We can check as well the browser console and check the connection traces we have added.






