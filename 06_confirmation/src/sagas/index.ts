import { all, fork } from 'redux-saga/effects';
import { watchNewGeneratedNumberRequestStart } from './number-collection.sagas';

export const rootSaga = function* root() {
  yield all([fork(watchNewGeneratedNumberRequestStart)]);
};
