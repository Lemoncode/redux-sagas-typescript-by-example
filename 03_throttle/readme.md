# 03 Throttle

# Summary

In this sample we are going to continue exploring redux saga helper effects.

Now it's time to evaluate _throttle_, let's imagine the following scenario:

We have added a _refresh_ button to our page, it will just fire the needed AJAX
queries to our rest api to refresh all the data loaded in the page. We don't
want users on slow internet connection to start clicking on the refresh 
button repeatedly if they don't get a quick response. What can we do?

- On the first click execute reload...
- Ignore all the subsequent calls in 500 Milliseconds (just only keep in the
buffer the last call).
- After that 500 Milliseconds check if we got the latest entry in the buffer
and execute reload.

About throttling: Spawns a saga on an action dispatched to the Store that matches pattern. After spawning a task it's still accepting incoming actions into the underlaying buffer, keeping at most 1 (the most recent one), but in the same time holding up with spawning new task for ms milliseconds (hence its name - throttle). Purpose of this is to ignore incoming actions for a given period of time while processing a task.

More about throttling and debouncing: https://codeburst.io/throttling-and-debouncing-in-javascript-b01cad5c8edf

How can we achieve a behavior like this? _throttle_ is your friend.

# Steps

- We will take as starting point *02_take_latest*. Let's copy the content of that project 
and execute from bash / cmd the following command:

```bash
npm install
```
- On the function _watchNewGeneratedNumberRequestStart_ Let's replace _takeLatest_ with 
_throttle_ (we need to indicate:

_./src/sagas/number-collection.sagas.ts_

```diff
- import { call, put, takeLatest } from 'redux-saga/effects';
+ import { call, put, throttle } from 'redux-saga/effects';
...

export function* watchNewGeneratedNumberRequestStart() {
- yield takeEvery(
+ yield throttle(
+   5000,
    actionIds.GET_NUMBER_REQUEST_START,
    requestNewGeneratedNumber
  );
}
```

- Now if we run the project and start clicking three times quite fast  on the _request new number_
we can see that number _1_ is generated and number _2_ is generated after 5 seconds (one of
the quick clicks have been wiped from the buffer).

> NOTE: Try throttle and debounce with 500 ms

```
npm start
```
