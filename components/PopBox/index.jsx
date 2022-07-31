import React, { Component } from 'react'
import { GrClose } from "react-icons/gr";
import pop from './index.module.css'
import { nanoid } from 'nanoid'

export default class PopBox extends Component {
    constructor(props){
        super(props)
        this.state={
            days:['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'],
            mon:["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            m:["00","15","30","45"],
            isSelect:false,

            pick:[...Array(24)].map((x,h)=>{
                return ["00","15","30","45"].map((m)=>{
                    return h+":"+m
                })
            }).flat(),
            shareWith:[],
            typeArr:[
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
        }
    }
    componentDidMount(){
        this.initializeSchedule()
    }
    initializeSchedule=()=>{
        // create time picker Array
        if(this.props.schedule){
            const {schedule}=this.props
            this.setState({
                start:schedule.start,
                end:schedule.end,
                type:schedule.type,
                title:schedule.title,
                info:schedule.info,
                shareWith:schedule.shareWith,
                startPick:schedule.start,
                endPick:schedule.end,
            })
        }else{
            const {hour}=this.props
            this.setState({
                start:hour+":00",
                end:hour+":15",
                type:0,
                info:"",
                shareWith:[],
                title:"",
                startPick:hour+":00",
                endPick:hour+":15",
            })
        }

    }
    handleClose=(is)=>{
        this.props.operate(is)
    }
    handleTitle=(e)=>{
        this.setState(
            {title:e.target.value}
        )
    }
    startChange=(e)=>{
        const time=(e.target.value).split(":")
        const {m,endPick}=this.state
        const {stype}=this.props
        if(stype===0 || parseInt(time[0])>parseInt(endPick.split(":")[0])){
            let tmpep=""
            if(time[1]==="45"){
                tmpep=(parseInt(time[0])+1)+":00"
            }else{
                tmpep=time[0]+":"+(m[m.indexOf(time[1])+1])
            }
            this.setState({
                endPick:tmpep,
                isSelect:true,
                start:e.target.value,
                startPick:e.target.value
            })
        }else{
            this.setState(
                {
                    isSelect:true,
                    start:e.target.value,
                    startPick:e.target.value
                }
            )
        }
    }
    handleEnd(e){
        this.setState(
            {
                end:e.target.value,
                endPick:e.target.value
            }
        )
    }
    handleType=(e)=>{
        this.setState(
            {type:e.target.value}
        )
    }
    handleShare(e){
        const {shareWith}=this.state
        if(e.key==="Enter" && e.target.value.trim() !==''){
            const sw=e.target.value.split(",")
            this.setState(
                {shareWith:shareWith.concat(sw)}
            )
        }
    }
    handleInfo(e){
        this.setState(
            {info:e.target.value}
        )
    }
    handleConfirm=()=>{
        const {start,end,type,info,shareWith,title}=this.state
        const {schedule,stype,addSchedule,editSchedule,date,day,operate}=this.props
        const s={
            start:start,
            end:end,
            type:type,
            info:info,
            shareWith:shareWith,
            title:title,
            date:date,
            weekday:day
        }
        if(stype===0){
            const new_id=nanoid()
            addSchedule(new_id,s)
        }else{
            editSchedule(schedule.id,s)
        }
        operate(false)
    }
    render(){
        const {days,mon,type,info,pick,startPick,endPick,title,shareWith,typeArr}=this.state
        const {stype,date,day}=this.props
        const showM=parseInt(date.split(".")[1])
        const showD=date.split(".")[0]
        console.log(date)
        
        return(
            <div className={pop.popup_box}>
              <div className={pop.box}>
                <div className={pop.closediv}>
                    <span 
                        className="icofont-close icofont-2x" 
                        style={{color: "#ff8200"}} 
                        onClick={()=>this.handleClose(false)}
                        children={<GrClose/>}
                        ></span>
                </div>
                <div className={pop.date}> {days[day-1]+", "+showD+" "+mon[showM-1]}</div>
                <table className={pop.table}><tbody>
                    <tr><td>Title:</td>
                        <td><input defaultValue={title} onKeyUp={(e)=>this.handleTitle(e)}/></td>
                    </tr>
                    <tr><td>Type:</td>
                        <td><select name="type" value={type} id="type" onChange={(e)=>this.handleType(e)}>
                            {
                                typeArr.map((item)=>{
                                    return <option key={item.id} value={item.id}>{item.name}</option>
                                })
                            }
                        </select></td>
                    </tr>
                    <tr><td>Time</td>
                        <td><select name="start_time" id="start_time" value={startPick} onChange={(e)=>this.startChange(e)} >
                            {
                                pick.map((item)=>{
                                    return <option key={item} value={item}>{item}</option>
                                })
                                
                            }
                        </select>&nbsp;-&nbsp;<select name="end_time" id="end_time" value={endPick} onChange={(e)=>this.handleEnd(e)} >
                            {
                                pick.map((item)=>{
                                    return <option key={item} value={item}>{item}</option>
                                })
                            }
                        </select></td>
                    </tr>
                    <tr><td>Share With:</td>
                        <td><input placeholder='Input ID, multiple ID separate by ",",press Enter to finish.' defaultValue={shareWith.join(", ")} onKeyUp={(e)=>this.handleShare(e)}/></td>
                    </tr>
                    <tr><td>Info:</td>
                        <td><textarea defaultValue={info} onKeyUp={(e)=>this.handleInfo(e)}></textarea></td>
                    </tr>
                </tbody></table>
                <div className={pop.addBtn} onClick={this.handleConfirm}>{stype===0?"Add":"Edit"}</div>
            </div>
        </div>
        )
    }
}
