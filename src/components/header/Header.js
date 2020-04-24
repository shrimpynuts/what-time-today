import React from 'react';
import { AppBar } from '@material-ui/core';
import './Header.css'
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Header(props) {

    const user = useSelector(state => (state.user));

    return (
    <AppBar position="static" style={{background: 'white', color: "black"}}> 

        <div className="titlediv">

          <Link to="/">
            <h1 className="title">
            What time today? 
            </h1>
          </Link>

            <div className="toolbar-buttons">

                <h3 className="title">
                { user ? "Hi, " + user.firstName + "!" : "Hi, Guest!" }
                </h3>

                <button className="sign-button" onClick={props.handleSignClick}>
                {user ? "Google Sign Out" : "Google Sign In" }
                </button>
            </div> 


        <div className="phone-screen">
          <div className="otherbody">
              <p className="title">
                Working on mobile 😰
              </p>
          </div>
        </div>
      </div>
    </AppBar>
    );
}