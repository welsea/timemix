import React, { useEffect,useReducer } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import tool from './index.module.css'

export default function Tools() {
  return (
    <div className={tool.layout}>
      <WeekNum />
      <Search />
    </div>
  )
}

function reducer(state,action){
  const currentDay=state.date.getDay()
  let newDate=new Date()
  switch(action.type){
    case "PREV": return {
      date:newDate.setDate(state.date.getDate() - currentDay - 1),
      num:ChangeWeekNum(state.date)
    }
    case "NEXT": return {
      date:newDate.setDate(state.date.getDate() - (7-currentDay)),
      num:ChangeWeekNum(state.date)
    }
    case "DATEPICKER":return{
      date:action.value,
      num:ChangeWeekNum(action.value)
    }
    case "INI": return{
      ...state,
      num:ChangeWeekNum(state.date)
    }
    default:
      console.log("default?")
  }
}

function ChangeWeekNum(e){
  const startDate = new Date(e.getFullYear(), 0, 1);
  const days = Math.floor((e - startDate) /
      (24 * 60 * 60 * 1000));
  const newnum = Math.ceil(days / 7);

  return newnum
}

function WeekNum(){
  const initialSate={
    date:new Date(),
    num:Math.ceil((new Date()).getDay()/7)
  }
  const [state,dispatch]=useReducer(reducer, initialSate)

  useEffect(()=>{
    dispatch({type:"INI"})
  })

  return(
    <div className={tool.alc}>
      <div className={tool.alc} style={{marginRight:"2em"}}>
        <i 
          className="icofont-simple-left" 
          style={{color: "#f3aa28",fontSize:"25px"}} 
          onClick={()=>dispatch({type:"PREV"})}
          ></i>
        <span style={{color: "#f3aa28"}}>Week {state.num}</span>
        <i 
          className="icofont-simple-right" 
          style={{color: "#f3aa28",fontSize:"25px"}} 
          onClick={()=>dispatch({type:"NEXT"})}
          ></i>
      </div>
      <div className={tool.alc} >
        <i 
          className="icofont-ui-calendar" 
          style={{color: "#f3aa28",marginRight: "5px",fontSize:"20px"}}
          ></i>
        <DatePicker
          selected={state.date}
          dateFormat="dd/MM/yyyy"
          onChange={(event)=>dispatch({type:"DATEPICKER",value:event.target.value})}
        />
      </div>
  </div>

  )
}

function Search(){
  return(
    <div>
      <input placeholder='search' className={tool.search}></input>
      <i className="icofont-search" style={{color: "#f3aa28",marginLeft: "5px",fontSize:"20px"}}></i>
    </div>
  )
}