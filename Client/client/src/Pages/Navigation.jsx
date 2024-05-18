import React from "react";
import { Link } from "react-router-dom";

const Navigation = () => {
  const fancyFont = {
    fontFamily: "cursive",
    fontSize: "1.6rem",
  };

  return (
    <nav>
      <ul>
        <li>
          <Link to="/dashboard" style={fancyFont}>
            Gyaan<span style={{ fontWeight: "bold" }}>Bhavan</span>
          </Link>
        </li>
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link to="/search">Search</Link>
        </li>
        <li>
          <Link to="/fine">Fine</Link>
        </li>
        <li>
          <Link to="/">Logout</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
