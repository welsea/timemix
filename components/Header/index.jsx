import React, { useContext, useState, useEffect } from "react";
import header from "./index.module.css";
import Router from "next/router";
import {
  BsFillCaretDownFill
} from "react-icons/bs";

export default function Header() {


  function gotoMain() {
    Router.push(
      {
        pathname: "/",
      },
      "/"
    );
  }

  return (
    <div className={header.layout}>
      <div className={header.title} onClick={gotoMain}>
        TimeMix
      </div>
      <div >
        {/* <div>demoUser</div> */}
      </div>
    </div>
  );
}