import { BaseAction, actionIds } from '../common';

export type MyNumberCollectionState = number[];

export const myNumberCollectionReducer = (state: MyNumberCollectionState = [0], action: BaseAction) => {
  switch (action.type) {
    case actionIds.GET_NUMBER_REQUEST_COMPLETED:
      return handleGetNumberRequestCompleted(state, action.payload);
    break;
  }

  return state;
}

const handleGetNumberRequestCompleted = (state : MyNumberCollectionState, newNumber : number) : MyNumberCollectionState => 
  [...state, newNumber];

