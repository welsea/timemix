import { createContext, useState, useEffect } from "react";
import Header from "../components/Header";
import Pane from "../components/Pane";
import { DateTime } from "luxon";

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

export default function App() {
  const [schedules, setSchedules] = useState(Array(7).fill(null));
  const [date, setDate] = useState(DateTime.now());
  const [dates, setDates] = useState(getDates(date));
  const [pureDate, setPureDate] = useState(date.toISODate({ format: "basic" }));
  const [tz, setTz] = useState(2)

  useEffect(() => {
    // adter chenge date -> change dates array and get schedules from DB
    let tmp = DateTime.fromFormat(pureDate, "yyyyMMdd");
    setDate(tmp);
    setDates(getDates(tmp));
    return () => {};
  }, [pureDate]);


  return (
    <div>
      <Header />
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

