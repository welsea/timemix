import React, { Component } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import tool from './index.module.css'

export default class Tools extends Component {
  render() {
    return (
      <div className={tool.layout}>
        <WeekNum />
        <Search />
      </div>
    )
  }
}
class WeekNum extends Component{
  state={
    date:new Date(),
    num:Math.ceil((new Date()).getDay()/7)
  }
  componentDidMount(){
      this.setWeekNum()
  }
  setWeekNum(){
    const {date}=this.state
    const startDate = new Date(date.getFullYear(), 0, 1);
    const days = Math.floor((date - startDate) /
        (24 * 60 * 60 * 1000));
         
    const newnum = Math.ceil(days / 7);
    this.setState({
      num:newnum
    })
  }
  handleDateChange=(e)=>{
    const startDate = new Date(e.getFullYear(), 0, 1);
    const days = Math.floor((e - startDate) /
        (24 * 60 * 60 * 1000));
    const newnum = Math.ceil(days / 7);
    this.setState({
      date:e,
      num:newnum
    })
  }
  handleWeekNumChange=(t)=>{
    // 1 -> prev
    // 0 -> next
    // judge month, change week number
    const {date}=this.state
    const currentDay=date.getDay()
    let newDate=new Date()
    if(t===1){
      newDate.setDate(date.getDate() - currentDay - 1);
    }else{
      newDate.setDate(date.getDate() +(7- currentDay));
    }
    
    this.setState({
      date:newDate
    })
  }
  render(){
    const {date,num}=this.state

    return(
      <div className={tool.alc}>
        <div className={tool.alc} style={{marginRight:"2em"}}>
          <i className="icofont-simple-left" style={{color: "#f3aa28",fontSize:"25px"}} onClick={()=>this.handleWeekNumChange(1)}></i>
          <span style={{color: "#f3aa28"}}>Week {num}</span>
          <i className="icofont-simple-right" style={{color: "#f3aa28",fontSize:"25px"}} onClick={()=>this.handleWeekNumChange(0)}></i>
        </div>
        <div className={tool.alc} >
          <i className="icofont-ui-calendar" style={{color: "#f3aa28",marginRight: "5px",fontSize:"20px"}}></i>
          <DatePicker
            selected={date}
            dateFormat="dd/MM/yyyy"
            onChange={(d)=>this.handleDateChange(d)} //only when value has changed
          />
        </div>
    </div>

    )
  }
}
class Search extends Component{
  render(){
    return(
      <div>
        <input placeholder='search' className={tool.search}></input>
        <i className="icofont-search" style={{color: "#f3aa28",marginLeft: "5px",fontSize:"20px"}}></i>
      </div>
    )
  }
}