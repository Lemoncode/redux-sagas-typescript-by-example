import { call, put, takeEvery, all } from 'redux-saga/effects';
import { generateNewNumber, generateHigherNewNumber } from '../api';
import { numberRequestCompletedAction } from '../actions';
import { actionIds } from '../common';

export function* watchNewGeneratedNumberRequestStart() {
  yield takeEvery(
    actionIds.GET_NUMBER_REQUEST_START,
    requestNewGeneratedNumber
  );
}

function* requestNewGeneratedNumber() {
  const { generatedNumber, generatedHigherNumber } = yield all({
    generatedNumber: call(generateNewNumber),
    generatedHigherNumber: call(generateHigherNewNumber),
  });
  yield put(numberRequestCompletedAction(generatedNumber));
  yield put(numberRequestCompletedAction(generatedHigherNumber));
}
