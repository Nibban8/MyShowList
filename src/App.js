import React from 'react';

import Home from './containers/Home';
import Popular from './containers/Popular';
import Top from './containers/Top';
import Tendencias from './containers/Tendencias';
import NavBar from './components/NavBar';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

export default function App() {
  return (
    <Router>
      <NavBar />

      <React.StrictMode>
        <span className='content'>
          <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/popular' component={Popular} />
            <Route path='/top_rated' component={Top} />
            <Route path='/trending' component={Tendencias} />
          </Switch>
        </span>
      </React.StrictMode>
    </Router>
  );
}
