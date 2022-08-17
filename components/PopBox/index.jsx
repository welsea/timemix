import React, { Component, useState, useEffect, useReducer } from "react";
import { GrClose } from "react-icons/gr";
import pop from "./index.module.css";
import { nanoid } from "nanoid";
import Detail from "../Detail";
import EditDetail from "../EditDetail";
/**
 *
 * TODO:
 * 1. change all the form action into useReducer
 *
 */

export default function PopBox(props) {
  const {
    schedule,
    stype,
    addSchedule,
    editSchedule,
    date,
    day,
    operate,
    hour,
  } = props;

  const [showEdit, setShowEdit] = useState(false);
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const mon = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const [content, setContent] = useState({
    start: hour + ":00",
    end: hour + ":15",
    type: 0,
    info: "",
    shareWith: [],
    title: "",
    startPick: hour + ":00",
    endPick: hour + ":15",
  });

  useEffect(() => {
    if (schedule) {
      setContent({
        ...content,
        start: schedule.start,
        end: schedule.end,
        type: schedule.type,
        title: schedule.title,
        info: schedule.info,
        shareWith: schedule.shareWith,
        startPick: schedule.start,
        endPick: schedule.end,
      });
    } else {
      setShowEdit(true);
    }
    return () => {};
  }, []);

  function handleClose(is) {
    operate(is);
  }

  function gotoEdit(is) {
    setShowEdit(is);
  }

  function handleConfirm(newcontent) {
    const s = { ...newcontent, date: date, weekday: day };
    delete s.startPick
    delete s.endPick
    s.style=undefined
    delete s.style
    if (stype === 0) {
      const new_id = nanoid();
      addSchedule(new_id, s);
    } else {
      editSchedule(schedule.id, s);
    }
    operate(false);
  }

  const showM = parseInt(date.split(".")[1]);
  const showD = date.split(".")[0];

  return (
    <div className={pop.popup_box}>
      <div className={pop.box}>
        <div className={pop.closediv}>
          <span
            className="icofont-close icofont-2x"
            style={{ color: "#ff8200" }}
            onClick={(e) => handleClose(false)}
            children={<GrClose />}
          ></span>
        </div>
        <div className={pop.date}>
          {" "}
          {days[day - 1] + ", " + showD + " " + mon[showM - 1]}
        </div>
        {showEdit ? (
          <EditDetail content={content} operate={operate} finishEdit={handleConfirm} />
        ) : (
          <Detail content={content} gotoEdit={gotoEdit} />
        )}
      </div>
    </div>
  );
}
