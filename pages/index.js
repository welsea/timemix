import Redis from "ioredis";
import { createContext, useState } from "react";
// import React from "react";
import Header from "../components/Header";
import Pane from "../components/Pane";
import { DateTime } from "luxon";

// connect redis
let redis = new Redis(process.env.REDIS_URL);

// useContext
export const MainContext = createContext();

function getDates(value) {
  let week = value.weekNumber;
  let year = value.year;
  let month = value.month;
  let newdates = [...Array(7)].map((x, i) => {
    let day = DateTime.fromObject({
      weekYear: year,
      weekNumber: week,
      weekday: i + 1,
    }).day;
    return day + "." + month;
  });
  return newdates;
}

export default function App({ data }) {
  const [schedules, setSchedules] = useState(data);

  const [date, setDate] = useState(DateTime.now());
  const [dates, setDates] = useState(getDates(date));

  function changeDates(value) {
    setDate(value.day);
    setDates(getDates(value));
  }

  const [test, setTest] = useState([])
  const changeweek = async () => {
    const response = await fetch("/api/content?"+"8.2", {
      method: "PUT"
    });
    const content = await response.json();
    setTest(content.content)
  };
  const getweek = async () => {
    const response = await fetch("/api/content?"+"8.2", {
      method: "GET"
    });
    const content = await response.json();
    setTest(content.content)
  };

  const [test2, settest2] = useState([])
  // const getdd=async()=>{
  //   const tmp=date.toISODate({ format: 'basic' })
  //   const response=await fetch("/api/dates?"+tmp )
  //   const testdate=await response.json()
  //   settest2(testdate.date)
  // }

  const getdd=()=>{
    const tmp=date.toISODate({ format: 'basic' })
    const tmp2=DateTime.fromFormat(tmp,"yyyyMMdd") 
    settest2(tmp2.toString())
  }

  return (
    <div>
      <Header />
      <MainContext.Provider value={{ dates, schedules }}>
        <Pane />
      </MainContext.Provider>
      {/* <a onClick={this.gotoTr}>to tr</a> */}
      <button onClick={getweek}>get</button>
      <button onClick={changeweek}>change</button>
      <div>{test}</div>
      <button onClick={getdd}>get date</button>
      <div>{test2}</div>
    </div>
  );
}


// get initial full week schedules
export async function getServerSideProps() {
  const now = DateTime.now();
  const mon = now.month;
  const week = getDates(now).map((item, i) => {
    let tmp = item.split(".");
    return tmp[0];
  });

  const data = [];
  for (const item of week) {
    let tmp = await redis.call(
      "JSON.GET",
      "schedules_user1",
      "$..2022." + mon + "." + item
    );
    let tmp2 = JSON.parse(tmp);
    if (tmp2.length !== 0) data.push(JSON.parse(tmp));
    else data.push(null);
  }

  // const data=[...Array(7)].map(async (item,i)=>{
  //   let tmp=await redis.call(
  //         "JSON.GET",
  //         "schedules_user1",
  //         "$..2022."+mon+"."+week[i]
  //       );
  //   if(tmp){
  //     let t=await JSON.parse(tmp)
  //     return await t
  //   }else{
  //     return await null
  //   }
  // })

  return { props: { data } };
}
