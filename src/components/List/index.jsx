import React, { Component } from 'react'
import list from './index.module.css'
export default class List extends Component {
  render() {
    const {todos}=this.props
    return (
      <div className={list.layout}>
          {
            todos.map((todo)=>{
            return <Item key={todo.id} todo={todo} />
          })
          }
      </div>
    )
  }
}
class Item extends Component {
  changeCheck(status){
    console.log(status)
  }
  render() {
    const {todo}=this.props
    return (
      <div className={list.item}>
        <input type="checkbox" key={todo.id} id={todo.id} name={todo.id} value={todo.value} defaultChecked={todo.done} onChange={()=>this.changeCheck(todo.done)}/>
        <label htmlFor={todo.id}> {todo.value}</label>
      </div>
    )
  }
}
