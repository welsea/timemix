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
            endh:parseInt(this.props.hour),
            endm:"00",
            endp:Array(24-parseInt(this.props.hour)).fill(""),
            isPublic:false,
            start:"",
            end:"",
            type:"",
            info:"",
            shareWith:[],
            display:true,
            title:"",
        }
    }
    componentDidMount(){
        this.initializeSchedule()
    }
    initializeSchedule=()=>{
        if(this.props.schedule){
            const {schedule}=this.props
            const {m}=this.state
            const i=m.indexOf(schedule.end.split(":")[1])
            this.setState({
                start:schedule.start,
                end:schedule.end,
                type:schedule.type,
                info:schedule.info,
                shareWith:schedule.shareWith,
                display:schedule.display,
                endh:parseInt(schedule.end.split(":")[0]),
                endm:m[i-1]
            })
        }else{
            const {hour}=this.props
            this.setState({
                start:hour+":00",
                end:hour+":15",
                type:0,
                display:0,
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
    handleDisplay=(e)=>{
        let ispub
        if(e.target.value==="1"){
            ispub=true
        }
        this.setState(
            {
                isPublic:ispub,
                display:e.target.value
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
    handleConfirm=()=>{
        const {start,end,type,info,shareWith,display,title}=this.state
        const new_id=nanoid()
        const news={
            start:start,
            end:end,
            type:type,
            info:info,
            shareWith:shareWith,
            display:display,
            title:title,
        }
        if(this.props.stype===0){
            this.props.addSchedule(new_id,news)
        }else{
            this.props.editSchedule(this.props.schedule.id,news)
        }
    }
    render(){
        const {endh,endm,m,endp,isPublic,days,mon,display,type,info}=this.state
        const {stype,date,day}=this.props
        const hour=parseInt(this.props.hour)
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
                        <td><input onKeyUp={(e)=>this.handleTitle(e)}/></td>
                    </tr>
                    <tr><td>Type:</td>
                        <td><select value={type} name="type" id="type" onChange={(e)=>this.handleType(e)}>
                            <option value="0">work</option>
                            <option value="1">study</option>
                            <option value="2">life</option>
                        </select></td>
                    </tr>
                    <tr><td>Time</td>
                        <td><select name="start_time" id="start_time" onChange={(e)=>this.startChange(e)}>
                            {
                                [...Array(24-hour)].map((x,i)=>{
                                    return m.map((y,j)=>{
                                        return <option key={(i+hour)+":"+y} value={(i+hour)+":"+y}>{(i+hour)+":"+y}</option>
                                    })
                                })
                                
                            }
                        </select>&nbsp;-&nbsp;<select name="end_time" id="end_time" onChange={(e)=>this.handleEnd(e)}>
                            {
                                endp.map((x,i)=>{
                                    if(i===0){
                                        return m.slice(m.indexOf(endm)+1).map((y,j)=>{
                                            return <option key={(i+endh)+":"+y} value={(i+endh)+":"+y}>{(i+endh)+":"+y}</option>
                                    })}else return m.map((y,j)=>{
                                        return <option key={(i+endh)+":"+y} value={(i+endh)+":"+y}>{(i+endh)+":"+y}</option>
                                    })
                                })
                            }
                        </select></td>
                    </tr>
                    <tr><td>Display:</td>
                        <td><select value={display} name="display" id="display" onChange={(e)=>this.handleDisplay(e)}>
                            <option value="0">Private</option>
                            <option value="1">Public</option>
                        </select></td>
                    </tr>
                    {
                        isPublic&&<tr><td>Share With:</td>
                            <td><input placeholder='Input ID, multiple ID separate by ",",press Enter to finish.' onKeyUp={(e)=>this.handleShare(e)}/></td>
                        </tr>
                    }
                    <tr><td>Info:</td>
                        <td><textarea defaultValue={info}></textarea></td>
                    </tr>
                </tbody></table>
                <div className={pop.addBtn} onClick={this.handleConfirm}>{stype===0?"Add":"Edit"}</div>
            </div>
        </div>
        )
    }
}
