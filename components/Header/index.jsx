import React, { Component } from 'react'
import header from './index.module.css'
import Router from 'next/router';

export default function Header() {
  function gotoUser(id){
    Router.push({
      pathname:'/mine',
      query:{
        id:2,
        name:id,
      }
    },'/profile')
  }

  return (
    <div className={header.layout}>
      <div className={header.title}>TimeMix</div>
      <div className={header.userinfo} onClick={()=>gotoUser(1)}>user</div>
    </div>
  )
  
}

