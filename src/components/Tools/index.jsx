import React, { Component } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import tool from './index.module.css'

export default class Tools extends Component {
  state={
    date:new Date(),
  }
  handleDateChange=(e)=>{
    console.log(e)
    this.setState({date:e})
  }
  render() {
    const {date}=this.state
    return (
      <div className={tool.layout}>
        <div className={tool.alc}>
          <div className={tool.alc} style={{marginRight:"2em"}}>
            <i className="icofont-simple-left" style={{color: "#f3aa28",fontSize:"25px"}}></i>
            <span style={{color: "#f3aa28"}}>week 34</span>
            <i className="icofont-simple-right" style={{color: "#f3aa28",fontSize:"25px"}}></i>
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
        <div>
          <input placeholder='search' className={tool.search}></input>
          <i className="icofont-search" style={{color: "#f3aa28",marginLeft: "5px",fontSize:"20px"}}></i>
        </div>
      </div>
    )
  }
}
