import React, { useEffect, useState, useRef } from 'react';
import MyCalendar from './components/mycalendar/MyCalendar.js';
import { handleClientLoad, handleAuthClick } from './util/auth';
import { outputToString, outputToStringCopy } from './util/dateTime';
import './App.css';
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, List } from '@material-ui/core';
import { BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";

// PORT=$PORT react-scripts start

const useStyles = makeStyles({
  card: {
   borderRadius: 0,
   backgroundColor: "grey",
   color: "black",
   boxShadow: "none"
  }
 });

var peep1 = require('./assets/peep1.png');
var peep2 = require('./assets/peep2.png');

function App() {

  const classes = useStyles;

  const [user, setUser] = useState(null);
  const [output, setOutput] = useState([]);

  useEffect(() => {
    handleClientLoad(setUser, authenticatedCallback);
  }, []);

  useEffect(() => {
    if (user) {
      ref.current.getAndDisplayEvents();
    }
  }, [user]);

  const ref = useRef(null);

  const authenticatedCallback = () => {
    console.log("Already authenticated, requesting calendar now");
    // ref.current.getAndDisplayEvents();
  }

  const handleSignClick = () => {
    // If we sign out remove events
    if (handleAuthClick()) {
      ref.current.signOut();
    } else {
      console.log("Successfully authenticated after clicking sign in, requesting calendar now");
    }
  }

  const clearAvailability = () => {
    ref.current.clearAvailability();
  }
  
  // https://stackoverflow.com/questions/46041831/copy-to-clipboard-with-break-line
  function copyToClipboard(e) {
      // Step 1: create a textarea element.
      // It is capable of holding linebreaks (newlines) unlike "input" element
      const myFluffyTextarea = document.createElement('textarea');

      // Step 2: Store your string in innerHTML of myFluffyTextarea element        
      myFluffyTextarea.innerHTML = outputToStringCopy(output);

      // Step3: find an id element within the body to append your myFluffyTextarea there temporarily
      const parentElement = document.getElementById('lol');
      parentElement.appendChild(myFluffyTextarea);

      // Step 4: Simulate selection of your text from myFluffyTextarea programmatically 
      myFluffyTextarea.select();

      // Step 5: simulate copy command (ctrl+c)
      // now your string with newlines should be copied to your clipboard 
      document.execCommand('copy');
      // Step 6: Now you can get rid of your fluffy textarea element
      parentElement.removeChild(myFluffyTextarea);
  };


const home = (      
<div className="Body">
<div className="Calendar">
    <MyCalendar ref={ref} addToOutput={setOutput} initDate={new Date()}/>
</div>
<div>

<div className="below-calendar">
  <img className="peep1" src={peep1} />
      <div id="lol">   
        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
          {
          document.queryCommandSupported('copy') &&
              <button style={{marginBottom: 10}} onClick={copyToClipboard}>Copy</button> 
            }
          <button style={{marginBottom: 10, marginLeft: 20}} onClick={clearAvailability}>Clear</button> 
        </div>

    <Card classes={{ root: classes.card }} variant="outlined">
      <List style={{maxHeight: 300, overflow: 'auto'}}>
          <CardContent>
          {outputToString(output).map((out, i) => {
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
          <AppBar position="static" style={{
            background: 'white',
            color: "black"}}> 
            <div style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                paddingLeft: 30,
                paddingRight: 30,
            }}>
              <Link to="/">
                <h1 className="title">
                What time today? 
                </h1>
              </Link>
          <div className="toolbar-buttons">

              <h3 className="title">
              { user ? "Hi, " + user.Pt.pW + "!" : "Hi, Guest!" }
              </h3>

            <button style={{
              margin: 10, 
              float: "left"}}
              onClick={handleSignClick}>
              {user ? "Google Sign Out" : "Google Sign In" }
            </button>
          </div>
          </div>
          </AppBar>

              <Switch>
                <Route path="/privacy">
                  <div className="otherbody">
                    <div>
                    <p>Your Google Calendar data will only be retrieved if you decide to sign in. </p>
                    <p>If you choose to sign in, this data is retrieved through the Google Calendar API and is only used to display on the home page.</p>
                    <p>You may revoke access to your Google Calendar data by signing out, and the data will be removed from your session.</p>
                    <p>The availabities that you select on the calendar only persist for your session and is not stored anywhere.</p>
                    <p>None of your data will persist.</p>
                    <p>Your data will not be shared publicly or with any third party.</p>
                    <p>This project is <a style={{color: 'black'}} target="_blank" href="https://github.com/jonathancai11/what-time-today">open source</a>.</p>
                    <p>If you have any questions or concerns, feel free to email caimjonathan@gmail.com.</p>
                    </div>
                  </div>
                </Route>
                <Route path="/about">
                  <div className="otherbody">
                    <div>
                    <p>Created by <a style={{color: 'black'}} target="_blank" href="https://jonathancai.com/">Jonathan Cai</a>.</p>
                    <p>View the code <a style={{color: 'black'}} target="_blank" href="https://github.com/jonathancai11/what-time-today">here</a>.</p>
                    <p>April 2020.</p>
                    </div>
                  </div>
                </Route>
                <Route path="/">
                    {home}
                </Route>
              </Switch>

          <div className="footer">
          <a className="privacy-link" target="_blank" href="https://forms.gle/E83Y2mXJeLs9zLuJ7">Feedback?</a>
          <Link className="privacy-link" to="/privacy">Privacy</Link>
          <Link className="privacy-link" to="/about">About</Link>
        </div>
    </div>
    </div>
    </Router>
  );
}

export default App;
