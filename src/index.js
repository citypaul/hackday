import React from 'react';
import ReactDOM from 'react-dom';
import SnapshotGeneratorContainer from './containers/snapshot-generator-container';
import MatchViewContainer from './containers/match-view-container';
import './main.css';
import { Router, Route, Link, browserHistory } from 'react-router'


ReactDOM.render(
    <Router history={browserHistory}>
      <Route path="/" component={SnapshotGeneratorContainer}>
        <Route path="/" component={SnapshotGeneratorContainer}/>
      </Route>

      <Route path="/match" component={MatchViewContainer}>
        <Route path="match" component={MatchViewContainer} />
      </Route>
    </Router>,
  document.getElementById('root')
);
