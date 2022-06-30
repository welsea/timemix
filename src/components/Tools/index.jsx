import React, { useReducer, useEffect } from 'react'
import DatePicker from "react-datepicker";
import { FaAngleDoubleLeft, FaAngleDoubleRight, FaCalendarDay, FaSearch } from "react-icons/fa";
import "react-datepicker/dist/react-datepicker.css";
import tool from './index.module.css'
import { DateTime } from "luxon";

/**
 * todo:
 * [] 1. filter about types
 */

function Search(){
  return(
    <div>
      <input placeholder='search' className={tool.search}></input>
      <WeekButton children={<FaSearch/>} />
    </div>
  )
}

function WeekButton(props){
    return(
        <span 
            style={{color: "#f3aa28",margin:"0 2px"}} 
            {...props}
        ></span>
    )
}
function ChangeWeekNum(e){
    const ldate=DateTime.fromJSDate(e)
    const newnum = ldate.weekNumber
    return newnum
  }

function changeDate(value,type){
  const lxdate=DateTime.fromJSDate(value)
  let wn=lxdate.weekNumber
  if(type==="PREV"){
    wn=lxdate.weekNumber-1
  }else{
    wn=lxdate.weekNumber+1
  }
  const newlxdate=DateTime.fromObject({
    weekYear:lxdate.weekYear,
    weekNumber:wn,
  }).startOf("week")
  const newdate=new Date(newlxdate)
  return {date:newdate,num:wn}
}
function Tools(props){
   let [state,dispatch]=useReducer(
       (state,action)=>{
           switch (action.type){
                case "PREV":
                  return {
                    date:changeDate(state.date,action.type).date,
                    num:changeDate(state.date,action.type).num
                }
                case "NEXT":
                  return {
                    date:changeDate(state.date,action.type).date,
                    num:changeDate(state.date,action.type).num
                }
                case "PICKER":
                  return{
                    date:action.value,
                    num:ChangeWeekNum(action.value)
                }
                default:
                  return{
                    ...state
                  }
           }
       },
       {
           date:new Date(),
           num:DateTime.local().weekNumber
       }
   ) 
   useEffect(() => {
    props.changeDates(DateTime.fromJSDate(state.date))
   }, [state.date])
   
   return(
     <div className={tool.layout}>
      <div className={tool.alc}>
          <div className={tool.alc} style={{marginRight:"2em"}}>
              <WeekButton 
                  aria-label="Previous Week"
                  onClick={() => {
                      dispatch({ type: "PREV" });
                  }}
                  children={<FaAngleDoubleLeft/>}
              ></WeekButton>
          <span style={{color: "#f3aa28"}}>Week {state.num}</span>
          <WeekButton 
                  aria-label="Previous Week"
                  onClick={() => {
                      dispatch({ type: "NEXT" });
                  }}
                  children={<FaAngleDoubleRight/>}
              ></WeekButton>
          </div>
          <div className={tool.alc} >
            <WeekButton children={<FaCalendarDay/>}></WeekButton>
            <DatePicker
              selected={state.date}
              dateFormat="dd/MM/yyyy"
              calendarStartDay={1}
              onChange={(date)=>dispatch({type:"PICKER",value:date})}
            />
          </div>
      </div>
      <Search />
    </div>
   )
}

export default Tools