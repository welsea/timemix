import React, { useState } from 'react'
import Week from '../Week'
import Tools from '../Tools'
import { DateTime } from "luxon";

export default function Pane() {
  const [date, setDate] = useState(DateTime.now())
  const [dates, setDates] = useState(getDates(date))

  function getDates(value){
    let week=value.weekNumber
    let year=value.year
    let month=value.month
    let newdates=[...Array(7)].map((x,i)=>{
      let day=DateTime.fromObject({
        weekYear:year,
        weekNumber:week,
        weekday:i+1
      }).day
      return day+"."+month
    })
    return newdates
  }

  function changeDates(value){
    const newdate=value.day
    setDate(newdate)
    setDates(getDates(value))
  }
  
  return (
    <>
      <Tools changeDates={changeDates}/>
      <Week dates={dates}/>
    </>
  )
}