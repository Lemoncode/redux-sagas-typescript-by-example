# 06 Confirmation

# Summary

What if we need the user to confirm some operation? For instance in our case once the user hits on 
"Generate new number", we want to prompt the user if he really wants to generate a new number if
he decides to move forward the number will be generated if not the service call won't be even made.

Usually this meant mixing a bit of ui logic, what if we could take it inside the saga processing?

# Steps

- We will take as starting point *01_hello_saga* let's copy the content of that project 
and execute from bash / cmd the following command:

```bash
npm install
```

- Let's define a confirmation action Id.

_./src/common/index.ts_

```diff
export const actionIds = {
  GET_NUMBER_REQUEST_START:
    '[0] Request a new number to the NumberGenerator async service.',
  GET_NUMBER_REQUEST_COMPLETED:
    '[1] NumberGenerator async service returned a new number.',
  CANCEL_ONGOING_NUMBER_REQUEST: '[2] Cancelling and on going number request',
+ GET_NUMBER_REQUEST_USER_CONFIRMATION: '[3] User has to confirm or cancel the number request before it gets fired',  
}
...
```

- Let's generate the action creator for this (append this to the bottom of the file).

_./src/actions.ts_

```diff
...

+ export const numberRequestUserConfirmationAction: (
+   goahead: boolean
+ ) => BaseAction = goahead => ({
+   type: actionIds.GET_NUMBER_REQUEST_USER_CONFIRMATION,
+   payload: goahead,
+ });
```
- We will add a flag to the _number-setter.component_ to display the confirmation dialog
(we have to convert this component to a class component one, another option could be 
to use new hooks implementation). And add callback property to pass back the user
confirmation.

_./src/components/setter/number-setter-component.tsx_

```diff
import * as React from 'react';

interface Props {
  onRequestNewNumber: () => void;
- onCancelRequest: () => void;
+ onUserConfirmNewNumberRequest : (result : boolean) => void;
}

- export const NumberSetterComponent: React.FunctionComponent<Props> = props => (
+ export const NumberSetterComponent: React.FunctionComponent<Props> = props => {
+   const [showModal, setShowModal] = React.useState(false);

+   return (
      <>
        <button onClick={props.onRequestNewNumber}>Request new number</button>
-       <button onClick={props.onCancelRequest}>Cancel number request</button>
      </>
    );
+ };

```

- Let's add a very simple confirmation section on the component. Whenever the user clicks on the generate new number, the tasks will be launched and the confirmation section will be shown.
If the users clicks on _yes_ or _no_ it will fire the confirmation adding as payload the result of 
the user selection (go ahead or cancel), and will hide the confirmation dialog.

_./src/components/setter/number-setter-component.tsx_

```diff

import * as React from 'react';

interface Props {
  onRequestNewNumber: () => void;
  onUserConfirmNewNumberRequest : (result : boolean) => void;
}

export const NumberSetterComponent: React.FunctionComponent<Props> = props => {
+ const { onRequestNewNumber, onUserConfirmNewNumberRequest } = props;
  const [showModal, setShowModal] = React.useState(false);

+ const handleRequest = () => {
+   setShowModal(true);
+   onRequestNewNumber();
+ };
  
+ const handleConfirm = value => {
+   setShowModal(false);
+   onUserConfirmNewNumberRequest(value);
+ };

  return (
    <>
-     <button onClick={props.onRequestNewNumber}>Request new number</button>
+     <button onClick={handleRequest}>Request new number</button>
+     {showModal && (
+       <div style={{ background: '#ADD8E6' }}>
+         <span>Are you sure you want to get a new number?</span>
+         <button onClick={() => handleConfirm(true)}>Yes</button>
+         <button onClick={() => handleConfirm(false)}>No</button>
+       </div>
+     )}
    </>
  );
};
```

- In the container let's wire up the _onUserConfirmNewNumberRequest_ component prop callback
with the _numberRequestUserConfirmationAction_ action.

_./src/components/setter/number-setter.container_

```diff
import { connect } from 'react-redux';
import {
  numberRequestStartAction,
- cancelOnGoingNumberRequestAction,
+ numberRequestUserConfirmationAction,
} from '../../actions';
import { NumberSetterComponent } from './number-setter.component';

const mapDispatchToProps = dispatch => ({
  onRequestNewNumber: () => dispatch(numberRequestStartAction()),
- onCancelRequest: () => dispatch(cancelOnGoingNumberRequestAction()),
+ onUserConfirmNewNumberRequest: result =>
+   dispatch(numberRequestUserConfirmationAction(result)),
});

export const NumberSetterContainer = connect(
  null,
  mapDispatchToProps
)(NumberSetterComponent);

```

- In the sagas section in the _requestNewGeneratedNumber_ let's wait for the confirmation action 
to be completed and let's check the payload, did the user confirmed? in that case go ahead with
the number generation.

_./src/sagas/number-collection.sagas.ts_

```diff
- import { call, put, takeEvery, all } from 'redux-saga/effects';
+ import { call, put, takeEvery, all, take } from 'redux-saga/effects';

// (...)

function* requestNewGeneratedNumber() {
+ const result = yield take(actionIds.GET_NUMBER_REQUEST_USER_CONFIRMATION);
+ if (result.payload === true) {
    const { generatedNumber, generatedHigherNumber } = yield all({
      generatedNumber: call(generateNewNumber),
      generatedHigherNumber: call(generateHigherNewNumber),
    });
    yield put(numberRequestCompletedAction(generatedNumber));
    yield put(numberRequestCompletedAction(generatedHigherNumber));
+ }
}
```

> Excercise A: The show / hide modal dialog feature is implemented on the component, why not
trying to add it to the redux life cycle? Once implemented open redux dev tools, check how the
first solution behaves and the second (time machine), is worth the effort this second implementation?
check pros and cons.


