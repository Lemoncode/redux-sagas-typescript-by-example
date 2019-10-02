import { BaseAction, actionIds } from './common';

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
