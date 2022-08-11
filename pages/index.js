import Redis from "ioredis";
import { createContext, useState, useEffect } from "react";
// import React from "react";
import Header from "../components/Header";
import Pane from "../components/Pane";
import { DateTime } from "luxon";

// connect redis
let redis = new Redis(process.env.REDIS_URL);

// useContext
export const MainContext = createContext();

// get whole week dates
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
  const [pureDate, setPureDate] = useState(date.toISODate({format:"basic"}))

  useEffect(() => {
    let tmp=DateTime.fromFormat(pureDate,"yyyyMMdd")
    setDate(tmp)
    setDates(getDates(tmp))
    // getSchedules(pureDate)
    const getSchedules= async ()=>{
      const response = await fetch("/api/content?date=" + pureDate, {
        method: "GET",
      });
      const content = await response.json();
      setSchedules(content)
    }

    getSchedules().catch(console.error)
    return () => {}
  }, [pureDate])
  

 async function getSchedules(date){
    const response = await fetch("/api/content?date=" + date, {
      method: "GET",
    });
    const content = await response.json();
    setSchedules(content)
  }

  // get schedules
  const changeweek = async () => {
    const tmp=date.toISODate({format:"basic"})
    const response = await fetch("/api/content?date=" + tmp, {
      method: "PUT",
    });
    const content = await response.json();
  };

  // update shcedules
  const getweek = async () => {
    const tmp=date.toISODate({format:"basic"})
    const response = await fetch("/api/content?date=" + tmp, {
      method: "GET",
    });
    const content = await response.json();
  };

  return (
    <div>
      <Header />
      <MainContext.Provider value={{date:[pureDate,setPureDate],schedules:[schedules,setSchedules],dates}}>
        <Pane />
      </MainContext.Provider>
      {/* <a onClick={this.gotoTr}>to tr</a> */}
      <button >{pureDate}</button>
    </div>
  );
}

// get initial full week schedules
export async function getServerSideProps() {
  const now = DateTime.now();
  const mon = now.month;
  const dates = getDates(now);
  const week = dates.map((item, i) => {
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
