import React from "react";
import { useSelector } from "react-redux";
import { OverlayTrigger, Tooltip, Button, Image } from "react-bootstrap";

import GoogleButton from "../../assets/google.png";
import LoginButton from "../../assets/login.png";
import "./Header.css";

export default function Header({ handlePlusClick, handleAvatarClick }) {
  const users = useSelector((state) => state.users);

  return (
    <div className="header">
      <div className="logodiv">
        <a href="/">
          <img src="/logo.svg" alt="" height={40} />
        </a>
      </div>

      <div className="titlediv">
        {
          users.map((user, idx) =>
            <Image
              className="avatar"
              src={user.img}
              roundedCircle
              width={40}
              height={40}
              onClick={() => handleAvatarClick(user.email)}
            />
          )
        }

        <Image
          className="avatar"
          src={LoginButton}
          roundedCircle
          width={40}
          height={40}
          onClick={handlePlusClick}
        />
        
      </div>
    </div>
  );
}
