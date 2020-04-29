import React, { useEffect, useState } from 'react';
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
import { DropdownButton, Dropdown, OverlayTrigger, Tooltip, Button } from 'react-bootstrap';
// import {OverlayTrigger, Tooltip} from 'react-bootstrap'.
import './style/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const moment = require('moment-timezone');

var peep1 = require('./assets/peep1.png');
var rand = Math.floor(Math.random() * 16) + 2; 
var peep2 = require('./assets/peep' + rand.toString() + '.png');


var offset = Intl.DateTimeFormat().resolvedOptions().timeZone;
var USTimeZones = ["America/Los_Angeles", "America/Chicago", "America/New_York"];
var AllTimeZones = [...USTimeZones.filter(tz => tz !== offset), offset];

function App() {

  const [timeZone, setTimeZone] = useState(offset);
  const [timeZones, setTimeZones] = useState(AllTimeZones.filter((tz) => tz !== offset));

  useEffect(() => {
    setTimeZones(AllTimeZones.filter((tz) => tz !== timeZone));
  }, [timeZone]);


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
    // console.log("Already authenticated, requesting calendar now");
    // ref.current.getAndDisplayEvents();
  }

  const handleSignClick = () => {
    // If we sign out remove events
    if (handleAuthClick()) {
      signOutOfApp();
    } else {
      // console.log("Successfully authenticated after clicking sign in, requesting calendar now");
    }
  }

  var width = window.innerWidth;


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
                <OverlayTrigger
                placement={"top"}
                overlay={
                  <Tooltip>
                    Copies the text below to your clipboard.
                  </Tooltip>
                }
              >
                <Button variant="Light" onClick={(e) => {copyToClipboard(e, 'lol', availabilities, timeZone)}}>Copy</Button>
              </OverlayTrigger>
              }

              <OverlayTrigger
                placement={"top"}
                overlay={
                  <Tooltip>
                    Deletes all availabilities on the calendar.
                  </Tooltip>
                }
              >
                <Button variant="Light" onClick={() => {dispatch(clearAvailabilities());}}>Clear</Button> 
              </OverlayTrigger>

              <OverlayTrigger
                placement={"top"}
                overlay={
                  <Tooltip>
                    Changes the time zone that your availabilities are translated to.
                  </Tooltip>
                }
              >
                  <DropdownButton 
                  variant="Light"
                  drop={"down"}
                  id="dropdown-basic-button" title={moment().tz(timeZone).zoneAbbr()}>
                    {timeZones.map((timeZone) =>
                      <Dropdown.Item as="a" onClick={() => {setTimeZone(timeZone)}}>{moment().tz(timeZone).zoneAbbr()}</Dropdown.Item>
                    )}
                  </DropdownButton>
              </OverlayTrigger>
            </div>

        <Card className="output-card" classes={{ root: classes.card }} variant="outlined">
          <List style={{maxHeight: 240, overflow: 'auto'}}>
              <CardContent>
              {outputToString(availabilities, timeZone).map((out, i) => {
                return <p key={i} style={{textAlign: "left", fontSize: 13}}>{out}</p>
              })}
              </CardContent>
          </List>
        </Card>
        </div>
        {
          // width 
          <img className="peep2" src={peep2}/>

        }
      </div>
      </div>
    </div>);

      
  return (
    <div className="App">
    {/* <div className="App-border"> */}
        <Router>
          <Header handleSignClick={handleSignClick}/>
              <Switch>
                <Route path="/privacy">
                  {/* <div className="otherbody"> */}
                    <Privacy/>
                  {/* </div> */}
                </Route>

                <Route path="/about">
                  {/* <div className="otherbody"> */}
                    <About/>
                  {/* </div> */}
                </Route>

                <Route path="/">
                    {home}
                </Route>
              </Switch>
          <Footer/>
    </Router>
    {/* </div> */}
  </div>
  );
}

export default App;
