import { combineReducers, applyMiddleware, compose, createStore } from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createHashHistory } from 'history';
import thunk from 'redux-thunk';

import appReducer from './reducer';

export const history = createHashHistory();

export interface IRootState {
  router: any;
  appState: any;
}

function configureStore() {
  const store = createStore(
    combineReducers<any>({
      appState: appReducer,
      router: connectRouter(history),
    }),
    {},
    compose(
      applyMiddleware(
        routerMiddleware(history),
        thunk,
        // ... other middlewares ...
      ),
      window.__REDUX_DEVTOOLS_EXTENSION__(),
    ),
  );

  return store;
}

export const store = configureStore();
