import React, { Component } from 'react'
import TimeLine from '../Timeline'
import Tools from '../Tools'
export default class Pane extends Component {
  render() {
    return (
      <>
        <Tools />
        <TimeLine />
      </>
    )
  }
}
