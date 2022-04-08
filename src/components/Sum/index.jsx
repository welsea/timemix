import React, { Component } from 'react'
import sum from './index.module.css'
export default class Sum extends Component {
  render() {
    return (
      <div className={sum.layout}>
        <div>1/n complete</div>
        <button className={sum.btn}>Delete finished</button> 
      </div>
    )
  }
}
