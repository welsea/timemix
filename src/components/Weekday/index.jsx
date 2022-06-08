import React, { Component } from 'react'
import wk from './index.module.css'
import PopBox from '../PopBox'

export default class Weekday extends Component {
    state={
        hours:25,
    }
    render(){
        const {day,schedule,title}=this.props
        const {hours}=this.state
        return(
            <div className={day!=="not"? wk.columns:wk.numClo}>
                {
                    day!=="not"&&schedule&&schedule.map((item,i)=>{
                        return <Schedule schedule={item} key={"schedule-"+day+"-"+i}></Schedule>
                    })
                }  
                {
                    [...Array(hours)].map((e,hour)=>{
                        if(day==="not"){
                            if(hour===0) return <div key={day+"-"+hour} style={{height:"2em",backgroundColor:"#fad783"}}>&nbsp;</div>
                            else return <div className={wk.num} key={day+hour}>{hour}</div>
                        } 
                        else if(hour===0) return <div key={day+"-"+hour} className={wk.title}>{title}</div>
                        else return <Square  key={day+"-"+hour} id={day+"-"+(hour)} hour={hour}> </Square>
                    })
                }           
            </div>
        )
    }
}

class Schedule extends Component{
    state={
        type:1,
        isOpen:false,
    }
    editSchedule=()=> { 
        const {isOpen}=this.state
        this.setState(
            {isOpen:!isOpen}
        )
    }

    render(){
        const {schedule}=this.props
        const {type,isOpen}=this.state
        return(
            <div className={wk.ss} style={schedule.style} onClick={this.editSchedule}>
                {isOpen && <PopBox
                    type={type}
                    content={schedule}
                    handleClose={this.editSchedule}
                />}
                <div className={wk.start_time}>{schedule.start}</div>
                <div className={wk.end_time}>{schedule.end}</div>
                <div className={wk.info}>infoinfoinfo</div>
            </div>
        )
    }
}
class Square extends Component{
    // each hour in timeline table
    state={
        isOpen:false,
        mouse:false,
        type:0
    }

    addSchedule=()=> { 
        const {isOpen}=this.state
        this.setState(
            {isOpen:!isOpen}
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
    test=() => { 
        console.log("active")
     }
    render (){
        const {date,hour,id}=this.props
        const {isOpen,mouse,type}=this.state
        return(
            <div style={{backgroundColor:mouse? '#ddd':'white'}} className={wk.hour} onClick={this.addSchedule} id={id} 
            onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave}>
                &nbsp;
                {isOpen && <PopBox
                    type={type}
                    content={{date:date,hour:hour}}
                    handleClose={this.addSchedule}
                />}
            </div>
        )
    }
}
