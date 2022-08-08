import React, { createContext, useState} from 'react'
// import redis from './redis';

export const MainContext = createContext();

/**
 * 创建一个 Color 组件
 * Color 组件包裹的所有子组件都可以通过调用 ColorContext 访问到 value
 */


export default function Main(props){
    const obj={
        "id":"id1",
        "name":"name1"
    }
    const [test, setTest] = useState("test")
    
    return (
        <MainContext.Provider value={test}>
          {props.children}
        </MainContext.Provider>
      );
}