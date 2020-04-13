import React, { useEffect, useState, useRef } from 'react';
import MyCalendar from './components/MyCalendar.js';
import { handleClientLoad, handleAuthClick } from './util/auth';
import { outputToString } from './util/dateTime';
import './App.css';

function App() {

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

  const updateOutput = (output) => {
    setOutput(output);
  }

  const handleSignClick = () => {
    // If we sign out remove events
    if (handleAuthClick()) {
      ref.current.removeEvents();
    } else {
      console.log("Successfully authenticated after clicking sign in, requesting calendar now");
    }
  }
  

  return (
    <div className="App">
      <div>
      <h1>{ user ? user.Pt.pW + "'s Calendar" : null }</h1>

        <div>
          <div className="AuthPanel">
            <button onClick={handleSignClick}>{user ? "Sign Out" : "Sign In" }</button>
            {/* <button onClick={handleClick}>Get calendar</button> */}
          </div>
          <br/>

          <div className="Calendar">
              <MyCalendar ref={ref} addToOutput={updateOutput} initDate={new Date()}/>
          </div>

        <div>
          <h2>Selected Availability</h2>
          {outputToString(output).map((out, i) => {
            return <p key={i}>{out}</p>
          })}
        </div>
        </div>
      </div>
    </div>
  );
}

export default App;
