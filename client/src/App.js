import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import LandingPage from './components/views/LandingPage/LandingPage'
import LoginPage from './components/views/LoginPage/LoginPage';
import RegisterPage from './components/views/RegisterPage/RegisterPage';
import Auth from './hoc/auth'
import Search from './components/views/Search/Search';




function App() {
  return (
    <Router>
      <div>
        {/*
          A <Switch> looks through all its children <Route>
          elements and renders the first one whose path
          matches the current URL. Use a <Switch> any time
          you have multiple routes, but you want only one
          of them to render at a time
        */}
        <Switch>
          <Route exact path="/" component={Auth(LoginPage, false )  } />
          <Route exact path="/LangdingPage" component={Auth(LandingPage, true) } />
          <Route exact path="/register" component={Auth(RegisterPage, false)} />
          <Route exact path="/Search" component={Auth(Search, true)} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;

