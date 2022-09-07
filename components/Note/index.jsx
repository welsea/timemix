import React from 'react'
import n from './index.module.css'
import {
    BsFillExclamationTriangleFill,
    BsGithub
  } from "react-icons/bs";
export default function Note() {
  return (
    <div className={n.note}>
        <BsFillExclamationTriangleFill />
        <div>This is a demo website for TimeMix. <br />
        All the data will be reset at midnight(CEST).</div>
        <div style={{"color":"black","fontSize":"0.9em"}}><BsGithub/><a href='https://github.com/welsea/timemix'>Github</a></div>
    </div>
  )
}
