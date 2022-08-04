
import test from './index.module.css'
import React, { Component, useState, useEffect, useReducer } from 'react'


export default function Test() {
  const [title, setTitle] = useState("hey")
  const [state, dispatch] = useReducer((state,action)=>{
    switch(action.type){
      case "next":
        setTitle(action.value)
        console.log(title)
        return{
          ...state,
        }
        default:{
                            return{
                    ...state
                  }
        }
    }
  })
  return (
    
    <div className={test.box}>
      <input onKeyUp={(e)=>{dispatch({type:"next",value:e.target.value})}}
      />
      <button onClick={()=>{console.log("title:",title)}}>click</button>
    </div>
  )
}
