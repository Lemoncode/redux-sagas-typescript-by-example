import { BaseAction, actionIds } from './common';
import { CurrencyUpdate } from './model';

export const numberRequestStartAction = (): BaseAction => ({
  type: actionIds.GET_NUMBER_REQUEST_START,
  payload: null,
});

export const numberRequestCompletedAction = (
  numberGenerated: number
): BaseAction => ({
  type: actionIds.GET_NUMBER_REQUEST_COMPLETED,
  payload: numberGenerated,
});

export const cancelOnGoingNumberRequestAction: () => BaseAction = () => ({
  type: actionIds.CANCEL_ONGOING_NUMBER_REQUEST,
  payload: null,
});

export const numberRequestUserConfirmationAction: (
  goahead: boolean
) => BaseAction = goahead => ({
  type: actionIds.GET_NUMBER_REQUEST_USER_CONFIRMATION,
  payload: goahead,
});

export const startSocketSubscriptionAction: () => BaseAction = () => ({
  type: actionIds.START_SOCKET_SUBSCRIPTION,
});

export const stopSocketSubscriptionAction: () => BaseAction = () => ({
  type: actionIds.STOP_SOCKET_SUBSCRIPTION,
});

export const currencyUpdateReceivedAction: (
  update: CurrencyUpdate
) => BaseAction = update => ({
  type: actionIds.CURRENCY_UPDATE_RECEIVED,
  payload: update,
});
