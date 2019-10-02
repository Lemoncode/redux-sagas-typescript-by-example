import { all, fork } from 'redux-saga/effects';
import { watchNewGeneratedNumberRequestStart } from './number-collection.sagas';
import { socketRootSaga } from './socket';

export const rootSaga = function* root() {
  yield all([fork(watchNewGeneratedNumberRequestStart), fork(socketRootSaga)]);
};
