import React, { useEffect } from "react";
import "./NAVBAR.css";
import { useNavigate } from "react-router-dom";
export default function NAVBAR(props) {
  let history = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      history("/login");
    }
  }, []);

  let instagram = "";
  let phone = "";
  let gm = "";
  return (
    <div id="topnav">
      <div className="left">
        <a href="/">
          <b>AUTOMOBILE ANALYSIS</b>
        </a>
      </div>

      <div className="home_1">
        <a href="/company_analysis">
          <b>COMPANY WISE ANALYSIS</b>
        </a>
      </div>
      <div className="orders_1">
        <a href="/prediction">
          <b>PREDICTION</b>
        </a>
      </div>
    </div>
  );
}
