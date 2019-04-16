import { applyMiddleware, compose, createStore } from 'redux';
import rootReducer from './model/reducer';

declare var module;

export function configureStore(initialState = {}) {
  const store = createStore(
    rootReducer,
    initialState,
    compose(
      // @ts-ignore
      window.devToolsExtension ? window.devToolsExtension() : f => f,
    ),
  );

  if (module.hot) {
    module.hot.accept('./model/reducer', () => {
      store.replaceReducer(rootReducer);
    });
  }

  return store;
}
