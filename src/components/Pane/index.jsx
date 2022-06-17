import React, { Component } from 'react'
import TimeLine from '../Timeline'
import DatePick from '../DatePick'
export default class Pane extends Component {
  render() {
    return (
      <>
        <DatePick />
          <TimeLine />
      </>
    )
  }
}
