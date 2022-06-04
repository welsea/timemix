import React, { Component } from 'react'
import tl from './index.module.css'


export default class TimeLine extends Component {
    state={
        schedule:[
            {
                date:"3.5",
                year:"2022",
                start:"15:30",
                end:"18:30",
                timezone:-2,
                color:'#91AD70',
                info:'comment',
                shareWith:[
                    {
                        name:'tom',
                        comment:'Tom\'s COMMENT'
                },
                    {
                        name:'jerry',
                        comment:"Jerry's comment"
                    }
                ]
            }
        ],
        hours:24,
        days:['Mon','Tue','Wed','Thur','Fri','Sat','Sun'],
        dates:Array(7).fill(null),
        isOpen:false,
    }
    componentDidMount(){
        this.getDate()
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
            { dates:dates}
        )
        // console.log(current.getTimezoneOffset()/60)
    }
    // show the schedule already exist
    showExits=()=>{

    }
  render() {
      const {hours}=this.state
      const {days}=this.state
      const {dates}=this.state
    return (
      <div className={tl.layout}>
        <table>
            <thead>
                    <tr>
                        <th></th>
                        {
                            days.map((day,i)=>{
                                return <th key={day}>{day+". "+dates[i]}</th>
                            })
                        }
                    </tr>   
            </thead>
            <tbody>
                    {
                        [...Array(hours)].map((e,hour)=>{
                            return(
                                <tr key={hour+1}>
                                    {
                                        [""].concat(days).map((day,i)=>{
                                            if(i===0) return <td key={day}>{hour+1}</td>
                                            else return <Square key={i+"-"+(hour+1)} date={dates[i]} hour={hour+1}> </Square>
                                        })
                                    }
                                </tr>
                            ) 
                        })
                    }
            </tbody>
        </table>
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
        const {isOpen}=this.state
        const {mouse}=this.state
        return(
            <td style={{backgroundColor:mouse? '#ddd':'white'}} onClick={(e)=>this.addSchedule(e,date,hour)} key={date+"-"+hour} 
            onMouseEnter={()=>this.handleMouseEnter()} onMouseLeave={()=>this.handleMouseLeave()}>
                {isOpen && <Popup
                    date={date}
                    hour={hour}
                    handleClose={this.addSchedule}
                />}
            </td>
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