import React from "react";
import { AppBar } from "@material-ui/core";
import { useSelector } from "react-redux";
import { OverlayTrigger, Tooltip, Button, Image } from "react-bootstrap";
import GoogleButton from "react-google-button";
import "./Header.css";

export default function Header(props) {
  const user = useSelector((state) => state.user);
  return (
    <AppBar position="static" style={{ background: "white", color: "black" }}>
      <div className="titlediv">
        {user && <Image src={user.img} roundedCircle width={40} height={40} />}
        {!user ? (
          <OverlayTrigger
            placement={"bottom"}
            overlay={
              <Tooltip className="overlay" style={{ zIndex: 3 }}>
                {"Imports Google Calendar events to calendar."}
              </Tooltip>
            }
          >
            <GoogleButton onClick={props.handleSignClick} />
          </OverlayTrigger>
        ) : (
          <Button variant="Light" onClick={props.handleSignClick}>
            Log out
          </Button>
        )}
      </div>
    </AppBar>
  );
}
