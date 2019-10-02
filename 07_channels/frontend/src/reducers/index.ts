import { combineReducers } from 'redux';
import {
  numberCollectionReducer,
  NumberCollectionState,
} from './number-collection.reducer';
import { currenciesReducer, CurrenciesState} from './currencies.reducer';

export interface State {
  numberCollection: NumberCollectionState;
  currenciesState : CurrenciesState;
}

export const rootReducers = combineReducers<State>({
  numberCollection: numberCollectionReducer,
  currenciesState: currenciesReducer,
});
