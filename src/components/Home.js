import React, { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core/styles";
import { List } from "@material-ui/core";

import { copyToClipboard } from "../util/util";
import {
  DropdownButton,
  ToggleButtonGroup,
  ToggleButton,
  Dropdown,
  OverlayTrigger,
  Tooltip,
  Button,
} from "react-bootstrap";
import { outputToString } from "../util/dateTime";
import { clearAvailabilities } from "../redux/actions";
import { getAvailabilities } from "../redux/selectors";
import MyCalendar from "./mycalendar/MyCalendar.js";

const moment = require("moment-timezone");

var offset = Intl.DateTimeFormat().resolvedOptions().timeZone;
var USTimeZones = [
  "America/Los_Angeles",
  "America/Denver",
  "America/Chicago",
  "America/New_York",
];
var WorldWideTimeZones = [
  "Asia/Kolkata",
  "Asia/Shanghai",
  "Asia/Hong_Kong",
  "Asia/Tokyo",
  "Australia/Sydney",
  "Australia/Darwin",
  "Europe/Paris",
  "Europe/Berlin",
  "Etc/GMT",
];
var AllTimeZones = [
  offset,
  ...USTimeZones.filter((tz) => tz !== offset),
  ...WorldWideTimeZones.filter((tz) => tz !== offset),
].sort((a, b) => a > b);

export const messageTypes = [
  "Boring",
  "Cute",
  "Aggressive",
  "Elon",
  "Raw",
  "Inverse",
];

const classes = makeStyles({
  card: {
    borderRadius: 0,
    backgroundColor: "grey",
    color: "black",
    boxShadow: "none",
  },
});

export default function Home() {
  const [MonthDay, setMonthDay] = useState(true);
  const [timeZone, setTimeZone] = useState(offset);
  const [timeZones, setTimeZones] = useState(
    AllTimeZones.filter((tz) => tz !== offset)
  );
  const [AMPM, setAMPM] = useState(true);
  const [messageType, setMessageType] = useState(messageTypes[0]);
  useEffect(() => {
    setTimeZones(AllTimeZones.filter((tz) => tz !== timeZone));
  }, [timeZone]);
  const { availabilities } = useSelector(getAvailabilities);

  function Toolbar({ AMPM, setAMPM, availabilities }) {
    var width = window.innerWidth;

    const handleAMPMChange = (val) => {
      setAMPM(val.length !== 0);
    };

    const handleMonthDayChange = (val) => {
      setMonthDay(val.length !== 0);
    };

    const dispatch = useDispatch();

    return (
      <div className="copytext">
        {document.queryCommandSupported("copy") && (
          <OverlayTrigger
            placement={"top"}
            overlay={<Tooltip>Copy to your clipboard.</Tooltip>}
          >
            <Button
              variant="Light"
              onClick={(e) => {
                var xhr = new XMLHttpRequest();
                xhr.open(
                  "GET",
                  "https://api.countapi.xyz/hit/whattime.today/copy"
                );
                xhr.responseType = "json";
                xhr.send();
                copyToClipboard(
                  e,
                  "lol",
                  availabilities,
                  timeZone,
                  messageType,
                  AMPM,
                  MonthDay
                );
              }}
            >
              Copy
            </Button>
          </OverlayTrigger>
        )}

        <OverlayTrigger
          placement={"top"}
          overlay={<Tooltip>Made a mess? This cleans it up.</Tooltip>}
        >
          <Button
            variant="Light"
            onClick={() => {
              dispatch(clearAvailabilities());
            }}
          >
            Clear
          </Button>
        </OverlayTrigger>

        <OverlayTrigger
          placement={"top"}
          overlay={
            <Tooltip>
              Don't be rude, send it to them in <strong>their</strong> time
              zone.
            </Tooltip>
          }
        >
          <DropdownButton
            variant="Light"
            drop="down"
            data-flip="false"
            data-display="static"
            id="dropdown-button-drop-down"
            title={moment().tz(timeZone).zoneAbbr()}
          >
            {timeZones
              .sort((a, b) => a > b)
              .map((timeZone, i) => (
                <Dropdown.Item
                  key={i}
                  data-display="static"
                  data-flip="false"
                  as="a"
                  onClick={() => {
                    setTimeZone(timeZone);
                  }}
                >
                  {width < 850
                    ? moment().tz(timeZone).zoneAbbr()
                    : moment().tz(timeZone).zoneAbbr() + " - " + timeZone}
                </Dropdown.Item>
              ))}
          </DropdownButton>
        </OverlayTrigger>

        <OverlayTrigger
          placement={"top"}
          overlay={<Tooltip>Don't be boring.</Tooltip>}
        >
          <DropdownButton
            variant="Light"
            drop="down"
            id="dropdown-button-drop-down"
            title={messageType}
          >
            {messageTypes.map((type, i) => (
              <Dropdown.Item
                key={i}
                as="a"
                onClick={() => {
                  setMessageType(type);
                }}
              >
                {type}
              </Dropdown.Item>
            ))}
          </DropdownButton>
        </OverlayTrigger>

        <OverlayTrigger
          placement={"top"}
          overlay={<Tooltip>Not everyone is from America.</Tooltip>}
        >
          <ToggleButtonGroup
            type="checkbox"
            defaultValue={1}
            onChange={handleAMPMChange}
          >
            <ToggleButton value={1} variant="Light">
              AM/PM
            </ToggleButton>
          </ToggleButtonGroup>
        </OverlayTrigger>

        <OverlayTrigger
          placement={"top"}
          overlay={<Tooltip>Again, not everyone is from America.</Tooltip>}
        >
          <ToggleButtonGroup
            type="checkbox"
            defaultValue={1}
            onChange={handleMonthDayChange}
          >
            <ToggleButton value={1} variant="Light">
              {width < 600
                ? MonthDay
                  ? "M/D"
                  : "D/M"
                : MonthDay
                ? "Month/Day"
                : "Day/Month"}
            </ToggleButton>
          </ToggleButtonGroup>
        </OverlayTrigger>
      </div>
    );
  }

  return (
    <div className="Body">
      <div className="Calendar">
        <MyCalendar initDate={new Date()} />
      </div>
      <div>
        <div className="below-calendar">
          <div id="lol">
            <Toolbar
              AMPM={AMPM}
              setAMPM={setAMPM}
              availabilities={availabilities}
            />
            <Card
              className="output-card"
              classes={{ root: classes.card }}
              variant="outlined"
            >
              <List style={{ maxHeight: 150, overflow: "auto" }}>
                <CardContent>
                  {outputToString(
                    availabilities,
                    timeZone,
                    messageType,
                    AMPM,
                    MonthDay
                  ).map((out, i) => {
                    return (
                      <p key={i} style={{ textAlign: "left", fontSize: 13 }}>
                        {out}
                      </p>
                    );
                  })}
                </CardContent>
              </List>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
