import React, { Component } from 'react'
import tl from './index.module.css'
import Weekday from '../Weekday'


/**
 * todo：
 * []- schedules given by weeks, only need to match the weekday.
 * 
 */
export default class TimeLine extends Component {
    constructor(props){
        super(props)
        this.state={
            schedules:[
                {
                    start:"15:15",
                    end:"18:45",
                    timezone:-2,
                    type:0,
                    info:'infoinfoinfo',
                    date:"6.5",
                    weekday:1,
                    year:"2022",
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
                    display:1,
                    id:"63282dgwyw738"
                },{
                    start:"12:30",
                    end:"17:30",
                    timezone:0,
                    type:2,
                    info:'infoinfoinfo',
                    date:"11.5",
                    weekday:6,
                    year:"2022",
                    shareWith:[],
                    display:1,
                    owner:"uid1223",
                    id:"73294727hdhhss"
                }
            ],
            colors:{
                0:"#91AD70",
                1:"#89916B",
                2:"#69B0AC"
            },
            hours:24,
            days:['Mon','Tue','Wed','Thur','Fri','Sat','Sun'],
            dates:Array(7).fill(null),
            isOpen:false,
            post_schedules:Array(7).fill(null),
        }
    }


    componentDidMount(){
        this.getDate()
        this.showExits()
    }
    
    getDate=()=>{
        const {dates}=this.state
        const current = new Date();     // get current date   
        const month=current.getMonth() 
        const weekstart = current.getDate() - current.getDay()+1; 
        
        for (const i in dates) {
            let tmpd=weekstart+parseInt(i)
            var tmp=(new Date(current.setDate(tmpd))).getDate();
            dates[i]=tmp+"."+month
        }              
        this.setState(
            {dates:dates}
        )
        // console.log(current.getTimezoneOffset()/60)
    }
    // show the schedule already exist
    showExits=()=>{
        const {schedules}=this.state
        for (const schedule of schedules)
            this.shwoSchedule(schedule)  
    }

    shwoSchedule=(schedule)=>{
        // merge all the cell in the period
        // change color and shows all the details
        // only owner can chenge the time
        // sharewith only can left comment
        const {post_schedules}=this.state
        const {colors}=this.state
        // format: Sat Jun 04 2022 15:07:40 GMT+0200 (Central European Summer Time)
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
        let stylecss={
            width:width+"px",
            height:totalh+"px",
            backgroundColor:colors[schedule.type],
            top:top+height+"px",
        }
        let post_schedule={
            style:stylecss,
        }
        post_schedule=Object.assign(post_schedule,schedule)
        // post_schedules[1].push(post_schedule)
        if(post_schedules[schedule.weekday]===null)
            post_schedules[schedule.weekday]=[post_schedule]
        else
            post_schedules[schedule.weekday][post_schedules[schedule.weekday].length]=post_schedule

        this.setState({
            post_schedules:post_schedules
        })
    }
    editSchedule=(id,s)=>{
        const {schedules}=this.state
        const tmps=schedules.filter((item)=>{
            return item.id!==id
          })
        s.id=id
        tmps.push(s)
        this.setState(
            {schedules:tmps}
        )
    }
    addSchedule=(id,news)=>{
        const {schedules}=this.state
        news.id=id
        this.setState(
            {schedules:[news,...schedules]}
        )
    }
  render() {
      const {days,dates,post_schedules}=this.state
    return (
      <div className={tl.layout}>
            {
                [""].concat(days).map((day,i)=>{
                    if(i===0) return <Weekday key={"num"} day={"not"}></Weekday>
                    else{
                        if(post_schedules[i]) return <Weekday key={day} title={day+". "+dates[i-1]} day={i} date={dates[i-1]} 
                                                                schedule={post_schedules[i]} editSchedule={this.editSchedule} addSchedule={this.addSchedule}></Weekday>
                        return <Weekday key={day} title={day+". "+dates[i-1]} day={i} date={dates[i-1]} schedule={false}  
                        editSchedule={this.editSchedule} addSchedule={this.addSchedule}></Weekday>} 
                })
            }
      </div>
    )
  }
}