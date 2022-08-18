import React, { useState } from "react";
import d from "./index.module.css";
import Router from "next/router";
import { BiTime, BiEditAlt, BiShare } from "react-icons/bi";
import { MdDeleteOutline } from "react-icons/md";

export default function Detail(props) {
  const { content, gotoEdit, handleDel, operate } = props;
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


  function clickDel() {
    if (window.confirm("Are you sure to delete this event?")) {
      handleDel(content.id, content.date);
      operate(false);
    }
  }

  function handleShare() {
    if (
      window.confirm(
        "Are you sure to share this event? \nYou will be unable to edit this event."
      )
    ) {
      // handleDel(content.id, content.date);
      operate(false);
    }
  }

  function handleCopy(e){
    e.clipoarddata.setData('text/plain',content.id)
    console.log()
  }

  function handleEdit(){
    if(!content.share) gotoEdit(true)
    else alert("can't edit a shared event.")
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
          {content.share && (
            <tr>
              <td>
                <input disabled value={content.id} /> <button onCopy={e=>setCopiedValue(content.id)}>Copy</button>
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <div className={d.btnrow}>
        <BiShare onClick={handleShare} />
        <BiEditAlt onClick={handleEdit}  color={content.share?"#888":"#d4d4d4"}/>
        <MdDeleteOutline onClick={clickDel} />
      </div>
    </div>
  );
}
