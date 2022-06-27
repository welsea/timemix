import React, { useReducer } from 'react'
import DatePicker from "react-datepicker";
import { FaAngleDoubleLeft, FaAngleDoubleRight, FaCalendarDay, FaSearch } from "react-icons/fa";
import "react-datepicker/dist/react-datepicker.css";
import tool from './index.module.css'

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
    const startDate = new Date(new Date(e).getFullYear(), 0, 1);
    const days = Math.floor((e - startDate) /
        (24 * 60 * 60 * 1000));
    const newnum = Math.ceil(days / 7);
  
    return newnum
  }

function Tools(){
   let [state,dispatch]=useReducer(
       (state,action)=>{
        const currentDay=new Date(state.date).getDay()
        let newDate=new Date()
           switch (action.type){
                case "PREV":return {
                    date:newDate.setDate(new Date(state.date).getDate() - currentDay - 1),
                    num:ChangeWeekNum(state.date)
                }
                case "NEXT":return {
                    date:newDate.setDate(new Date(state.date).getDate() - (7-currentDay)),
                    num:ChangeWeekNum(state.date)
                }
                case "PICKER":return{
                    date:action.value,
                    num:ChangeWeekNum(action.value)
                }
                case "INI": return{
                  ...state,
                  num:ChangeWeekNum(state.date)
                }
                default:

           }
       },
       {
           date:new Date(),
           num:ChangeWeekNum(new Date())
       }
   ) 
   
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
                      dispatch({ type: "PREV" });
                  }}
                  children={<FaAngleDoubleRight/>}
              ></WeekButton>
          </div>
          <div className={tool.alc} >
            <WeekButton children={<FaCalendarDay/>}></WeekButton>
            <DatePicker
              selected={state.date}
              dateFormat="dd/MM/yyyy"
              onChange={(event)=>dispatch({type:"DATEPICKER",value:event.target.value})}
            />
          </div>
      </div>
      <Search />
    </div>
   )
}


export default Tools



