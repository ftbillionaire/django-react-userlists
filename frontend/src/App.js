import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Link,
  Switch,
  Route
} from "react-router-dom";
import Users from './components/users_component';
import Groups from './components/groups_component';

function WelcomePage(){
    return <h1 className="mt-3">Welcome!</h1>
}

export default function App(){
  return (
    <Router>
      <div className="col-6 offset-2 mt-5 App">
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <Link className="nav-link" to='/users'>Users</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to='/groups'>Groups</Link>
          </li>
        </ul>
        <Switch>
          <Route exact path="/">
            <WelcomePage />
          </Route>
          <Route path="/users">
            <Users />
          </Route>
          <Route path="/groups">
            <Groups />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}