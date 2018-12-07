import { combineReducers} from 'redux';
import { myNumberCollectionReducer, MyNumberCollectionState } from './my-number.reducer';
import { currenciesReducer, CurrenciesState} from './currencies.reducer';

export interface State {
  myNumberCollectionState : MyNumberCollectionState;
  currenciesState : CurrenciesState;
};

export const reducers = combineReducers<State>({
  myNumberCollectionState: myNumberCollectionReducer,
  currenciesState: currenciesReducer,
});
