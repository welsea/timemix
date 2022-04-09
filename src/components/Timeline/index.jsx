import React, { Component } from 'react'
import timeline from './index.module.css'
import InputBox from '../InputBox'
import Sum from '../Sum'
import List from '../List'

export default class Timeline extends Component {
  constructor(props){
    super(props);
    this.state={
      todos:[
        {
          id:'001',
          value:'do',
          done:true,
      },
      {
        id:'002',
        value:'do 2',
        done:false,
      },{
        id:'003',
        value:'do 3',
        done:false,
      }
      ], 
      newtodo:{}
    }
  }

  addTodo=(todo) => { 
    const {todos}=this.state
    const newtodos=[todo,...todos]
    this.setState(
      {todos:newtodos}
    )
  }
  updateTodo=(id,done)=>{
    const {todos}=this.state
    const newtodos=todos.map((todo) => {
      if(todo.id===id) return {...todo,done}
      else return todo
    })
    this.setState({
      todos:newtodos
    })
  }
  deleteTodo=(id)=>{
    const {todos}=this.state
    const newtodos=todos.filter((todo)=>{
      return todo.id!==id
    })
    this.setState({
      todos:newtodos
    })
  }
  selectAll=(done) => { 
    const {todos}=this.state
    const newtodos=todos.map((todo) => {return {...todo,done:done }})
    this.setState({
      todos:newtodos
    })
   }
   deleteAll=(done) => { 
    const {todos}=this.state
    const newtodos=todos.filter((todo) => { return !todo.done})
    this.setState({
      todos:newtodos
    })
    }
  render() {
    const {todos}=this.state
    return (
      <div className={timeline.layout}>
        <InputBox addTodo={this.addTodo}/>
        <List todos={todos} updateTodo={this.updateTodo} deleteTodo={this.deleteTodo}/>
        <Sum todos={todos} selectAll={this.selectAll} deleteAll={this.deleteAll} />
      </div>
    )
  }
}
