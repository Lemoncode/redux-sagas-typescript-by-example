# 01 Hello Saga

# Summary

In this sample we are going to: 

- Install redux-saga library.
- Add all the setup code needed.
- Create a simple service that will return numbers after a given delay (simulating asynchronous calls).
- Setup redux saga.
- Create actions to request for a new number, and a second action that will be fired 
once the the number has been served.
- Create a saga that will: 
  - Listen for the request_number_start.
  - Execute the getNewNumber service wait for it's reponse.
  - Fire the request_number_completed task.
- Setup the global saga and update middleware setup to add redux-saga.
- Update the de numberCollection reducer to listen for this task.
- Create a number setter component + container.

# Steps

- We will take as starting point _00_boilerplate_ let's copy the content of that project 
and execute from bash / cmd the following command:

```bash
npm install
```

- Time to install redux saga:

```
npm install redux-saga 
```
> No need to install @types, they are already included in the library.

- First we will create a simple service that will return a new number (incremental)
after a given delay (main goal is to emulate sinchronizity).

_./src/services/number-generator.service.ts_

```typescript
let initialNumber = 0;

export const generateNewNumber = () : Promise<number> => {
  const promise = new Promise<number>((resolve) => {
    setTimeout(() => {
      initialNumber += 1;
      resolve(initialNumber)
    }, 500)
  });

  return promise;
}
```
Let's create a barrel under _services_ folder:

```typescript
export * from './number-generator.service';
```

- Now we will start with redux-saga application plumbing, first we will 
setup the middleware (we will need some additional setup to make it work
seamlessly with redux dev tools).

_./src/main.tsx_

```diff
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { MyNumberBrowserContainer } from './components';
- import { createStore } from 'redux';
+ import { createStore, applyMiddleware, compose } from 'redux';
+ import createSagaMiddleware from 'redux-saga';
import { Provider } from 'react-redux';
import {reducers} from './reducers';


+ const sagaMiddleware = createSagaMiddleware();

-const store = createStore(reducers,
-  window['__REDUX_DEVTOOLS_EXTENSION__'] && 
-  window['__REDUX_DEVTOOLS_EXTENSION__']()
-);
+ const store = createStore(reducers,{},
+   compose(
+     applyMiddleware(sagaMiddleware),
+     window['__REDUX_DEVTOOLS_EXTENSION__'] ? window['__REDUX_DEVTOOLS_EXTENSION__']() : f => f
+   )   
+ );



ReactDOM.render(
  <Provider store={store}>
    <>      
      <MyNumberBrowserContainer/>
    </>
  </Provider>,
  document.getElementById('root'));
```



- Let's define two actions, the first on to start a new number request, and the second one
to collect the number request once has been completed.

- First we will create the actions Id's, and we will add a helper to get base actions typed::

_./src/common/index.ts_

```typescript
export const actionIds = {
  GET_NUMBER_REQUEST_START: '[0] Request a new number to the NumberGenerator async service.',
  GET_NUMBER_REQUEST_COMPLETED: '[1] NumberGenerator async service returned a new number.',
}

export interface BaseAction {
  type : string;
  payload: any;
}
```
- Le't s define the action creators:

_./src/actions/index.ts_

```typescript
import {BaseAction, actionIds} from '../common';

export const numberRequestStartAction : () => BaseAction = () => ({
 type: actionIds.GET_NUMBER_REQUEST_START,
 payload: null,
});

export const numberRequestCompletedAction : (n : number) => BaseAction = (numberGenerated) => ({
  type: actionIds.GET_NUMBER_REQUEST_COMPLETED,
  payload: numberGenerated,
 });
```

- Let's handle _GET_NUMBER_REQUEST_COMPLETED_ on the _my-number_ reducer.

_./src/reducers/my-number.reducer.ts_

```diff
+ import { BaseAction, actionIds } from '../common';

export type MyNumberCollectionState = number[];

- export const myNumberCollectionReducer = (state : MyNumberCollectionState = [0], action) => {
+ export const myNumberCollectionReducer = (state : MyNumberCollectionState = [0], action : BaseAction) => {  
+  switch (action.type) {
+    case actionIds.GET_NUMBER_REQUEST_COMPLETED:
+      return handleGetNumberRequestCompleted(state, action.payload);
+    break;
+  }

  return state;
}

+ const handleGetNumberRequestCompleted = (state : MyNumberCollectionState, newNumber : number) : MyNumberCollectionState => 
+  [...state, newNumber];
```

