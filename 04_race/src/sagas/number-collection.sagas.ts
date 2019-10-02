import { call, put, takeEvery, race, take } from 'redux-saga/effects';
import { generateNewNumber } from '../api';
import { numberRequestCompletedAction } from '../actions';
import { actionIds } from '../common';

export function* watchNewGeneratedNumberRequestStart() {
  yield takeEvery(
    actionIds.GET_NUMBER_REQUEST_START,
    requestNewGeneratedNumber
  );
}

function* requestNewGeneratedNumber() {
  const { generatedNumber, cancel } = yield race({
    generatedNumber: call(generateNewNumber),
    cancel: take(actionIds.CANCEL_ONGOING_NUMBER_REQUEST),
  });
  if (!cancel) {
    yield put(numberRequestCompletedAction(generatedNumber));
  }
}
