import React, { Component } from 'react'
import header from './index.module.css'
import Router from 'next/router';
import { getFontDefinitionFromManifest } from 'next/dist/server/font-utils';

export default function Header() {
  function gotoUser(){
    Router.push({
      pathname:'/user',
      // query:{
      //   id:2,
      //   name:id,
      // }
    },'/user')
  }

  function gotoMain(){
    Router.push({
      pathname:'/',
      // query:{
      //   id:2,
      //   name:id,
      // }
    },'/')
  }

  return (
    <div className={header.layout}>
      <div className={header.title} onClick={gotoMain}>TimeMix</div>
      <div className={header.userinfo} onClick={()=>gotoUser()}>user</div>
    </div>
  )
  
}

