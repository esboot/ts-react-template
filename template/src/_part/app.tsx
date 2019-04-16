import * as React from 'react';
import { hot } from 'react-hot-loader'; // eslint-disable-line
import Demo from './component/demo';

const App = () => (
  <div>
    <Demo />
  </div>
);

// @ts-ignore
export default hot(module)(App);
