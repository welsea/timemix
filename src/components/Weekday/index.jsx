import React, { Component } from 'react'
import wk from './index.module.css'
import PopBox from '../PopBox'

export default class Weekday extends Component {
    constructor(props){
        super(props)
        this.state={
            hours:25,
            schedulesWithStyle:[],
            colors:{
                0:"#91AD70",
                1:"#89916B",
                2:"#69B0AC"
            },
        }
    }

    componentDidMount(){
        this.showExist()
    }
    componentDidUpdate(prevProps){
        if(this.props.schedules!==prevProps.schedules){
            this.showExist()
        }
    }
    showExist(){
        const {schedules}=this.props
        if (schedules){
            const newss=schedules.map((s)=>{
                s.style=this.getStyle(s)
                return s
            })
            this.setState({schedulesWithStyle:newss})
        }
    }
    getStyle(schedule){
        const {colors}=this.state
        //get the position of schedule
        let start_h=parseInt(schedule.start.split(":")[0])
        let start_m=parseFloat(schedule.start.split(":")[1])/60
        let end_h=parseInt(schedule.end.split(":")[0])
        let end_m=parseFloat(schedule.end.split(":")[1])/60
        let start_id=schedule.weekday+"-"+start_h
        let end_id=schedule.weekday+"-"+end_h

        let width=document.getElementById(end_id).offsetWidth-2
        let height=document.getElementById(end_id).offsetHeight
        let top=(document.getElementById(start_id).offsetTop)-((1-start_m)*height)
        let totalh=(height*(end_h-start_h-start_m+end_m)).toFixed(2)

        // the style for each schedule
        let stylecss={
            width:width+"px",
            height:totalh+"px",
            backgroundColor:colors[schedule.type],
            top:top+height+"px",
        }
        return stylecss  
    }
    render(){
        const {day,date,schedules,title,editSchedule,addSchedule}=this.props
        const {hours,schedulesWithStyle}=this.state
        return(
            <div className={day!=="not"? wk.columns:wk.numClo}>
                {
                    day!=="not"&&schedules&&schedulesWithStyle.map((item,i)=>{
                        return <Schedule day={day} date={date} schedule={item} editSchedule={editSchedule} key={"schedule-"+day+"-"+i}></Schedule>
                    })
                }  
                {
                    [...Array(hours)].map((e,hour)=>{
                        if(day==="not"){
                            if(hour===0) return <div key={day+"-"+hour} style={{height:"2em",backgroundColor:"#fad783"}}>&nbsp;</div>
                            else return <div className={wk.num} key={day+hour}>{hour}</div>
                        } 
                        else if(hour===0) return <div key={day+"-"+hour} className={wk.date}>{title}</div>
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
                    <div className={wk.title}>{schedule.title}</div>
                    <div className={wk.info}>{schedule.info}</div>
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

 // each hour in timeline table
class Square extends Component{
    constructor(props){
        super(props);
        this.state={
            isOpen:false,
            mouse:false,
            type:0
        }
    }
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
