import { nanoid } from 'nanoid'
import React, { Component } from 'react'
import inputbox from './index.module.css'

export default class InputBox extends Component {
  handleKeyUp(e){
    if(e.key=="Enter" && e.target.value.trim() !=''){
      const todo={
        id:nanoid(),
        value:e.target.value,
        done:false
      }
      this.props.addTodo(todo)
      e.target.value=''
    }
  }
  render() {
    return (
      <div className={inputbox.layout}>
          <input placeholder='create a new todo' className={inputbox.in} onKeyUp={(e)=>this.handleKeyUp(e)}/>
          {/* <button className={inputbox.btn}>+</button> */}
      </div>
    )
  }
}
