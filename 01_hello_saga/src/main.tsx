import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { MyNumberBrowserContainer, MyNumberSetterContainer } from './components';
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { Provider } from 'react-redux';
import { reducers } from './reducers';
import { rootSaga } from './sagas';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(reducers,{},
  compose(
    applyMiddleware(sagaMiddleware),
    window['__REDUX_DEVTOOLS_EXTENSION__'] ? window['__REDUX_DEVTOOLS_EXTENSION__']() : f => f
  )   
);


sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Provider store={store}>
    <>
      <MyNumberSetterContainer />
      <MyNumberBrowserContainer />    
    </>
  </Provider>,
  document.getElementById('root'));
