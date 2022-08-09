// use this can't fetch data


import React, { createContext, useState} from 'react'
import Redis from 'ioredis'


let redis = new Redis(process.env.REDIS_URL)

export const MainContext = createContext();

/**
 * 创建一个 Color 组件
 * Color 组件包裹的所有子组件都可以通过调用 ColorContext 访问到 value
 */



export default function Main(props){
    const [title, setTitle] = useState(props.data)

    const obj={
        "id":"id1",
        "name":"name1"
    }
    const [test, setTest] = useState("test")
    
    return (
        <MainContext.Provider value={title}>
          {props.children}
        </MainContext.Provider>
      );
}


export async function getServerSideProps() {
  const data=await redis.get("counter");
  // const data=JSON.parse(tmp)
  // console.log(data)
  return { props: { data } }
}
