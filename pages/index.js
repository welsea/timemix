import Redis from "ioredis";
import { createContext, useState, useEffect } from "react";
// import React from "react";
import Header from "../components/Header";
import Pane from "../components/Pane";
import { DateTime } from "luxon";
import Note from "../components/Note";

// connect redis
let redis = new Redis(process.env.REDIS_URL);

// useContext
// schedules and dates
export const MainContext = createContext();

// get whole week dates
function getDates(value) {
  let week = value.weekNumber;
  let year = value.year;
  let newdates = [...Array(7)].map((x, i) => {
    let newdate = DateTime.fromObject({
      weekYear: year,
      weekNumber: week,
      weekday: i + 1,
    });
    return newdate.day + "." + newdate.month + "." + newdate.year;
  });
  return newdates;
}

export default function App({ data }) {
  const [schedules, setSchedules] = useState(data.schedules);
  const [date, setDate] = useState(DateTime.now());
  const [dates, setDates] = useState(getDates(date));
  const [pureDate, setPureDate] = useState(date.toISODate({ format: "basic" }));
  const [tz, setTz] = useState(2)

  useEffect(() => {
    // adter chenge date -> change dates array and get schedules from DB
    let tmp = DateTime.fromFormat(pureDate, "yyyyMMdd");
    setDate(tmp);
    setDates(getDates(tmp));
    const getSchedules = async () => {
      const response = await fetch("/api/content?date=" + pureDate, {
        method: "GET",
      });
      const content = await response.json();
      setSchedules(content);
    };

    getSchedules().catch(console.error);
    return () => {};
  }, [pureDate]);


  return (
    <div>
      <Header />
      <Note />
      <MainContext.Provider
        value={{
          date: [pureDate, setPureDate],
          schedules: [schedules, setSchedules],
          dates,
          tz:[tz,setTz]
        }}
      >
        <Pane />
      </MainContext.Provider>
    </div>
  );
}

// get initial full week schedules
export async function getServerSideProps() {
  const now = DateTime.now();
  const dates = getDates(now);
  const week = dates.map((item, i) => {
    let tmp = item.split(".");
    return tmp;
  });

  const data = [];
  for (const item of week) {
    let tmp = await redis.call(
      "JSON.GET",
      "ushsudhsk",
      "$.." + item[2] + "." + item[1] + "." + item[0]
    );
    let tmp2 = JSON.parse(tmp);
    if (tmp2.length !== 0) data.push(JSON.parse(tmp));
    else data.push(null);
  }
  // example user
  const tmpuser = await redis.call("JSON.GET", "users", "$..ushsudhsk");
  const user = JSON.parse(tmpuser);

  return {
    props: {
      data: {
        schedules: data,
        user: user,
      },
    },
  };
}
