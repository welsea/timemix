import React, { Component, useState, useEffect } from 'react'
import wk from './index.module.css'
import PopBox from '../PopBox'

export default function Weekday(props) {
    const {day,date,coltitle,editSchedule,addSchedule,schedules}=props

    const colors={
        0:"#91AD70",
        1:"#89916B",
        2:"#69B0AC"
    }
    const hours=25
    const [schWithStyle, setSchWithStyle] = useState([])
    const months=['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']

    useEffect(() => {
        if(schedules){
            const newss=schedules.map((s)=>{
                s.style=getStyle(s)
                return s
            })
            setSchWithStyle(newss)
        }
      return () => {
      }
    }, [schedules])

    function getStyle(schedule){
        // TODO: change to only need calculate once, when window size changed calculate again.
        //get the position of schedule
        let start_h=parseInt(schedule.start.split(":")[0])
        let start_m=parseFloat(schedule.start.split(":")[1])/60
        let end_h=parseInt(schedule.end.split(":")[0])
        let end_m=parseFloat(schedule.end.split(":")[1])/60
        // grid id for start hour
        let start_id=schedule.weekday+"-"+start_h
        let end_id=schedule.weekday+"-"+end_h

        let height=document.getElementById(end_id).offsetHeight
        let top=(document.getElementById(start_id).offsetTop)+(start_m*height)
        // each hour's height is 2em.
        let totalh=(2*(end_h-start_h-1+end_m-start_m)).toFixed(2)
        // the style for each schedule
        let stylecss={
            height:totalh+"em",
            backgroundColor:colors[schedule.type],
            top:top+"px",
        }
        return stylecss  
    }

    return (
        <div className={day!=="not"? wk.columns:wk.numClo}>
            {
                day!=="not"&&schedules&&schWithStyle.map((item,i)=>{
                    return <Schedule day={day} date={date} schedule={item} editSchedule={editSchedule} key={"schedule-"+day+"-"+i}></Schedule>
                })
            }  
            {
                [...Array(hours)].map((e,hour)=>{
                    if(day==="not"){
                        if(hour===0) return <div key={day+"-"+hour} style={{height:"2em",backgroundColor:"#fad783"}}>&nbsp;</div>
                        else return <div className={wk.num} key={day+hour}>{hour}</div>
                    } 
                    else if(hour===0) {
                        return( 
                            <div key={day+"-"+hour} className={wk.showtitle}>
                                <div>{coltitle[0]},</div>
                                <div className={wk.date}>{coltitle[1].split(".")[0]+" "+months[parseInt(coltitle[1].split(".")[1])]}</div>
                            </div>
                            )}
                    else return <Square addSchedule={addSchedule} key={day+"-"+hour} day={day} date={date} id={day+"-"+(hour)} hour={hour}> </Square>
                })
            }           
        </div>
    )
}


function Schedule(props){
    const [isopen, setIsopen] = useState(false)
    const type=1

    function popUp(is){
        setIsopen(is)
    }

    const {schedule,day,date,editSchedule}=props
    const hour=schedule.start.split(":")[0]
    return(
        <>
        <div className={wk.ss} style={schedule.style} onClick={()=>{setIsopen(true)}}>
            <div className={wk.start_time}>{schedule.start}</div>
            <div className={wk.end_time}>{schedule.end}</div>
            <div className={wk.title}>{schedule.title}</div>
            <div className={wk.info}>{schedule.info}</div>
        </div>
            {isopen && <PopBox
                    stype={type}
                    day={day}
                    date={date}
                    hour={hour}
                    schedule={schedule}
                    operate={popUp}
                    editSchedule={editSchedule}
            />}
        </>
    )
}


function Square(props){
    const [isopen, setIsopen] = useState(false)
    const [mouse, setMouse] = useState(false)
    const type=0

    function popUp(is){
        setIsopen(is)
    }
    function handleMouseEnter(){
        setMouse(true)
    }
    function handleMouseLeave(){
       setMouse(false)
    }

    const {date,hour,id,day,addSchedule}=props
    return(
        <>
        <div style={{backgroundColor:mouse? '#ddd':'white'}} className={wk.hour} onClick={()=>{setIsopen(true)}} id={id} 
        onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            &nbsp;
        </div>
        {isopen && <PopBox
                stype={type}
                date={date}
                day={day}
                hour={hour}
                operate={popUp}
                addSchedule={addSchedule}
            />}
    </>
    )
}