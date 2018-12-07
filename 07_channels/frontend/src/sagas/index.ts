import { call, put, takeEvery, all, fork } from 'redux-saga/effects';
import { generateNewNumber } from '../services';
import { numberRequestCompletedAction } from '../actions'
import { actionIds } from '../common'
import { socketRootSaga } from './socket'

// Register all your watchers
export const rootSaga = function* root() {
  yield all([
    fork(watchNewGeneratedNumberRequestStart),
    fork(socketRootSaga),    
  ])
}

function* watchNewGeneratedNumberRequestStart() {
  yield takeEvery(actionIds.GET_NUMBER_REQUEST_START, requestNewGeneratedNumber);
}

function* requestNewGeneratedNumber() {
  const generatedNumber = yield call(generateNewNumber);
  yield put(numberRequestCompletedAction(generatedNumber))
}