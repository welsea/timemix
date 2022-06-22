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
                    title:"splatoon",
                    info:'salmon run',
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
            ],null,[{
                start:"8:15",
                end:"12:45",
                type:1,
                title:"candy crush",
                info:'4 rounds',
                weekday:3,
                shareWith:[
                    {
                        name:'tom',
                        comment:'Tom\'s COMMENT'
                }
                ],
                id:"68293dgwyw738"
            }],null,[
                {
                    start:"12:30",
                    end:"17:30",
                    type:2,
                    title:"splatoon",
                    info:'regular battle',
                    weekday:5,
                    shareWith:[],
                    id:"73294727hdhhss"
                }
            ],null,null],
            hours:24,
            days:['Mon','Tue','Wed','Thur','Fri','Sat','Sun'],
        }
    }
    editSchedule=(id,s)=>{
        // update the item
        const {schedules}=this.state
        const index=parseInt(s.weekday-1)
        const tmpschedules=schedules.map((ws,i)=>{
            if(i===index){
                const newws=ws.map((item)=>{
                    if(item.id===id){
                        //update all the details
                        item.start=s.start
                        item.end=s.end
                        item.title=s.title
                        item.type=s.stype
                        item.info=s.info
                        item.shareWith=s.shareWith
                        return item
                    }else return item
                })
                return newws
            }else return ws
        })
        this.setState({
            schedules:tmpschedules
        })
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