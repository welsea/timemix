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
            startm:"00",
            endp:Array(24-parseInt(this.props.hour)).fill(""),
            start:"",
            end:"",
            type:"",
            info:"",
            shareWith:[],
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
            const si=m.indexOf(schedule.start.split(":")[1])
            this.setState({
                start:schedule.start,
                end:schedule.end,
                type:schedule.type,
                info:schedule.info,
                shareWith:schedule.shareWith,
                endh:parseInt(schedule.end.split(":")[0]),
                endm:m[i-1],
                startm:m[si],
            })
        }else{
            const {hour}=this.props
            this.setState({
                start:hour+":00",
                end:hour+":15",
                type:0,
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
            day:day
        }
        if(stype===0){
            addSchedule(new_id,s)
        }else{
            editSchedule(schedule.id,s)
        }
        operate(false)
    }
    render(){
        const {endh,endm,m,endp,days,mon,type,info,startm}=this.state
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
                                    if(i===0&&startm!=="00"){
                                        return m.slice(m.indexOf(startm)).map((y,j)=>{
                                            return <option key={(i+hour)+":"+y} value={(i+hour)+":"+y}>{(i+hour)+":"+y}</option>
                                        })
                                    }else return m.map((y,j)=>{
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
                    <tr><td>Share With:</td>
                        <td><input placeholder='Input ID, multiple ID separate by ",",press Enter to finish.' onKeyUp={(e)=>this.handleShare(e)}/></td>
                    </tr>
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
