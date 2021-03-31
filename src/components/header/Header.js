import React from "react";
import { useSelector } from "react-redux";
import { OverlayTrigger, Tooltip, Button, Image } from "react-bootstrap";

import GoogleButton from "../../assets/google.png";
import "./Header.css";

export default function Header({ handleSignClick }) {
  const user = useSelector((state) => state.user);

  return (
    <div className="header">
      <div className="titlediv">
        <a href="/">
          <img src="/logo.svg" alt="" height={40} />
        </a>

        <div>
          {!user ? (
            <OverlayTrigger
              placement={"bottom"}
              overlay={
                <Tooltip className="overlay" style={{ zIndex: 3 }}>
                  {"Imports your Google Calendar events."}
                </Tooltip>
              }
            >
              <div style={{ cursor: "pointer" }} onClick={handleSignClick}>
                <img src={GoogleButton} alt="" />
              </div>
            </OverlayTrigger>
          ) : (
            <Button variant="Light" onClick={handleSignClick}>
              Log out
            </Button>
          )}
          {user && (
            <Image
              className="avatar"
              src={user.img}
              roundedCircle
              width={40}
              height={40}
            />
          )}
        </div>
      </div>
    </div>
  );
}
