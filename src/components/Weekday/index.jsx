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
                    [...Array(hours)].map((e,hour)=>{
                        if(day==="not"){
                            if(hour===0) return <div key={day+"-"+hour} style={{height:"2em",backgroundColor:"#fad783"}}>&nbsp;</div>
                            else return <div className={wk.num} key={day+hour}>{hour}</div>
                        } 
                        else if(hour===0) return <div key={day+"-"+hour} className={wk.title}>{title}</div>
                        else return <Square  key={day+"-"+hour} id={day+"-"+(hour)} hour={hour}> </Square>
                    })
                }
                {
                    day!=="not"&&schedule&&schedule.map((item,i)=>{
                        return <Schedule schedule={item} key={"schedule-"+day+"-"+i}/>
                    })
                }             
            </div>
        )
    }
}

class Schedule extends Component{
    render(){
        const {schedule}=this.props
        return(
            <div className={wk.ss} style={schedule.style}>
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
    render (){
        const {date,hour,id}=this.props
        const {isOpen,mouse}=this.state
        return(
            <div style={{backgroundColor:mouse? '#ddd':'white'}} className={wk.hour} onClick={(e)=>this.addSchedule(e,date,hour)} id={id} 
            onMouseEnter={()=>this.handleMouseEnter()} onMouseLeave={()=>this.handleMouseLeave()}>
                &nbsp;
                {isOpen && <PopBox
                    date={date}
                    hour={hour}
                    handleClose={this.addSchedule}
                />}
            </div>
        )
    }
}
