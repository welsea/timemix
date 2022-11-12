import React, { Component, useState, useEffect, useContext } from "react";
import wk from "./index.module.css";
import PopBox from "../PopBox";
import { MainContext } from "../../pages";

export default function Weekday(props) {
  const { day, date, coltitle } = props;

  const [schedules, setSchedules] = useState([]);

  // this is for updating pages
  const content = useContext(MainContext);

  const colors = {
    0: "#91AD70",
    1: "#89916B",
    2: "#69B0AC",
  };
  const hours = 25;
  const [schWithStyle, setSchWithStyle] = useState([]);
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
  const [tz] = content.tz;
  const adapt = tz - 2;

  useEffect(() => {
    if (schedules.length !== 0) {
      let tmp=schedules.map((item)=>{
          item.style=getStyle(item)
      })
      setSchedules(tmp)
    }
  }, [tz]);

  function getStyle(schedule) {
    // TODO: change to only need calculate once, when window size changed calculate again.
    //get the position of schedule
    let start_h = parseInt(schedule.start.split(":")[0]) + adapt;
    let start_m = parseFloat(schedule.start.split(":")[1]) / 60;
    let end_h = parseInt(schedule.end.split(":")[0]) + adapt;
    let end_m = parseFloat(schedule.end.split(":")[1]) / 60;
    // grid id for start hour
    let start_id = schedule.weekday + "-" + start_h;
    let end_id = schedule.weekday + "-" + end_h;
    let height = document.getElementById(end_id).offsetHeight;
    let top = document.getElementById(start_id).offsetTop + start_m * height;
    // use px instead of em. px more precise
    let totalh = (height * (end_h - start_h + end_m - start_m)).toFixed(2);
    // the style for each schedule
    let stylecss = {
      height: totalh + "px",
      backgroundColor: colors[schedule.type],
      top: top + "px",
    };
    return stylecss;
  }

  function handleDel(id) {
    let index = null;
    schedules.forEach((x, i) => {
      if (x.id === id) index = i;
    });
    let tmp = schedules;
    tmp = schedules.slice(index, 1);
    schedules(tmp);
  }

  function editSchedule(id, s) {
    let tmp = schedules.map((x, i) => {
      // to specific weekday
      if (x.id === id) {
        //update all the details
        x.start = s.start;
        x.end = s.end;
        x.title = s.title;
        x.type = s.type;
        x.info = s.info;
        // x.shareWith = s.shareWith;
        x.date = s.date;
        x.weekday = s.weekday;
        x.style = getStyle(x);
      }
      return x;
    });
    // schedules of the day.
    setSchedules(tmp);
  }

  function addSchedule(id, news) {
    news.id = id;
    news.style = getStyle(news);
    let tmps = schedules.map((item) => {
      return item;
    });
    tmps[tmps.length] = news;
    setSchedules(tmps);
  }

  return (
    <div className={day !== "not" ? wk.columns : wk.numClo}>
      {day !== "not" &&
        schedules.map((item, i) => {
          return (
            <Schedule
              day={day}
              date={date}
              schedule={item}
              editSchedule={editSchedule}
              handleDel={handleDel}
              key={"schedule-" + day + "-" + i}
              adapt={adapt}
            ></Schedule>
          );
        })}
      {[...Array(hours)].map((e, hour) => {
        if (day === "not") {
          if (hour === 0)
            return (
              <div
                key={day + "-" + hour}
                style={{ height: "2em", backgroundColor: "#7cbde8" }}
              >
                &nbsp;
              </div>
            );
          else
            return (
              <div className={wk.num} key={day + hour}>
                {hour}
              </div>
            );
        } else if (hour === 0) {
          return (
            <div key={day + "-" + hour} className={wk.showtitle}>
              <div>{coltitle[0]},</div>
              <div className={wk.date}>
                {coltitle[1].split(".")[0] +
                  " " +
                  months[parseInt(coltitle[1].split(".")[1]) - 1]}
              </div>
            </div>
          );
        } else
          return (
            <Square
              addSchedule={addSchedule}
              key={day + "-" + hour}
              day={day}
              date={date}
              id={day + "-" + hour}
              hour={hour}
            >
              {" "}
            </Square>
          );
      })}
    </div>
  );
}

function Schedule(props) {
  const [isopen, setIsopen] = useState(false);
  const type = 1;

  function popUp(is) {
    setIsopen(is);
  }
  const { schedule, day, date, editSchedule, handleDel, adapt } = props;
  const [sch, setSch] = useState(schedule);
  const hour = schedule.start.split(":")[0];
  useEffect(() => {
    if (adapt !== 0) {
      let start_h = parseInt(schedule.start.split(":")[0]) + adapt;
      let end_h = parseInt(schedule.end.split(":")[0]) + adapt;
      let newStart = start_h + ":" + schedule.start.split(":")[1];
      let newEnd = end_h + ":" + schedule.end.split(":")[1];
      setSch({ ...schedule, start: newStart, end: newEnd });
    }
    return () => {};
  }, [adapt]);

  return (
    <>
      <div
        className={wk.ss}
        style={schedule.style}
        onClick={() => {
          setIsopen(true);
        }}
      >
        <div className={wk.start_time}>{sch.start}</div>
        <div className={wk.end_time}>{sch.end}</div>
        <div className={wk.title}>{schedule.title}</div>
        <div className={wk.info}>{schedule.info}</div>
      </div>
      {isopen && (
        <PopBox
          stype={type}
          day={day}
          date={date}
          hour={hour}
          schedule={schedule}
          operate={popUp}
          handleDel={handleDel}
          editSchedule={editSchedule}
        />
      )}
    </>
  );
}

function Square(props) {
  const [isopen, setIsopen] = useState(false);
  const [mouse, setMouse] = useState(false);
  const type = 0;

  function popUp(is) {
    setIsopen(is);
  }
  function handleMouseEnter() {
    setMouse(true);
  }
  function handleMouseLeave() {
    setMouse(false);
  }

  const { date, hour, id, day, addSchedule } = props;
  return (
    <>
      <div
        style={{ backgroundColor: mouse ? "#ddd" : "white" }}
        className={wk.hour}
        onClick={() => {
          setIsopen(true);
        }}
        id={id}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        &nbsp;
      </div>
      {isopen && (
        <PopBox
          stype={type}
          date={date}
          day={day}
          hour={hour}
          operate={popUp}
          addSchedule={addSchedule}
        />
      )}
    </>
  );
}
