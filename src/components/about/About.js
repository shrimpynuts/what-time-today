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
          Made by{" "}
          <a
            style={{ color: "black" }}
            target="_blank"
            rel="noopener noreferrer"
            href="https://twitter.com/jonathanmcai"
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
