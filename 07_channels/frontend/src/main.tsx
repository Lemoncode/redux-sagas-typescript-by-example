import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {
  NumberViewerContainer,
  NumberSetterContainer,
  CurrencyTableContainer,
} from './components';
import { Provider } from 'react-redux';
import { store } from './store';

ReactDOM.render(
  <Provider store={store}>
    <>
      <CurrencyTableContainer />
      <NumberSetterContainer />
      <NumberViewerContainer />
    </>
  </Provider>,
  document.getElementById('root')
);
