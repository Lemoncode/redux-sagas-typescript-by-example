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
  GET_NUMBER_REQUEST_START: '[0] Request a new number to the NumberGenerator async service.',
  GET_NUMBER_REQUEST_COMPLETED: '[1] NumberGenerator async service returned a new number.',
+ GET_NUMBER_REQUEST_USER_CONFIRMATION: '[2] User has to confirm or cancel the number request before it gets fired',  
}

export interface BaseAction {
  type : string;
  payload: any;
}
```

- Let's generate the action creator for this (append this file to the bottom..

_./src/actions/index.ts_

```typescript
export const numberRequestUserConfirmationAction : (goahead : boolean) => BaseAction = (goahead) => ({
  type: actionIds.GET_NUMBER_REQUEST_USER_CONFIRMATION,
  payload: goahead,
 });
```
- We will add a flag to the _my-number-setter.component_ to display the confirmation dialog
(we have to convert this component to a class component one, another option could be 
to use new hooks implementation). And add callback property to pass back the user
confirmation.

_./src/components/my-number/setter/my-number-setter-component.tsx_

```diff
import * as React from 'react';

interface Props {
  onRequestNewNumber: () => void;
+  onUserConfirmNewNumberRequest : (result : boolean) => void;
}

+ interface State {
+   showModalConfirmation : boolean;
+ }

- export const MyNumberSetterComponent = (props : Props) =>
-   <button onClick={props.onRequestNewNumber}>Request new number</button>

+ export class MyNumberSetterComponent extends React.PureComponent<Props, State> {
+ 
+   state : State = {showModalConfirmation: false}  
+ 
+   render() {
+     const {onRequestNewNumber} = this.props;
+
+     return (
+       <button onClick={onRequestNewNumber}>Request new number</button>
+     )     
+   }
+ }
```

- Let's add a very simple confirmation section on the component.Whenever the user clicks on the generate new number, the tasks will be launched and the confirmation section will be shown.


```diff
export class MyNumberSetterComponent extends React.PureComponent<Props, State> { 
+  onConfirmationOptionClicked = (result :boolean) => (e) => {
+    this.props.onUserConfirmNewNumberRequest(result);
+    this.setState({showModalConfirmation: false});
+  }

  render() {
-     const {onRequestNewNumber} = this.props;
+     const {onRequestNewNumber, onUserConfirmNewNumberRequest} = this.props; 

+    const setModalDialogStyle = () : React.CSSProperties => ({
+      background: '#ADD8E6',
+      display: (this.state.showModalConfirmation) ? 'inline' : 'none'
+    });


    return (      
+     <>      
      <button onClick={onRequestNewNumber}>Request new number</button>
+      <div style={setModalDialogStyle()}>
+        <span>Are you sure you want to get a new number?</span>
+        <button onClick={this.onConfirmationOptionClicked(true)}>Yes</button>      
+        <button onClick={this.onConfirmationOptionClicked(false)}>No</button>
+      </div>
+     </>
    )
  }
}
```

- If the users clicks on _yes_ or _no_ it will fire the confirmation adding as payload the result of 
the user selection (go ahead or cancel), and will hide the confirmation dialog.

```diff
export class MyNumberSetterComponent extends React.PureComponent<Props, State> { 
  onConfirmationOptionClicked = (result :boolean) => (e) => {
    this.props.onUserConfirmNewNumberRequest(result);
    this.setState({showModalConfirmation: false});
  }

+   onRequestNewNumberWithConfirmation = () => {
+     this.setState({showModalConfirmation: true})
+     this.props.onRequestNewNumber();
+   }

  render() {
    const {onRequestNewNumber, onUserConfirmNewNumberRequest} = this.props;

    return (   
      <>         
-       <button onClick={onRequestNewNumber}>Request new number</button>
+       <button onClick={this.onRequestNewNumberWithConfirmation}>Request new number</button>
            <div style={{background: '#ADD8E6'}}>
```

- In the container let's wire up the _onUserConfirmNewNumberRequest_ component prop callback
with the _numberRequestUserConfirmationAction_ action.

_./src/components/my-number-setter.container_

```diff
import {connect} from 'react-redux';
import {State} from '../../../reducers';
import {MyNumberSetterComponent} from './my-number-setter.component';
- import {numberRequestStartAction} from '../../../actions';
+ import {numberRequestStartAction, numberRequestUserConfirmationAction} from '../../../actions';

const mapStateToProps = (state : State) => ({
})

const mapDispatchToProps = (dispatch) => ({
  onRequestNewNumber: () => dispatch(numberRequestStartAction()),
+ onUserConfirmNewNumberRequest: (result : boolean) => dispatch(numberRequestUserConfirmationAction(result)),
})

export const MyNumberSetterContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MyNumberSetterComponent);
```

- In the sagas section in the _requestNewGeneratedNumber_ let's wait for the confirmation action 
to be completed and let's check the payload, did the user confirmed? in that case go ahead with
the number generation.

```diff
- import { call, put, takeEvery, all, fork } from 'redux-saga/effects';
+ import { call, put, takeEvery, all, fork, take } from 'redux-saga/effects';

// (...)

function* requestNewGeneratedNumber() {
+  const result = yield take(actionIds.GET_NUMBER_REQUEST_USER_CONFIRMATION);
+  if(result.payload === true) {
    const generatedNumber = yield call(generateNewNumber);
    yield put(numberRequestCompletedAction(generatedNumber))
+  }
}
```

> Excercise A: The show / hide modal dialog feature is implemented on the component, why not
trying to add it to the redux life cycle? Once implemented open redux dev tools, check how the
first solution behaves and the second (time machine), is worth the effor this second implementation?
check pros and cons.


