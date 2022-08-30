import React, { useState, useContext, useEffect } from "react";
import d from "./index.module.css";
import { BiTime, BiEditAlt, BiShare } from "react-icons/bi";
import { MdDeleteOutline } from "react-icons/md";
import { MainContext } from "../../pages";

export default function Detail(props) {
  const { content, gotoEdit, handleDel, operate, share } = props;
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
  const [isShare, setIsShare] = useState(false);
  const [isCopied, setisCopied] = useState(false);

  // useEffect(() => {
  //   // setIsShare(props.content.share)
  //   return () => {
  //     console.log("share:", isShare || share);
  //   };
  // }, [props.share]);

  async function changeShare(id, date, index) {
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
    if (!share) {
      if (
        window.confirm(
          "Are you sure to share this event? \nYou will be unable to edit this event."
        )
      ) {
        let index = null;
        let id = content.id;
        let wd = content.weekday - 1;
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
        changeShare(id, content.date, index);
        setIsShare(true);
      }
    } else {
      alert("This event already been shared.");
    }
  }

  function clickDel() {
    if (window.confirm("Are you sure to delete this event?")) {
      handleDel(content.id, content.date);
      operate(false);
    }
  }

  function handleCopy(e) {
    navigator.clipboard.writeText(content.id);

    setisCopied(true);
  }

  function handleEdit() {
    // if (!(share || isShare)) 
    // else alert("can't edit a shared event.");
    gotoEdit(true);
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
          {/* {(isShare || share) && (
            <tr className={d.shareRow}>
              
              <td style={{"flex":"auto"}}>
                <input disabled value={content.id} className={d.shareIpt} />
              </td>
              <td style={{"flex":"1 1 auto"}}>
                <button onClick={(e) => handleCopy(e)} className={d.copybtn}>
                  Copy
                </button>
                {isCopied && <span className={d.copied}>cpoied!</span>}
              </td>
              <td className={d.note}>Copy to share with others.</td>
            </tr>
          )} */}
        </tbody>
      </table>
      <div className={d.btnrow}>
        <BiShare onClick={handleShare} color={"#d4d4d4"}/>
        <BiEditAlt
          onClick={handleEdit}
          color={"#FFB11B"}
        />
        <MdDeleteOutline onClick={clickDel} />
      </div>
    </div>
  );
}
