import React, { Component, useState, useEffect } from 'react'
import { GrClose } from "react-icons/gr";
import pop from './index.module.css'
import { nanoid } from 'nanoid'

/**
 * 
 * TODO:
 * 1. change all the form action into useReducer
 * 
 */


export default function PopBox(props) {
    const {schedule,stype,addSchedule,editSchedule,date,day,operate,hour}=props

    const days=['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']
    const mon=["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    const m=["00","15","30","45"]
    const [isSelect, setIsSelect] = useState(false)
    const pick=[...Array(24)].map((x,h)=>{
        return ["00","15","30","45"].map((m)=>{
            return h+":"+m
        })
    }).flat()

    const typeArr=[
        {
            id:0,
            name:"work"
        },
        {
            id:1,
            name:"study"
        },
        {
            id:2,
            name:"life"
        }
    ]

    // const [shareWith, setShareWith] = useState([])
    
    const [content,setContent]=useState({
            start:hour+":00",
            end:hour+":15",
            type:0,
            info:"",
            shareWith:[],
            title:"",
            startPick:hour+":00",
            endPick:hour+":15",
        })
    
    useEffect(() => {
      if(schedule){
          setContent({...content,
                        start:schedule.start,
                        end:schedule.end,
                        type:schedule.type,
                        title:schedule.title,
                        info:schedule.info,
                        shareWith:schedule.shareWith,
                        startPick:schedule.start,
                        endPick:schedule.end,
        })
      }
      return () => {
        console.log("set info")
      }
    }, [])
    
    function handleClose(is){
        operate(is)
    }

    function handleTitle(e){
        setContent({...content,title:e.target.value})
    }

    function startChange(e){
        const time=(e.target.value).split(":")
        const {stype}=props
        if(stype===0 || parseInt(time[0])>parseInt(content.endPick.split(":")[0])){
            let tmpep=""
            if(time[1]==="45"){
                tmpep=(parseInt(time[0])+1)+":00"
            }else{
                tmpep=time[0]+":"+(m[m.indexOf(time[1])+1])
            }
            setContent({...content,endPick:tmpep,start:e.target.value,startPick:e.target.value})
            setIsSelect(true)
        }else{
            setIsSelect(true)
            setContent({...content,start:e.target.value,startPick:e.target.value})
        }
    }

    function handleEnd(e){
        setContent({...content,end:e.target.value,endPick:e.target.value})
    }

    function handleType(e){
        setContent({...content,type:e.target.value})
    }

    function handleShare(e){
        if(e.key==="Enter" && e.target.value.trim() !==''){
            const sw=e.target.value.split(",")
            setContent({...content,shareWith:content.shareWith.concat(sw)})
        }

    }

    function handleInfo(e){
        setContent(
            {...content,info:e.target.value}
        )
    }

    function handleConfirm(){
        const s={...content,date:date,weekday:day}
        if(stype===0){
            const new_id=nanoid()
            addSchedule(new_id,s)
        }else{
            editSchedule(schedule.id,s)
        }
        operate(false)
    }



    const showM=parseInt(date.split(".")[1])
    const showD=date.split(".")[0]

    return(
        <div className={pop.popup_box}>
            <div className={pop.box}>
            <div className={pop.closediv}>
                <span 
                    className="icofont-close icofont-2x" 
                    style={{color: "#ff8200"}} 
                    onClick={(e)=>handleClose(false)}
                    children={<GrClose/>}
                    ></span>
            </div>
            <div className={pop.date}> {days[day-1]+", "+showD+" "+mon[showM-1]}</div>
            <table className={pop.table}><tbody>
                <tr><td>Title:</td>
                    <td><input defaultValue={content.title} onKeyUp={(e)=>handleTitle(e)}/></td>
                </tr>
                <tr><td>Type:</td>
                    <td><select name="type" value={content.type} id="type" onChange={(e)=>handleType(e)}>
                        {
                            typeArr.map((item)=>{
                                return <option key={item.id} value={item.id}>{item.name}</option>
                            })
                        }
                    </select></td>
                </tr>
                <tr><td>Time</td>
                    <td><select name="start_time" id="start_time" value={content.startPick} onChange={(e)=>startChange(e)} >
                        {
                            pick.map((item)=>{
                                return <option key={item} value={item}>{item}</option>
                            })
                            
                        }
                    </select>&nbsp;-&nbsp;<select name="end_time" id="end_time" value={content.endPick} onChange={(e)=>handleEnd(e)} >
                        {
                            pick.map((item)=>{
                                return <option key={item} value={item}>{item}</option>
                            })
                        }
                    </select></td>
                </tr>
                <tr><td>Share With:</td>
                    <td><input placeholder='Input ID, multiple ID separate by ",",press Enter to finish.' defaultValue={content.shareWith.join(", ")} onKeyUp={(e)=>handleShare(e)}/></td>
                </tr>
                <tr><td>Info:</td>
                    <td><textarea defaultValue={content.info} onKeyUp={(e)=>handleInfo(e)}></textarea></td>
                </tr>
            </tbody></table>
            <div className={pop.addBtn} onClick={handleConfirm}>{stype===0?"Add":"Edit"}</div>
        </div>
        </div>
    )
}