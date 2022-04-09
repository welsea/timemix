import React, { Component } from 'react'
import sum from './index.module.css'
export default class Sum extends Component {
  handleClick(){
    if(window.confirm('are you sure to delete all?')){
      this.props.deleteAll()
    }
  }
  changeCheckAll(e){
    this.props.selectAll(e.target.checked)
  }
  handleClick(){
    this.props.deleteAll()
  }
  render() {
    const {todos}=this.props
    const total=todos.length
    const completed=todos.reduce((pre,todo) => pre + (todo.done? 1:0),0)
    return (
      <div className={sum.layout}>
        <label>
          <input type="checkbox" checked={total===completed && total!==0? true:false} onChange={(e)=>this.changeCheckAll(e)}/>
          <span>select all, {completed}/{total} complete</span>
        </label>   

        <button className={sum.btn} onClick={()=>this.handleClick()}>Delete finished</button> 
      </div>
    )
  }
}
