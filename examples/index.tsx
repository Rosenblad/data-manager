import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import ApiBrowserExample from './api-browser-example';
import FoldersExample from './folders-example';

function Examples() {
  return (
    <Router>
      <Route component={ApiBrowserExample} path="/api-browser" exact />
      <Route component={FoldersExample} path="/" exact />
    </Router>
  )
}

ReactDOM.render(<Examples />, document.getElementById('root'));
