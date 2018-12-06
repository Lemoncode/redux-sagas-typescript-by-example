import { combineReducers} from 'redux';
import { myNumberCollectionReducer, MyNumberCollectionState } from './my-number.reducer';

export interface State {
  myNumberCollectionState : MyNumberCollectionState;
};

export const reducers = combineReducers<State>({
  myNumberCollectionState: myNumberCollectionReducer
});
