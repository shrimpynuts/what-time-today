import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useDispatch } from "react-redux";

import Privacy from "./components/privacy/Privacy";
import About from "./components/about/About";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import { handleClientLoad, handleAuthClick } from "./util/auth";
import {
  signIn,
  signOut,
  clearAllEvents,
  clearCalendars,
} from "./redux/actions";
import { getAndDisplayEvents } from "./util/gapi";
import Home from "./components/Home";

import "./style/App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const dispatch = useDispatch();

  const setUserCallback = (user) => {
    if (user) {
      let userProfile = user.getBasicProfile();
      let newUser = {
        firstName: userProfile.getGivenName(),
        lastName: userProfile.getFamilyName(),
        email: userProfile.getEmail(),
      };
      dispatch(signIn(newUser));
      getAndDisplayEvents(dispatch);
    } else {
      // dispatch(signOut());
    }
  };

  const authenticatedCallback = () => {};

  useEffect(() => {
    console.log("Loading client");
    handleClientLoad(setUserCallback, authenticatedCallback);
  }, []);

  const handleSignClick = () => {
    // If we sign out remove events
    if (handleAuthClick()) {
      signOutOfApp();
    } else {
    }
  };

  function signOutOfApp() {
    dispatch(signOut());
    dispatch(clearAllEvents());
    dispatch(clearCalendars());
  }

  return (
    <div className="App">
      <Router>
        <Header handleSignClick={handleSignClick} />
        <Switch>
          <Route path="/privacy">
            <Privacy />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/">{<Home />}</Route>
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
