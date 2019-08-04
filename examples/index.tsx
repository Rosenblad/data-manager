import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Navigation from './Navigation';

import ApiBrowserExample from './api-browser-example';
import FoldersExample from './folders-example';
import CssBaseline from '@material-ui/core/CssBaseline';

function Examples() {
  return (
    <Router>
      <CssBaseline />
      <Navigation />
      <Route component={ApiBrowserExample} path="/api-browser" exact />
      <Route component={FoldersExample} path="/" exact />
    </Router>
  )
}

ReactDOM.render(<Examples />, document.getElementById('root'));
