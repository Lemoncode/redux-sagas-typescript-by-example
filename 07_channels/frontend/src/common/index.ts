export const actionIds = {
  GET_NUMBER_REQUEST_START: '[0] Request a new number to the NumberGenerator async service.',
  GET_NUMBER_REQUEST_COMPLETED: '[1] NumberGenerator async service returned a new number.',
  START_SOCKET_SUBSCRIPTION: '[2] Start listening to the web socket',
  STOP_SOCKET_SUBSCRIPTION: '[3] Close socket connection',
}

export interface BaseAction {
  type : string;
  payload: any;
}
