# 02 Take latest

# Summary

In this sample we are going to start exploring redux saga helper effects.

We have already used the effect helper _TakeEvery_ this effects listen to all incoming actions being
fired, that can be a valid solutions for many solution, but in some case we need to handle 
other behaviors, e.g.:

We are browsing which movie to watch on _NetFlix_, we click on _Star wars_ but suddenly we change
our mind and we click on _Interstellar_, both request are being processed (travelling through internet) we want to previous request to be cancelled and watch
_Interstellar_ movie details.

How can we achieve a behavior like this? _takeLastest_ is your friend.

# Steps

- We will take as starting point *01_HelloReact* let's copy the content of that project 
and execute from bash / cmd the following command:

```bash
npm install
```
- On the function _watchNewGeneratedNumberRequestStart_ Let's replace _takeEvery_ with 
_takeLatest_:

```diff
- import { call, put, takeEvery, all, fork } from 'redux-saga/effects';
+ import { call, put, takeLatest, all, fork } from 'redux-saga/effects';
// (...)

function* watchNewGeneratedNumberRequestStart() {
-  yield takeEvery(actionIds.GET_NUMBER_REQUEST_START, requestNewGeneratedNumber);
+  yield takeLatest(actionIds.GET_NUMBER_REQUEST_START, requestNewGeneratedNumber);
}
```

- Now if we run the project and start clicking quite fast and repeatedly on the _request new number_
we can see that we are not getting consecutive numbers any more (request are being cancelled and
only latest are being served).

```
npm start
```