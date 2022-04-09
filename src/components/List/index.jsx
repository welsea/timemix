import React, { Component } from 'react'
import list from './index.module.css'
export default class List extends Component {
  render() {
    const {todos,updateTodo,deleteTodo}=this.props
    return (
      <div className={list.layout}>
          {
            todos.map((todo)=>{
            return <Item key={todo.id} todo={todo} updateTodo={updateTodo} deleteTodo={deleteTodo}/>
          })
          }
      </div>
    )
  }
}
class Item extends Component {
  state={
    mouse:false,
    isDone:false
  }
  changeCheck(e,id){
    this.props.updateTodo(id,e.target.checked)
  }
  handleMouse(on){
    const {mouse}=this.state
    this.setState(
      {mouse:on}
    )
  }
  handleClick(id){
    if(window.confirm('are you sure to delete?')){
      this.props.deleteTodo(id)
    }
  }

  render() {
    const {todo}=this.props
    const {mouse}=this.state
    return (
      // 注意defaultchecked和checked的区别。
      // defaultChecked只在第一次起作用
      // checked 需要同时定义onChange
      <div style={{backgroundColor:mouse? '#ddece8':'white'}} className={list.item} onMouseEnter={()=>this.handleMouse(true)} onMouseLeave={()=>this.handleMouse(false)}>
        <label htmlFor={todo.id}>
          <input type="checkbox" key={todo.id} id={todo.id} name={todo.id} value={todo.value} checked={todo.done} onChange={(e)=>this.changeCheck(e,todo.id)}/>
          <span>{todo.value}</span>
        </label>
        <button style={{display: mouse? 'block':'none'}} className={list.delbtn} onClick={()=>this.handleClick(todo.id)}>delete</button>
      </div>
    )
  }
}
