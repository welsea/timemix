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
    }
  }
  render() {
    const {todos}=this.state
    return (
      <div className={timeline.layout}>
        <InputBox />
        <List todos={todos}/>
        <Sum />
      </div>
    )
  }
}
