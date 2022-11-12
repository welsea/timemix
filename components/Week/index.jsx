import React, { useContext, useState, useEffect } from "react";
import tl from "./index.module.css";
import Weekday from "../Weekday";
import { MainContext } from "../../pages";


/**
 *
 * todo:
 * 1. add new schedules, page not update.
 *
 */

export default function Week() {
  const content = useContext(MainContext);
  const dates = content.dates;
  const [schedules, setSchedules] = content.schedules
  const [change,setChange]=useState(false)

  const days = ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"];

  function editSchedule(id, s) {
    const index = parseInt(s.weekday - 1);
    const tmpschedules = schedules.map((ws, i) => {
      // to specific weekday
      if (i === index) {
        const newws = ws.map((item,i) => {
            const tmpitem=item.map((x,i)=>{
              let iid=x.id
              if (id===iid) {
                //update all the details
                x.start = s.start;
                x.end = s.end;
                x.title = s.title;
                x.type = s.type;
                x.info = s.info;
                // x.shareWith = s.shareWith;
                x.date=s.date;
                x.weekday=s.weekday;
              }
              return x
            });
            return tmpitem
        });
        return newws;
      } else return ws;
    });
    // schedules of the day.
    setSchedules(tmpschedules);
  }

  function addSchedule(id, news) {
    const index = news.weekday - 1;
    news.id = id;
    const newschedules = schedules.map((ws, i) => {
      if (i === index) {
        if (ws === null) {
          ws = [news];
        } else {
          ws.push(news)
        }
        return ws;
      } else return ws;
    });
    setSchedules(newschedules);
  }

  useEffect(() => {
    setChange(!change)
  
  }, [schedules])
  

  return (
    <div className={tl.layout}>
      {[""].concat(days).map((day, i) => {
        if (i === 0) return <Weekday key={"num"} day={"not"}></Weekday>;
        else {
          return (
            <Weekday
              key={day}
              coltitle={[day, dates[i - 1]]}
              day={i}
              date={dates[i - 1]}
              schedules={schedules[i-1]? schedules[i] : false}
              addSchedule={addSchedule}
              editSchedule={editSchedule}
            ></Weekday>
          );
        }
      })}
    </div>
  );
}