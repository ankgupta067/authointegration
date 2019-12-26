import React from "react";
import { Route } from "react-router-dom";
import Home from "./Home";
import Profile from "./Profile";
import Nav from "./Nav";
import Auth from "./Auth/Auth";
import Callback from "./Callback";
import Public from "./Public";
import Private from "./Private";

const App = props => {
  const auth0 = new Auth(props.history);
  return (
    <>
      <Nav auth={auth0} />
      <div className="body">
        <Route
          path="/"
          exact
          render={props => <Home auth={auth0} {...props}></Home>}
        />
        <Route
          path="/callback"
          render={props => <Callback auth={auth0} {...props}></Callback>}
        />
        <Route
          path="/profile"
          render={props => <Profile auth={auth0} {...props}></Profile>}
        />
        <Route path="/public" render={() => <Public></Public>}></Route>
        <Route
          path="/private"
          render={props =>
            auth0.isAuthenticated() ? (
              <Private auth={auth0} {...props}></Private>
            ) : (
              auth0.login()
            )
          }
        />
      </div>
    </>
  );
};
export default App;
