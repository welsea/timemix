import React, { Component } from 'react'
import header from './index.module.css'
import Link from 'next/link'


export default class Header extends Component {
  render() {
    return (
      <div className={header.layout}>
        <div className={header.title}>TimeMix</div>
        <Link href="/about?id=1" as="about/1"> 
          <div className={header.userinfo}>user</div>
        </Link>
      </div>
    )
  }
}
