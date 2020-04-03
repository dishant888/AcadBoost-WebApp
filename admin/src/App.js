import React from 'react';
import Login from './components/Login';
import Admin from './components/Admin';
import Logout from './components/Logout'
import { BrowserRouter as Router,Switch,Route } from "react-router-dom";

function App() {
  return (
    <React.Fragment>
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/app" component={Admin} />
          <Route exact path="/logout" component={Logout} />
          <Route render={()=> <h1>This page do not exists</h1>} />
        </Switch>
      </Router>
    </React.Fragment>
  );
}

export default App;
