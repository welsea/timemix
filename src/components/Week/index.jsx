import React, { Component } from 'react'
import tl from './index.module.css'
import Weekday from '../Weekday'

export default class TimeLine extends Component {
    constructor(props){
        super(props)
        this.state={
            schedules:[
                [
                    {
                    start:"15:15",
                    end:"18:45",
                    type:0,
                    info:'details',
                    weekday:1,
                    shareWith:[
                        {
                            name:'tom',
                            comment:'Tom\'s COMMENT'
                    },
                        {
                            name:'jerry',
                            comment:"Jerry's comment"
                        }
                    ],
                    id:"63282dgwyw738"
                }
            ],null,null,null,[
                {
                    start:"12:30",
                    end:"17:30",
                    type:2,
                    info:'infoinfoinfo',
                    weekday:5,
                    shareWith:[],
                    id:"73294727hdhhss"
                }
            ],null,null],
            colors:{
                0:"#91AD70",
                1:"#89916B",
                2:"#69B0AC"
            },
            hours:24,
            days:['Mon','Tue','Wed','Thur','Fri','Sat','Sun'],
        }
    }
    componentDidMount(){
        this.showExits()
    }
    showExits=()=>{
        const {schedules}=this.state
        const newss=schedules.map((ws)=>{
            if (ws){
                const newws=ws.map((s)=>{
                    s.style=this.getStyle(s)
                    return s
                })
                return newws
            }else return ws
        })
        this.setState({schedules:newss})
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

        let width=document.getElementById(end_id).offsetWidth
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

    editSchedule=(id,s)=>{
        console.log(id,s)
    }
    addSchedule=(id,news)=>{

    }
  render() {
      const {days,schedules}=this.state
      const {dates}=this.props
    return (
      <div className={tl.layout}>
            {
                [""].concat(days).map((day,i)=>{
                    if(i===0) return <Weekday key={"num"} day={"not"}></Weekday>
                    else{
                        return <Weekday key={day} title={day+". "+dates[i-1]} day={i} date={dates[i-1]} schedules={schedules[i-1]?schedules[i-1]:false}  
                        addSchedule={this.addSchedule} editSchedule={this.editSchedule}></Weekday>} 
                })
            }
      </div>
    )
  }
}