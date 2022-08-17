import React, { useState, useContext, useEffect } from "react";
import tl from "./index.module.css";
import Weekday from "../Weekday";
import { MainContext } from "../../pages";
import { FaTruckMonster } from "react-icons/fa";


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

  async function add(s,is){
    const obj={
      isEmpty:is,
      content:s
    }
    const response = await fetch(`/api/content`, {
      method: "POST",
      body:JSON.stringify(obj)
    });
  };

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
                x.shareWith = s.shareWith;
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
    add(tmpschedules[index],false)
    setSchedules(tmpschedules);
  }

  function addSchedule(id, news) {
    const index = news.weekday - 1;
    // before add this schedules is empty or not?
    const isEmpty=new Boolean(!schedules[index])
    news.id = id;
    const newschedules = schedules.map((ws, i) => {
      if (i === index) {
        if (ws === null) {
          ws = [[news]];
        } else {
          let i=ws.length-1
          ws[i].push(news)
        }
        return ws;
      } else return ws;
    });
    add(newschedules[index],isEmpty)
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