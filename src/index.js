import React from 'react';
import ReactDOM from 'react-dom';
import SnapshotGeneratorContainer from './containers/snapshot-generator-container';
import './main.css';
import { Router, Route, Link, browserHistory } from 'react-router'


ReactDOM.render(
    <Router history={browserHistory}>
      <Route path="/" component={SnapshotGeneratorContainer}>
        <Route path="match" component={SnapshotGeneratorContainer}/>
      </Route>
    </Router>,
  document.getElementById('root')
);
