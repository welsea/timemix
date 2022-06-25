import React, { useState,useEffect } from 'react'
import Week from '../Week'
import Tools from '../Tools'


export default function Pane() {
  const [dates, setDates] = useState(()=>{
    const tmpDates=(Array(7).fill(null))
    const current = new Date();  
    const month=current.getMonth()+1
    const weekstart = current.getDate() - current.getDay()+1; 
    
    for (const i in tmpDates) {
        let tmpd=weekstart+parseInt(i)
        var tmp=(new Date(current.setDate(tmpd))).getDate();
        tmpDates[i]=tmp+"."+month
    }  
    return tmpDates
  })
  
  return (
    <>
      <Tools />
      <Week dates={dates}/>
    </>
  )
}