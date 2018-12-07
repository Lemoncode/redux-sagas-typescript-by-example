import {BaseAction, actionIds} from '../common';
import { CurrencyUpdate } from '../model';

export const numberRequestStartAction : () => BaseAction = () => ({
 type: actionIds.GET_NUMBER_REQUEST_START,
 payload: null,
});

export const numberRequestCompletedAction : (n : number) => BaseAction = (numberGenerated) => ({
  type: actionIds.GET_NUMBER_REQUEST_COMPLETED,
  payload: numberGenerated,
 });

 export const startSocketSubscriptionAction : () => BaseAction = () => ({
  type: actionIds.START_SOCKET_SUBSCRIPTION,
  payload: null,
 });
 
 export const stopSocketSubscriptionAction : () => BaseAction = () => ({
  type: actionIds.STOP_SOCKET_SUBSCRIPTION,
  payload: null,
 });
 
export const currencyUpdateReceivedAction : (update : CurrencyUpdate) => BaseAction = (update) => ({
type: actionIds.CURRENCY_UPDATE_RECEIVED,
payload: update,
});
