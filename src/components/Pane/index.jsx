import React, { Component } from 'react'
import Week from '../Week'
import Tools from '../Tools'
export default class Pane extends Component {
  state={
    dates:Array(7).fill(null),
  }
  componentDidMount(){
    this.getDate()
  }
  getDate=()=>{
    const {dates}=this.state
    const current = new Date();     // get current date   
    const month=current.getMonth()+1
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
  render() {
    const {dates}=this.state
    return (
      <>
        <Tools />
        <Week dates={dates}/>
      </>
    )
  }
}
