import React, { useState, useContext, useEffect } from "react";
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

  const days = ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"];

  function editSchedule(id, s) {
    const index = parseInt(s.weekday - 1);
    const tmpschedules = schedules.map((ws, i) => {
      // to specific weekday
      if (i === index) {
        const newws = ws.map((item,i) => {
            if (item[i].id === id) {
              delete item.style
              //update all the details
              item[i].start = s.start;
              item[i].end = s.end;
              item[i].title = s.title;
              item[i].type = s.type;
              item[i].info = s.info;
              item[i].shareWith = s.shareWith;
              item[i].date=s.date;
              item[i].id=id;
              item[i].weekday=s.weekday;
              return item;
            } else {
              return item;
            }
        });
        return newws;
      } else return ws;
    });
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
          ws.push(news);
        }
        return ws;
      } else return ws;
    });
    console.log(JSON.stringify(newschedules))
    setSchedules(newschedules);
  }

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
              schedules={schedules[i - 1] ? schedules[i - 1][0] : false}
              addSchedule={addSchedule}
              editSchedule={editSchedule}
            ></Weekday>
          );
        }
      })}
    </div>
  );
}