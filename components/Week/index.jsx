import React, { useState, useContext, useEffect } from "react";
import tl from "./index.module.css";
import Weekday from "../Weekday";
import {MainContext} from "../../lib/context";

/**
 *
 * todo:
 * 1. add new schedules, page not update.
 *
 */
export default function TimeLine(props) {
  const dates = props.dates;

  const test = useContext(MainContext)

  useEffect(() => {
    console.log(test)
  
    return () => {
    }
  }, [])
  

  const [schedules, setSchedules] = useState([
    [
      {
        start: "15:15",
        end: "18:45",
        type: 0,
        title: "splatoon",
        info: "salmon run",
        weekday: 1,
        shareWith: ["tom", "jerry"],
        id: "63282dgwyw738",
      },
    ],
    null,
    [
      {
        start: "8:15",
        end: "12:45",
        type: 1,
        title: "candy crush",
        info: "4 rounds",
        weekday: 3,
        shareWith: ["tom"],
        id: "68293dgwyw738",
      },
      {
        start: "13:15",
        end: "16:45",
        type: 2,
        title: "shopping",
        info: "list",
        weekday: 3,
        shareWith: ["tom"],
        id: "68293dgwyw038",
      },
    ],
    null,
    [
      {
        start: "12:30",
        end: "17:30",
        type: 2,
        title: "splatoon",
        info: "regular battle",
        weekday: 5,
        shareWith: [],
        id: "73294727hdhhss",
      },
    ],
    null,
    null,
  ]);
  const days = ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"];

  function editSchedule(id, s) {
    const index = parseInt(s.weekday - 1);
    const tmpschedules = schedules.map((ws, i) => {
      // to specific weekday
      if (i === index) {
        const newws = ws.map((item) => {
          if (item.id === id) {
            //update all the details
            item.start = s.start;
            item.end = s.end;
            item.title = s.title;
            item.type = s.type;
            item.info = s.info;
            item.shareWith = s.shareWith;
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
    console.log(news);
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
              schedules={schedules[i - 1] ? schedules[i - 1] : false}
              addSchedule={addSchedule}
              editSchedule={editSchedule}
            ></Weekday>
          );
        }
      })}
    </div>
  );
}
