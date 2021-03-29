import React, { useEffect, useState } from "react";

export default function About() {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://api.countapi.xyz/get/whattime.today/copy");
    xhr.responseType = "json";
    xhr.onload = function () {
      setCounter(this.response.value);
    };
    xhr.send();
  }, []);

  return (
    <div className="not-homepage">
      <div className="aboutpage">
        <p>
          Thanks to{" "}
          <a
            style={{ color: "black" }}
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.instagram.com/pablostanley/"
          >
            Pablo Stanley
          </a>{" "}
          for{" "}
          <a
            style={{ color: "black" }}
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.instagram.com/pablostanley/"
          >
            Open Peeps
          </a>
          .{" "}
        </p>
        <p>
          Thanks to{" "}
          <a
            style={{ color: "black" }}
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/jquense"
          >
            jquense
          </a>{" "}
          for{" "}
          <a
            style={{ color: "black" }}
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.npmjs.com/package/react-big-calendar/"
          >
            react-big-calendar
          </a>
          .
        </p>
        <p>
          Made by{" "}
          <a
            style={{ color: "black" }}
            target="_blank"
            rel="noopener noreferrer"
            href="https://jonathancai.com/"
          >
            Jonathan Cai
          </a>
          .
        </p>
        <p>
          Code is{" "}
          <a
            style={{ color: "black" }}
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/jonathancai11/what-time-today"
          >
            here
          </a>
          .
        </p>
        <p>April 2020.</p>
        <p>Created {counter} events so far!</p>
      </div>
    </div>
  );
}
