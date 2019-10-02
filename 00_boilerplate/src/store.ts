import { createStore, compose } from 'redux';
import { rootReducers } from './reducers';

const composeEnhancer =
  (process.env.NODE_ENV !== 'production' &&
    window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__']) ||
  compose;

export const store = createStore(rootReducers, {}, composeEnhancer());
