import React, { Component } from 'react'
import pop from './index.module.css'

export default class PopBox extends Component {
    handleClose=()=>{
        this.props.handleClose()
    }
    render(){
        const {date,hour}=this.props
        return (
            <div className={pop.popup_box}>
              <div className={pop.box}>
              <h2>Add Schedule</h2>
                <div>{date+hour}</div>
                <div className={pop.btn}>
                    <button onClick={this.handleClose} >Cancel</button>
                    <button className={pop.addBtn}>Add</button>
                </div>
              </div>
            </div>
          );
    }
}
