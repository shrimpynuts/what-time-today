import React, { useEffect, useState, useRef } from 'react';
import MyCalendar from './components/mycalendar/MyCalendar.js';
import { handleClientLoad, handleAuthClick } from './util/auth';
import { outputToString, outputToStringCopy } from './util/dateTime';
import './App.css';
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar } from '@material-ui/core';


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
  
  return (
    <div className="App">
      <AppBar position="static" style={{background: 'white', color: "black"}}> 
        <Toolbar>
          Meet { user ? user.Pt.pW : "Me" }
            <button style={{margin: 10, float: "left"}}onClick={handleSignClick}>
              {user ? "Google Sign Out" : "Google Sign In" }
            </button>
          </Toolbar>
        </AppBar>

        <div className="Body">

          <div className="Calendar">
              <MyCalendar ref={ref} addToOutput={setOutput} initDate={new Date()}/>
          </div>
        <div>
          
        <div style={{
          paddingBottom: -20,
          paddingTop: 20, display: "flex",
          flexDirection: "row",
          justifyContent: "space-between"
         }}>
            <img className="peep1" src={peep1} />
              
                <div id="lol">   
                  <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
                    {
                    /* Logical shortcut for only displaying the 
                        button if the copy command exists */
                    document.queryCommandSupported('copy') &&
                        <button style={{marginBottom: 10}}onClick={copyToClipboard}>Copy</button> 
                      }
                    <button style={{marginBottom: 10}}onClick={clearAvailability}>Clear</button> 
                  </div>

              <Card classes={{ root: classes.card }} variant="outlined">
                <CardContent>
                  
                {outputToString(output).map((out, i) => {
                  return <p key={i} style={{textAlign: "left", fontSize: 13}}>{out}</p>
                })}

                </CardContent>
              </Card>
              </div>



              <img className="peep2" src={peep2}/>
          </div>
        </div>
        

        </div>
    </div>
  );
}

export default App;
