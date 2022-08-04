import React, { useReducer, useState } from 'react'

import ed from './index.module.css'


export default function EditDetail(props) {
    const {operate,finishEdit}=props

    const [content, setContent] = useState(props.content)
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
        
    let [state,dispatch]=useReducer(
        (state,action)=>{
            switch(action.type){
                case "TITLE":
                    setContent({...content,title:action.value})
                    return {...state}
                case "TYPE":
                    setContent({...content,type:action.value})
                    return{...state}
                case "INFO":
                    setContent(
                        {...content,info:action.value}
                    )
                    return {...state}
                default:
                    return {...state}
            }
        }
    )

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
    
    function handleShare(e){
        if(e.key==="Enter" && e.target.value.trim() !==''){
            const tmp=e.target.value.split(",")
            const sw=tmp.filter((value,index)=>{
                return index===tmp.indexOf(value)
            }) 
            setContent({...content,shareWith:sw})
        }
    }

  return (
    <div>
        <table className={ed.table}><tbody>
                <tr><td>Title:</td>
                    <td><input defaultValue={content.title} onKeyUp={(e)=>dispatch({type:"TITLE",value:e.target.value})}/></td>
                </tr>
                <tr><td>Type:</td>
                    <td><select name="type" value={content.type} id="type" onChange={(e)=>dispatch({type:"TYPE",value:e.target.value})}>
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
                    <td>
                        <span className={ed.note}>* Multiple IDs should separate by "," (press Enter to finish).</span>
                        <input defaultValue={content.shareWith.join(", ")} onKeyUp={(e)=>handleShare(e)}/>
                    </td>
                </tr>
                <tr><td>Detail:</td>
                    <td><textarea defaultValue={content.info} onKeyUp={(e)=>dispatch({type:"INFO",value:e.target.value})}></textarea></td>
                </tr>
            </tbody>
            </table>
            <div className={ed.addBtn} onClick={()=>finishEdit(content)}>Confirm</div>
    </div>
  )
}
