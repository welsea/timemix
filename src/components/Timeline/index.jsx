import React, { Component } from 'react'
import tl from './index.module.css'


export default class TimeLine extends Component {
    state={
        schedules:[
            {
                start:"15:15",
                end:"18:45",
                timezone:-2,
                type:"work",
                info:'infoinfoinfo',
                date:"3.5",
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
                publicity:true,
                owner:"uid2231"
            },{
                start:"12:30",
                end:"17:30",
                timezone:0,
                type:"life",
                info:'infoinfoinfo',
                date:"4.5",
                weekday:6,
                year:"2022",
                shareWith:[],
                publicity:false,
                owner:"uid1223"
            }
        ],
        colors:{
            work:"#91AD70",
            life:"#89916B",
            other:"#69B0AC"
        },
        hours:24,
        days:['Mon','Tue','Wed','Thur','Fri','Sat','Sun'],
        dates:Array(7).fill(null),
        isOpen:false,
        post_schedules:Array(7).fill(null),
    }
    componentDidMount(){
        this.getDate()
        this.showExits()
    }
    
    getDate=()=>{
        const {dates}=this.state
        const current = new Date();     // get current date   
        const month=current.getMonth() 
        const weekstart = current.getDate() - current.getDay() +2; 
        for (const i in dates) {
            var tmp=(new Date(current.setDate(weekstart+i))).getDate();
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
  render() {
      const {days}=this.state
      const {dates}=this.state
      const {post_schedules}=this.state
    return (
      <div className={tl.layout}>
            {
                [""].concat(days).map((day,i)=>{
                    if(i===0) return <Weekday key={"num"} day={"not"}></Weekday>
                    else{
                        if(post_schedules[i]) return <Weekday key={day} title={day+". "+dates[i-1]} day={i} schedule={post_schedules[i]}></Weekday>
                        return <Weekday key={day} title={day+". "+dates[i-1]} 
                                        day={i} schedule={false}></Weekday>} 
                })
            }
      </div>
    )
  }
}

class Weekday extends Component{
    state={
        hours:25,
    }
    test=()=>{
        console.log(this.props.schedule[0].bcolor)
    }
    render(){
        const {day}=this.props
        const {schedule}=this.props
        const {title}=this.props
        const {hours}=this.state
        return(
            <div className={day!=="not"? tl.columns:tl.numClo}>
                {
                    [...Array(hours)].map((e,hour)=>{
                        if(day==="not"){
                            if(hour===0) return <div key={day+"-"+hour} style={{height:"2em",backgroundColor:"#fad783"}}>&nbsp;</div>
                            else return <div className={tl.num} key={day+hour}>{hour}</div>
                        } 
                        else if(hour===0) return <div key={day+"-"+hour} className={tl.title}>{title}</div>
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
            <div className={tl.ss} style={schedule.style}>
                <div className={tl.start_time}>{schedule.start}</div>
                <div className={tl.end_time}>{schedule.end}</div>
                <div className={tl.info}>infoinfoinfo</div>
            </div>
        )
    }
}
class Square extends Component{
    // each square in timeline table
    state={
        isOpen:false,
        mouse:false,
    }
    // add schedule box popup
    addSchedule=()=> { 
        const {isOpen}=this.state
        this.setState(
            {isOpen:!isOpen}
        )
    }
    // hover css
    handleMouseEnter=()=>{
        // const {mouse}=this.state
        this.setState(
          {mouse:true}
        )
    }
    handleMouseLeave=()=>{
        // const {mouse}=this.state
        this.setState(
          {mouse:false}
        )
    }
    render (){
        const {date}=this.props
        const {hour}=this.props
        const {id}=this.props
        const {isOpen}=this.state
        const {mouse}=this.state
        return(
            <div style={{backgroundColor:mouse? '#ddd':'white'}} className={tl.hour} onClick={(e)=>this.addSchedule(e,date,hour)} id={id} 
            onMouseEnter={()=>this.handleMouseEnter()} onMouseLeave={()=>this.handleMouseLeave()}>
                &nbsp;
                {isOpen && <Popup
                    date={date}
                    hour={hour}
                    handleClose={this.addSchedule}
                />}
            </div>
        )
    }
}

class Popup extends Component{
    handleClose=()=>{
        this.props.handleClose()
    }
    render(){
        const {date}=this.props
        const {hour}=this.props
        return (
            <div className={tl.popup_box}>
              <div className={tl.box}>
              <h2>Add Schedule</h2>
                <div>{date+hour}</div>
                <div className={tl.btn}>
                    <button onClick={this.handleClose} >Cancel</button>
                    <button className={tl.addBtn}>Add</button>
                </div>
              </div>
            </div>
          );
    }

}


// class Schedule extends Component{
//     render(){
//         const {schedule}=this.props
//         return(
//             <div style={schedule.style}>
//                 <div>{schedule.deatils.info}</div>
//             </div>
//         )
//     }
// }

/*  horizental timeline
     <table className={tl.tab}>
            <thead>
                <tr>
                    <th></th>
                    {
                        hours.map((hour)=>{
                            return <th key={hour}>{hour}</th>
                        })
                    }
                </tr>   
            </thead>
            <tbody>
                {
                    days.map((day)=>{
                        return(
                            <tr key={day}>
                                {
                                    [""].concat(hours).map((hour,i)=>{
                                        if(i===0) return <th className={tl.vth} key={hour}>{day}.</th>
                                        else return <td key={day}></td>
                                    })
                                }
                            </tr>
                        ) 
                    })
                }
            </tbody>
        </table> 
 */