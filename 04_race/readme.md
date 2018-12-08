# 04 Race

# Summary

In this sample we are going to continue exploring redux saga helper effects.

Now it's time to evaluate the effect combinator _race_, let's imagine the following scenarios:

A)
  A given user makes an asynchronous call to the server that could take some time (e.g. check hotel 
  availability, or booking flight ticket).

  Meanwhile the request is being processed the user changes his mind and he wants to cancel the request,
  he clicks quick into the cancel button.

  What's the behavior the user should expect? If the request is in progress and he clicked on the cancel
  button he shouldn't get the "operation completed" message.

B)
You got two ways of obtaining the same information from two providers (e.g. weather), depending on some
factors at a given time one of the services response could be laggy.

Why not calling both services and getting the response of the first that produced the response?


How can we achieve a behavior like this? _race_ is your friend.

# Steps

- We will take as starting point *03_throttle* let's copy the content of that project 
and execute from bash / cmd the following command:

```bash
npm install
```

- This time we will create a new action called CANCEL_ONGOING_NUMBER_REQUEST:

_./src/common/index.ts_

```diff
export const actionIds = {
  GET_NUMBER_REQUEST_START: '[0] Request a new number to the NumberGenerator async service.',
  GET_NUMBER_REQUEST_COMPLETED: '[1] NumberGenerator async service returned a new number.',
+ CANCEL_ONGOING_NUMBER_REQUEST: '[2] Cancelling and on going number request',  
}

export interface BaseAction {
  type : string;
  payload: any;
}
```

- Now let's create the action creator that will generate the cancel action (append to the body of the
action index file):

_./src/actions/index.ts_

```typescript
export const cancelOnGoingNumberRequestAction : () => BaseAction = () => ({
  type: actionIds.CANCEL_ONGOING_NUMBER_REQUEST,
  payload: null,
 });
```

- Let's create add a new button the the _my-number-setter_ component that will allow us
cancelling the number_request, and create the callback prop to fire the action.

_./src/components/setter/my-number-setter.component.ts_

```diff
import * as React from 'react';

interface Props {
  onRequestNewNumber: () => void;
+  onCancelRequest: () => void;
}

export const MyNumberSetterComponent = (props : Props) =>
+ <>
  <button onClick={props.onRequestNewNumber}>Request new number</button>
+ <button onClick={props.onCancelRequest}>Cancel number request</button> 
+ </>  
```

- Let's configure the container.

_./src/components/setter/my-number-setter.container.ts_

```diff
import {numberRequestStartAction} from '../../../actions';
+ import {numberRequestStartAction, cancelOnGoingNumberRequestAction} from '../../../actions';

const mapStateToProps = (state : State) => ({
})

const mapDispatchToProps = (dispatch) => ({
  onRequestNewNumber: () => dispatch(numberRequestStartAction())
+  onCancelRequest: () => dispatch(cancelOnGoingNumberRequestAction()),
})
```

- Let's restore in the sagas the task watcher to a take every:

_./src/sagas/index.ts_
```diff
- import { call, put, throttle, all, fork } from 'redux-saga/effects';
+ import { call, put, takeEvery, all, fork } from 'redux-saga/effects';

function* watchNewGeneratedNumberRequestStart() {
-  yield throttle(5000, actionIds.GET_NUMBER_REQUEST_START, requestNewGeneratedNumber);
+  yield takeEvery(actionIds.GET_NUMBER_REQUEST_START, requestNewGeneratedNumber);
}
```

- Let's add some extra sleep timeout to the number request service.

```diff
export const generateNewNumber = () : Promise<number> => {
  const promise = new Promise<number>((resolve) => {
    setTimeout(() => {
      initialNumber += 1;
      resolve(initialNumber)
-    }, 500)
+    }, 3000)
  });
```

- Now in the saga we can setup a race between the _GET_NUMBER_REQUEST_START_ and the
_CANCEL_ONGOING_NUMBER_REQUEST_, if cancel wins it won't propagate the new number request
result.

_./src/sagas/index.ts_

```diff
- import { call, put, takeEvery, all, fork} from 'redux-saga/effects';
+ import { call, put, takeEvery, all, fork, race, take } from 'redux-saga/effects';
// (...)

function* requestNewGeneratedNumber() {
-  const generatedNumber = yield call(generateNewNumber);
-  yield put(numberRequestCompletedAction(generatedNumber))
+  const {generatedNumber, cancel} = yield race({
+    generatedNumber: call(generateNewNumber),
+    cancel: take(actionIds.CANCEL_ONGOING_NUMBER_REQUEST)
+  })
+  if(!cancel) {
+    yield put(numberRequestCompletedAction(generatedNumber))    
+  }
}
```

- Let's give a try, once we start the project, just click on _request new number_ and right after that click
on _cancel number request_ you will see that the number generated is not shown (response is ignored), on the 
other hand if we click on the _request new number_ and wait for some seconds the request will be completed
and response will be shown to the user.

```bash
npm start
```

> Something to think about what would happen if you add a _yield_ command to the line of code
_generatedNumber: call(generateNewNumber),_ it will look like: _generatedNumber: yield call(generateNewNumber),_
