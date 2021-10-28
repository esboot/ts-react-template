import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './global-css/main.scss';
import { ConnectedRouter } from 'connected-react-router';
import { Provider } from 'react-redux';
import { HashRouter as Router } from 'react-router-dom';
import { store, history } from './model/store';
import App from './app';

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Router>
        <App />
      </Router>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root'),
);
