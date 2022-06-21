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
                    type:0,
                    info:'infoinfoinfo',
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
                },{
                    start:"12:30",
                    end:"17:30",
                    type:2,
                    info:'infoinfoinfo',
                    weekday:6,
                    shareWith:[],
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
            post_schedules:Array(7).fill(null),
            hey:"hey"
        }
    }
    componentDidMount(){
        this.getDate()
        this.showExits()
    }
    test=(h)=>{
        const {hey}=this.state
        this.setState({
            hey:h
        })
        console.log(hey)
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
        // const {schedules}=this.state
        // let temps = schedules.map(item => 
        //     {
        //       if (item.id === id){
        //         return {...item, info: s.info,start:s.start,end:s.end,title:s.title,shareWith:s.shareWith,type:s.type}; //gets everything that was already in item, and updates "done"
        //       }
        //       return item; // else return unmodified item 
        //     });
        // this.setState(
        //     {schedules:temps}
        // )
        // this.showExits()
        // this.showExits()
        // console.log(temps)
        // console.log(schedules)
    }
    addSchedule=(id,news)=>{
        const {schedules}=this.state
        news.id=id
        this.setState(
            {schedules:[news,...schedules]}
        )
        this.showExits()
        console.log(schedules)
    }
  render() {
      const {days,dates,post_schedules}=this.state
    return (
      <div className={tl.layout}>
            {
                [""].concat(days).map((day,i)=>{
                    if(i===0) return <Weekday key={"num"} day={"not"}></Weekday>
                    else{
                        return <Weekday key={day} title={day+". "+dates[i-1]} day={i} date={dates[i-1]} schedule={post_schedules[i]?post_schedules[i]:false}  
                        addSchedule={this.addSchedule} editSchedule={this.editSchedule}></Weekday>} 
                })
            }
      </div>
    )
  }
}