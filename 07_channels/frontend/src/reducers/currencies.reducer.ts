import { BaseAction, actionIds } from '../common';
import { CurrencyUpdate } from '../model';

export type CurrenciesState = CurrencyUpdate[];

export const currenciesReducer = (state: CurrenciesState = [], action: BaseAction) => {
  switch (action.type) {
    case actionIds.CURRENCY_UPDATE_RECEIVED:
      return handleCurrencyUpdateCompleted(state, action.payload);    
  }

  return state;
}

const handleCurrencyUpdateCompleted = (state : CurrenciesState, currencyUpdate : CurrencyUpdate) : CurrenciesState => {
  const notUpdated = state.filter((currency) => currency.id != currencyUpdate.id);

  return [currencyUpdate, ...notUpdated];
}  