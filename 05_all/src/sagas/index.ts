import { call, put, takeEvery, all, fork } from 'redux-saga/effects';
import { generateNewNumber, generateHigherNewNumber } from '../services';
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
  const { generatedNumber, generatedHigherNumber } = yield all({
    generatedNumber: call(generateNewNumber),
    generatedHigherNumber: call(generateHigherNewNumber),
  })

  yield put(numberRequestCompletedAction(generatedNumber))
  yield put(numberRequestCompletedAction(generatedHigherNumber))
}