import {BaseAction, actionIds} from '../common';

export const numberRequestStartAction : () => BaseAction = () => ({
 type: actionIds.GET_NUMBER_REQUEST_START,
 payload: null,
});

export const numberRequestCompletedAction : (n : number) => BaseAction = (numberGenerated) => ({
  type: actionIds.GET_NUMBER_REQUEST_COMPLETED,
  payload: numberGenerated,
 });

 export const cancelOnGoingNumberRequestAction : () => BaseAction = () => ({
  type: actionIds.CANCEL_ONGOING_NUMBER_REQUEST,
  payload: null,
 });

 