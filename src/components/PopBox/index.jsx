import React, { Component } from 'react'
import pop from './index.module.css'

export default class PopBox extends Component {
    state={

    }
    handleClose=()=>{
        this.props.handleClose()
    }
    test=(t)=>{
        console.log(t)
    }
    render(){
        const {type,content}=this.props

        return (
            <div className={pop.popup_box}>
              <div className={pop.box}>
              {
                type===1?<Edit content={content} />:<Add content={content}/>
              }
              </div>
            </div>
          );
    }
}

class Add extends Component{
    state={
        new_shcedule:[],
        start_from:parseInt(this.props.content.hour)
    }
    initialize=()=>{

    }
    render(){
        const {new_shcedule,start_from}=this.state
        const {content}=this.props
        return(
            <div>
                <h2>Add Schedule</h2>
                {/* <div>{date+hour}</div> */}
                <div className={pop.btn}>
                    <table >
                        <tr>
                            <td>Title:</td><td><input></input></td>
                        </tr>
                        <tr>
                            <td>Date:</td><td><input>{content.date}</input></td>
                        </tr>
                        <tr>
                            <td>Start:</td>
                            <td><select name="start_time" id="start_time">
                                {
                                    [...Array(start_from)].map((i)=>{
                                       return <option value={i+start_from}>{i+start_from}</option>
                                    })
                                    
                                }
                            </select></td>
                        </tr>
                        <tr>
                            <td>End:</td><td><input></input></td>
                        </tr>
                        <tr>
                            <td>Info:</td><td><input></input></td>
                        </tr>
                        <tr>
                            <td>Publicity:</td><td><input></input></td>
                        </tr>
                        <tr>
                            <td>Share With:</td><td><input></input></td>
                        </tr>
                    </table>
                    <button onClick={this.handleClose} >Cancel</button>
                    <button className={pop.addBtn}>Add</button>
                </div>
            </div>
        )
    }
}

class Edit extends Component{
    render(){
        return(
            <div>
                <h2>Edit Schedule</h2>
                {/* <div>{date+hour}</div> */}
                <div className={pop.btn}>
                    <button onClick={this.handleClose} >Cancel</button>
                    <button className={pop.addBtn}>Confirm</button>
                </div>
            </div>
        )
    }
}