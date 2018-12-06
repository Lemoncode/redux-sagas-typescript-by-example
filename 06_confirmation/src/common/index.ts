export const actionIds = {
  GET_NUMBER_REQUEST_START: '[0] Request a new number to the NumberGenerator async service.',
  GET_NUMBER_REQUEST_COMPLETED: '[1] NumberGenerator async service returned a new number.',
  GET_NUMBER_REQUEST_USER_CONFIRMATION: '[2] User has to confirm or cancel the number request before it gets fired',  
}

export interface BaseAction {
  type : string;
  payload: any;
}
