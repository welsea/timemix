import React, { Component } from 'react'
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
            start:"",
            end:"",
            type:0,
            info:"",
            shareWith:[],
            title:"",
            pick:[...Array(24)].map((x,h)=>{
                return ["00","15","30","45"].map((m)=>{
                    return h+":"+m
                })
            }).flat(),
            startPick:this.props.schedule?this.props.schedule.start:this.props.hour+":00",
            endPick:this.props.schedule?this.props.schedule.end:this.props.hour+":15"
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
        this.setState(
            {
                endh:parseInt(time[0]),
                endm:time[1],
                isSelect:true,
                endp:Array(24-parseInt(time[0])).fill(""),
                start:e.target.value
            }
        )
    }
    handleEnd(e){
        this.setState(
            {end:e.target.value}
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
        const new_id=nanoid()
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
            addSchedule(new_id,s)
        }else{
            editSchedule(schedule.id,s)
        }
        operate(false)
    }
    render(){
        const {days,mon,type,info,pick,startPick,endPick,title}=this.state
        const {stype,date,day}=this.props
        const showM=parseInt(date.split(".")[1])
        const showD=date.split(".")[0]
        
        return(
            <div className={pop.popup_box}>
              <div className={pop.box}>
                <div className={pop.closediv}>
                    <i className="icofont-close icofont-2x" style={{color: "#ff8200"}} onClick={()=>this.handleClose(false)}></i>
                </div>
                <div className={pop.date}> {days[day-1]+", "+showD+" "+mon[showM-1]}</div>
                <table className={pop.table}><tbody>
                    <tr><td>Title:</td>
                        <td><input defaultValue={title} onKeyUp={(e)=>this.handleTitle(e)}/></td>
                    </tr>
                    <tr><td>Type:</td>
                        <td><select value={type} name="type" id="type" onChange={(e)=>this.handleType(e)}>
                            <option value="0">work</option>
                            <option value="1">study</option>
                            <option value="2">life</option>
                        </select></td>
                    </tr>
                    <tr><td>Time</td>
                        <td><select name="start_time" id="start_time" onChange={(e)=>this.startChange(e)} defaultValue={startPick}>
                            {
                                pick.map((item)=>{
                                    return <option key={item} value={item}>{item}</option>
                                })
                                
                            }
                        </select>&nbsp;-&nbsp;<select name="end_time" id="end_time" onChange={(e)=>this.handleEnd(e)} defaultValue={endPick}>
                            {
                                pick.map((item)=>{
                                    return <option key={item} value={item}>{item}</option>
                                })
                            }
                        </select></td>
                    </tr>
                    <tr><td>Share With:</td>
                        <td><input placeholder='Input ID, multiple ID separate by ",",press Enter to finish.' onKeyUp={(e)=>this.handleShare(e)}/></td>
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
