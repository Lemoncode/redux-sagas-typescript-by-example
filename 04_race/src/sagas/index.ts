import { call, put, takeEvery, all, fork, race, take } from 'redux-saga/effects';
import { generateNewNumber } from '../services';
import { numberRequestCompletedAction } from '../actions'
import { actionIds } from '../common'
import { takeLatest } from 'redux-saga';

// Register all your watchers
export const rootSaga = function* root() {
  yield all([
    fork(watchNewGeneratedNumberRequestStart),
  ])
}

function* watchNewGeneratedNumberRequestStart() {
  yield takeEvery(actionIds.GET_NUMBER_REQUEST_START, requestNewGeneratedNumber);
}

function* requestNewGeneratedNumber() {
  const { generatedNumber, cancel } = yield race({
    generatedNumber: call(generateNewNumber),
    cancel: take(actionIds.CANCEL_ONGOING_NUMBER_REQUEST)
  })
  if (!cancel) {
    yield put(numberRequestCompletedAction(generatedNumber))
  }
}