import React, { Component } from 'react'
import wk from './index.module.css'
import PopBox from '../PopBox'

export default class Weekday extends Component {
    state={
        hours:25,
    }
    render(){
        const {day,date,schedule,title,editSchedule,addSchedule}=this.props
        const {hours}=this.state
        return(
            <div className={day!=="not"? wk.columns:wk.numClo}>
                {
                    day!=="not"&&schedule&&schedule.map((item,i)=>{
                        return <Schedule day={day} date={date} schedule={item} editSchedule={editSchedule} key={"schedule-"+day+"-"+i}></Schedule>
                    })
                }  
                {
                    [...Array(hours)].map((e,hour)=>{
                        if(day==="not"){
                            if(hour===0) return <div key={day+"-"+hour} style={{height:"2em",backgroundColor:"#fad783"}}>&nbsp;</div>
                            else return <div className={wk.num} key={day+hour}>{hour}</div>
                        } 
                        else if(hour===0) return <div key={day+"-"+hour} className={wk.title}>{title}</div>
                        else return <Square addSchedule={addSchedule} key={day+"-"+hour} day={day} date={date} id={day+"-"+(hour)} hour={hour}> </Square>
                    })
                }           
            </div>
        )
    }
}

class Schedule extends Component{
    constructor(props){
        super(props);
        this.state={
            type:1,
            isOpen:false,
        }
    }
    popUp=(is)=> { 
        // const {isOpen}=this.state
        this.setState(
            {isOpen:is}
        )
    }
    render(){
        const {schedule,day,date,editSchedule}=this.props
        const {type,isOpen}=this.state
        const hour=schedule.start.split(":")[0]
        return(
            <>
                <div className={wk.ss} style={schedule.style} onClick={()=>this.popUp(true)}>
                    <div className={wk.start_time}>{schedule.start}</div>
                    <div className={wk.end_time}>{schedule.end}</div>
                    <div className={wk.info}>infoinfoinfo</div>
                </div>
                {isOpen && <PopBox
                        stype={type}
                        day={day}
                        date={date}
                        hour={hour}
                        schedule={schedule}
                        operate={this.popUp}
                        editSchedule={editSchedule}
                />}
            </>

        )
    }
}
class Square extends Component{
    constructor(props){
        super(props);
        this.state={
            isOpen:false,
            mouse:false,
            type:0
        }
    }
    // each hour in timeline table

    popUp=(is)=> { 
        // const {isOpen}=this.state
        this.setState(
            {isOpen:is}
        )
    }
    // hover css
    handleMouseEnter=()=>{
        this.setState(
          {mouse:true}
        )
    }
    handleMouseLeave=()=>{
        this.setState(
          {mouse:false}
        )
    }
    render (){
        const {date,hour,id,day,addSchedule}=this.props
        const {isOpen,mouse,type}=this.state
        return(
            <>
                <div style={{backgroundColor:mouse? '#ddd':'white'}} className={wk.hour} onClick={(e)=>this.popUp(e,true)} id={id} 
                onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave}>
                    &nbsp;
                </div>
                {isOpen && <PopBox
                        stype={type}
                        date={date}
                        day={day}
                        hour={hour}
                        operate={this.popUp}
                        addSchedule={addSchedule}
                    />}
            </>
        )
    }
}
