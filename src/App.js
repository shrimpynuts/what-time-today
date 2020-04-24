import React, { useEffect } from 'react';
import MyCalendar from './components/mycalendar/MyCalendar.js';
import { handleClientLoad, handleAuthClick } from './util/auth';
import { outputToString } from './util/dateTime';
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import { List } from '@material-ui/core';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Privacy from './components/privacy/Privacy';
import About from './components/about/About';
import { copyToClipboard } from './util/util';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getAvailabilities } from './redux/selectors';
import { signIn, signOut, clearAllEvents, clearCalendars, clearAvailabilities } from './redux/actions';
import { getAndDisplayEvents } from './util/gapi';
import './style/App.css';

var peep1 = require('./assets/peep1.png');
var rand = Math.floor(Math.random() * 16) + 2; 
var peep2 = require('./assets/peep' + rand.toString() + '.png');

// PORT=$PORT react-scripts start
// serve -s build

function App() {
  const dispatch = useDispatch();
  const { availabilities } = useSelector(getAvailabilities);

  const classes = makeStyles({
    card: {
    borderRadius: 0,
    backgroundColor: "grey",
    color: "black",
    boxShadow: "none"
    }
  });

  function signOutOfApp() {
    dispatch(signOut());
    dispatch(clearAllEvents());
    dispatch(clearCalendars());
  }

  useEffect(() => {
    handleClientLoad(setUserCallback, authenticatedCallback);
  }, []);

  const setUserCallback = (user) => {
    if (user) {
        let newUser = {
          firstName: user.Pt.pW,
          lastName: user.Pt.qU,
          email: user.Pt.yu,
        }
        dispatch(signIn(newUser));
        getAndDisplayEvents(dispatch);
    } else {
      // dispatch(signOut());
    }
  }

  const authenticatedCallback = () => {
    console.log("Already authenticated, requesting calendar now");
    // ref.current.getAndDisplayEvents();
  }

  const handleSignClick = () => {
    // If we sign out remove events
    if (handleAuthClick()) {
      signOutOfApp();
    } else {
      console.log("Successfully authenticated after clicking sign in, requesting calendar now");
    }
  }

  const home = (      
    <div className="Body">
      <div className="Calendar">
          <MyCalendar initDate={new Date()}/>
      </div>
    <div>
    <div className="below-calendar">
      <img className="peep1" src={peep1} />
          <div id="lol">   

            <div className="copytext">
              {document.queryCommandSupported('copy') &&
              <button style={{marginBottom: 10}} onClick={(e) => {copyToClipboard(e, 'lol', availabilities)}}>Copy</button>}
              <button style={{marginBottom: 10, marginLeft: 20}} onClick={() => {dispatch(clearAvailabilities());}}>Clear</button> 
            </div>

        <Card classes={{ root: classes.card }} variant="outlined">
          <List style={{maxHeight: 300, overflow: 'auto'}}>
              <CardContent>
              {outputToString(availabilities).map((out, i) => {
                return <p key={i} style={{textAlign: "left", fontSize: 13}}>{out}</p>
              })}
              </CardContent>
          </List>
        </Card>
        </div>
        <img className="peep2" src={peep2}/>
      </div>
      </div>
    </div>);
      
  return (
    <Router>
        <div className="App-border">
        <div className="App">
          <Header handleSignClick={handleSignClick}/>
              <Switch>
                <Route path="/privacy">
                  <div className="otherbody">
                    <Privacy/>
                  </div>
                </Route>

                <Route path="/about">
                  <div className="otherbody">
                    <About/>
                  </div>
                </Route>

                <Route path="/">
                    {home}
                </Route>
              </Switch>
          <Footer/>
    </div>
    </div>
    </Router>
  );
}

export default App;
