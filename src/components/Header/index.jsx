import React, { Component } from 'react'
import header from './index.module.css'
export default class Header extends Component {
  render() {
    return (
      <div className={header.layout}>
        <div className={header.title}>TimeMix</div>
        <div className={header.userinfo}>userinfo</div>
      </div>
    )
  }
}
