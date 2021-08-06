import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Privacy from "./components/privacy/Privacy";
import About from "./components/about/About";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import { handleClientLoad, forceSignIn, forceSignOut } from "./util/auth";
import {
  signIn,
  signOut,
  signOutAll,
  clearAllEvents,
  clearSpecificEvents,
  clearCalendars,
  clearSpecificCalendar,
} from "./redux/actions";
import { getAndDisplayEvents } from "./util/gapi";
import Home from "./components/Home";
import { getUsers } from "./redux/selectors";

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
        img: userProfile.getImageUrl(),
      };

      dispatch(signIn(newUser));
      getAndDisplayEvents(dispatch, newUser.email);

    }
  };

  const authenticatedCallback = () => {
    // Begin the app with every user signed out
    
  };

  useEffect(() => {
    console.log("Loading client");
    handleClientLoad(setUserCallback, authenticatedCallback);
  }, []);

  function handleAvatarClick(email) {
    dispatch(signOut(email));
    dispatch(clearSpecificCalendar(email));
    dispatch(clearSpecificEvents(email));
  }

  return (
    <div className="App">
      <Router>
        <Header handlePlusClick={forceSignIn} handleAvatarClick={handleAvatarClick} />
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
