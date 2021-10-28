import * as React from 'react';
import { Route, Link } from 'react-router-dom';
import Demo from '@/components/demo';

const App: React.FC = () => (
  <div>
    <Route path="/" exact render={() => <Link to="/demo">to demo</Link>} />
    <Route path="/demo" component={Demo} />
  </div>
);

export default App;
