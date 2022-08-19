import React, { useState, useContext, useEffect } from "react";
import d from "./index.module.css";
import { BiTime, BiEditAlt, BiShare } from "react-icons/bi";
import { MdDeleteOutline } from "react-icons/md";
import { MainContext } from "../../pages";

export default function Detail(props) {
  const {content, gotoEdit, handleDel, operate } = props;
  const typeArr = [
    {
      id: 0,
      name: "work",
      color: "#91AD70",
    },
    {
      id: 1,
      name: "study",
      color: "#89916B",
    },
    {
      id: 2,
      name: "life",
      color: "#69B0AC",
    },
  ];
  const data = useContext(MainContext);
  const [schedules, setSchedules] = data.schedules;
  const [isShare, setIsShare] = useState(false)

  useEffect(() => {
    setIsShare(props.content.share)
    return () => {
    }
  }, [])
  
  async function share(id, date, index) {
    // pass id, date
    const obj = {
      id,
      date,
      index,
      share: true,
    };
    const response = await fetch(`/api/content`, {
      method: "PUT",
      body: JSON.stringify(obj),
    });
  }

  function handleShare() {
    if(!content.share){
          if (
      window.confirm(
        "Are you sure to share this event? \nYou will be unable to edit this event."
      )
    ) {
      let index = null;
      let id = content.id;
      let wd=content.weekday-1
      schedules[wd][0].forEach((x, i) => {
        if (x.id === id) index = i;
      });
      // todo: change all thechedules
      // setAllSchedules()
      const tmpall = schedules.map((wd, i) => {
        // into specific weekday
        if (i === content.weekday - 1) {
          // empty layer [0]
          wd[0][index].share = true;
          return wd;
        }
        return wd;
      });
      setSchedules(tmpall);
      share(id, content.date, index);
      setIsShare(true)
    }  
    }else{
        alert("This event already been shared.")
    }
  }

  function clickDel() {
    if (window.confirm("Are you sure to delete this event?")) {
      handleDel(content.id, content.date);
      operate(false);
    }
  }

  function handleCopy(e) {
    e.clipoarddata.setData("text/plain", content.id);
    console.log();
  }

  function handleEdit() {
    if (!content.share) gotoEdit(true);
    else alert("can't edit a shared event.");
  }
  return (
    <div>
      <table className={d.table}>
        <tbody>
          <tr>
            <td className={d.title}>{content.title}</td>
          </tr>
          <tr className={d.time}>
            <td className={d.smalltime}>
              <BiTime />
              {content.start}&nbsp;-&nbsp;{content.end}
            </td>
            <td
              className={d.type}
              style={{ backgroundColor: typeArr[content.type].color }}
            >
              {typeArr[content.type].name}
            </td>
          </tr>
          <tr>
            <td>{content.info}</td>
          </tr>
          {isShare && (
            <tr>
              <td>
                <input disabled value={content.id} />{" "}
                <button onCopy={(e) => setCopiedValue(content.id)}>Copy</button>
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <div className={d.btnrow}>
        <BiShare onClick={handleShare} />
        <BiEditAlt
          onClick={handleEdit}
          color={isShare ? "#d4d4d4" : "#FFB11B"}
        />
        <MdDeleteOutline onClick={clickDel} />
      </div>
    </div>
  );
}
