import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { NumberViewerContainer } from './components';
import { Provider } from 'react-redux';
import { store } from './store';

ReactDOM.render(
  <Provider store={store}>
    <>
      <NumberViewerContainer />
    </>
  </Provider>,
  document.getElementById('root')
);
