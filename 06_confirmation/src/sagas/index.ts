import { call, put, takeEvery, all, fork, take } from 'redux-saga/effects';
import { generateNewNumber } from '../services';
import { numberRequestCompletedAction } from '../actions'
import { actionIds } from '../common'

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
  const result = yield take(actionIds.GET_NUMBER_REQUEST_USER_CONFIRMATION);
  
  if(result.payload === true) {
    const generatedNumber = yield call(generateNewNumber);
    yield put(numberRequestCompletedAction(generatedNumber))
  }
}