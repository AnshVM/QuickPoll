import React from "react";
import { Link } from "react-router-dom";
import "./hero.scss";
export default function Hero() {
  return (
    <div className="hero">
      <div className="left">
        <div className="tagLine">
          <p>
            Create and Monitor <span>Polls</span> in Real Time
          </p>
          <img className="curvedLine" src="curved_line.svg" alt="curved line" />
        </div>
        <Link to="/createPoll">
          <button className="createPoll" to="/createPoll">
            Create poll
          </button>
        </Link>
      </div>
      <img className="upvote" src="upvote.svg" alt="Upvote" />
    </div>
  );
}
