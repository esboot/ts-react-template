import * as React from 'react';
import { hot } from 'react-hot-loader/root'; // eslint-disable-linee
import Demo from './component/demo';

const App = () => (
  <div>
    <Demo />
  </div>
);

// @ts-ignore
export default hot(App);
