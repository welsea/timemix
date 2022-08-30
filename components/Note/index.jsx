import React from 'react'
import n from './index.module.css'
import {
    BsFillExclamationTriangleFill
  } from "react-icons/bs";
export default function Note() {
  return (
    <div className={n.note}>
        <BsFillExclamationTriangleFill />
        <div>This is a demo website for TimeMix. <br />
        All the data will be reset at midnight(CEST).</div>
    </div>
  )
}
