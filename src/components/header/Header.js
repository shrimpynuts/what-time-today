import React from "react";
import { useSelector } from "react-redux";
import { OverlayTrigger, Tooltip, Button, Image, Badge } from "react-bootstrap";

import GoogleButton from "../../assets/google.png";
import "./Header.css";

export default function Header({ handleLoginClick, handleAvatarClick, localSession }) {
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
            (
              <OverlayTrigger
                  placement={"bottom"}
                  overlay={
                    <Tooltip className="overlay" style={{ zIndex: 3 }}>
                      {
                        (user.localSession != localSession) ? "🧠 Cached from last time\r\n" : ""
                      }
                      {"👌 Click to delete calendar\r\n"}
                      {"🕰 Imported on "}{user.importDate}
                    </Tooltip>
                  }
                >
                <div class="avatar-div" style={{position: 'relative'}}>
                  <div class="notify-badge">-</div>
                  <Image
                    className=
                    {
                      (user.localSession == localSession) ? "avatar" : "avatar grayscale"
                    }
                    src={user.img}
                    rounded
                    width={40}
                    height={40}
                    onClick={() => handleAvatarClick(user.email)}
                  />
                </div>
              </OverlayTrigger>
            )
          )
        }

        <OverlayTrigger
            placement={"bottom"}
            overlay={
              <Tooltip className="overlay" style={{ zIndex: 3 }}>
                {"Import your Google Calendar events"}
              </Tooltip>
            }
          >
          <Image
            style={{ cursor: "pointer", 'margin-left': 12 }}
            onClick={handleLoginClick}
            src={GoogleButton}
          />
        </OverlayTrigger>


      </div>
    </div>
  );
}