- Now it's time to start creating sagas.

- First we will create a saga that will: 
  - Listen for the *GET_NUMBER_REQUEST_START*.
  - Once the action has been invoked, call the asynchronous number generator service.
  - Once the service has resolved the async call (promise resolved) call the 
  *GET_NUMBER_REQUEST_COMPLETED* action passing by the new number generated in the 
  action payload.

_./src/sagas/index.ts_

```typescript
import { call, put, takeEvery } from 'redux-saga/effects';
import { generateNewNumber } from '../services';
import { numberRequestCompletedAction } from '../actions'
import { actionIds } from '../common'

function* watchNewGeneratedNumberRequestStart() {
  yield takeEvery(actionIds.GET_NUMBER_REQUEST_START, requestNewGeneratedNumber);
}

function* requestNewGeneratedNumber() {
  const generatedNumber = yield call(generateNewNumber);
  yield put(numberRequestCompletedAction(generatedNumber))
}
```

What in the hell are we doin hell?

- A first saga is just listening for the _requestNewGeneratedNumber_ action.
- Once the action is fired, we fire a second saga that will call _generateNewNumber_,
wait for the response, then one it gets the result call the _numberRequestCompletedAction_
passing the generatedNumber as a paramater.

- Now we need to setup a root saga that will initialize all watchers sagas (well
right now we got one but in the future more sagas to be added likely ;)). Let's
append this piece of code at the top of the sagas file (right after the import area) we are working on

_./src/sagas/index.ts_

```diff
- import { call, put, takeEvery } from 'redux-saga/effects';
+ import { call, put, takeEvery, all, fork } from 'redux-saga/effects';
import { generateNewNumber } from '../services';
import { numberRequestCompletedAction } from '../actions'
import { actionIds } from '../common'

+ // Register all your watchers
+ export const rootSaga = default function* root() {
+   yield all([
+     fork(watchNewGeneratedNumberRequestStart),
+   ])
+ }
```

> _all_ is an effect combinator, it just run all effects in paralell and wiat for them to be
completed (quite corresponding to _Promise.all_).

> fork let the saga run in parallel (non blocking).

- Finally we need to tell _Redux Saga Middleware_ to run this _root_ saga on application start.

_./src/main.tsx_

```diff
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { MyNumberBrowserContainer } from './components';
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { Provider } from 'react-redux';
import { reducers } from './reducers';
+ import { rootSaga } from './sagas';

const composeEnhancers = window['__REDUX_DEVTOOLS_EXTENSION__'] || compose;

const sagaMiddleware = createSagaMiddleware();

+ sagaMiddleware.run(rootSaga);
```

- Time to create some UI to interact with our brand new sagas, in this case 
we will create a component that we will call _my-number-setter-container_ and
_my-number-setter-component_, the presentational component will just hold
a button, when we click on this button a new request async number action will
be fired.

_./src/components/my-number/setter/my-number-setter.component.tsx_

```typescript
import * as React from 'react';

interface Props {
  onRequestNewNumber: () => void;
}

export const MyNumberSetterComponent = (props : Props) =>
  <button onClick={props.onRequestNewNumber}>Request new number</button>
```

- Now let's wire up the container with the redux / actions needed.

_./src/components/my-number/setter/my-number-setter.container.tsx_

```typescript
import {connect} from 'react-redux';
import {State} from '../../../reducers';
import {MyNumberSetterComponent} from './my-number-setter.component';
import {numberRequestStartAction} from '../../../actions';

const mapStateToProps = (state : State) => ({
})

const mapDispatchToProps = (dispatch) => ({
  onRequestNewNumber: () => dispatch(numberRequestStartAction())
})

export const MyNumberSetterContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MyNumberSetterComponent);
```

- Let's add this component to the components barrel.

_./src/components/index.ts_

```diff
export {MyNumberBrowserContainer} from './my-number/browser/my-number-container';
+ export {MyNumberSetterContainer} from './my-number/setter/my-number-setter.container';
```

- We can instantiate now our component in the main page:

_./src/main.tsx_

```diff
import * as React from 'react';
import * as ReactDOM from 'react-dom';
+ import { MyNumberBrowserContainer, MyNumberSetterContainer } from './components';
// (...)

ReactDOM.render(
  <Provider store={store}>
    <>
+      <MyNumberSetterContainer />
      <MyNumberBrowserContainer />    
    </>
  </Provider>,
  document.getElementById('root'));
```
