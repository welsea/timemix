import React, { useContext, useState, useEffect } from "react";
import header from "./index.module.css";
import Router from "next/router";
import { UserContext } from "../../pages";
import {
  BsFillCaretDownFill
} from "react-icons/bs";

export default function Header() {
  const content = useContext(UserContext);
  const [user, setUser] = content.user;
  const [isShow, setIsShow] = useState(false)

  function gotoUser() {
    let username = user.username;
    let uid = user.uid;
    Router.push(
      {
        pathname: "/user/",
        query: {
          id: uid,
        },
      },
      "/user/"
    );
  }

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
      <div>
        <div onClick={()=>setIsShow(!isShow)}>{user.username} <BsFillCaretDownFill /></div>
       {isShow && <div className={header.list}>Change Timezone</div>}
      </div>
    </div>
  );
}
