import Redis from "ioredis";
import { createContext, useState } from "react";
// import React from "react";
import Header from "../components/Header";
import Pane from "../components/Pane";
import { DateTime } from "luxon";
import contentDisposition from "content-disposition";

// get data
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

  // // const increment = async () => {
  // //   const response = await fetch('/api/incr', { method: 'POST' })
  // //   const data = await response.json()
  // //   setCount(data.count)
  // // }

  const changeweek = async () => {
    const response = await fetch("/api/content", {
      method: "PUT",
      query: {
        week: 2,
      },
    });
    const content = await response.json();
    // console.log(content)
  };
  const getweek = async () => {
    const response = await fetch("/api/content", {
      method: "GET",
      query: {
        week: 1,
      },
    });
    const content = await response.json();
    // console.log(content)
  };

  return (
    <div>
      <Header />
      <MainContext.Provider value={{ dates, schedules }}>
        <Pane />
      </MainContext.Provider>
      {/* <a onClick={this.gotoTr}>to tr</a> */}
      <button onClick={getweek}>get</button>
      <button onClick={changeweek}>change</button>
    </div>
  );
}

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
