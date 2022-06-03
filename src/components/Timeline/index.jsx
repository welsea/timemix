import React, { Component } from 'react'
import tl from './index.module.css'


export default class TimeLine extends Component {
    state={
        schedule:[
            {
                start:14.15,
                end:18.15,
                color:'#ddd',
                commentOwn:'comment',
                shareWith:[
                    {
                        name:'tom',
                        comment:'Tom\'s COMMENT'
                },
                    {
                        name:'jerry',
                        comment:"Jerry's comment"
                    }
                ]
            }
        ],
        hours:[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
        days:['Mon','Tue','Wed','Thur','Fri','Sat','Sun']
    }
  render() {
      const {hours}=this.state
      const {days}=this.state
    return (
      <div className={tl.layout}>
        <table className={tl.tab}>
            <thead>
                <tr>
                    <th></th>
                    {
                        hours.map((hour)=>{
                            return <th key={hour}>{hour}</th>
                        })
                    }
                </tr>   
            </thead>
            <tbody>
                {
                    days.map((day)=>{
                        return(
                            <tr key={day}>
                                {
                                    [""].concat(hours).map((hour,i)=>{
                                        if(i===0) return <th className={tl.vth} key={hour}>{day}.</th>
                                        else return <td key={day}></td>
                                    })
                                }
                            </tr>
                        ) 
                    })
                }
            </tbody>
        </table>
      </div>
    )
  }
}


/*  vertical timeline
        <thead>
                <tr>
                    <th></th>
                    {
                        days.map((day)=>{
                            return <th key={day}>{day}.</th>
                        })
                    }
                </tr>   
            </thead>
            <tbody>
                {
                    hours.map((hour)=>{
                        return(
                            <tr key={hour}>
                                {
                                    [""].concat(days).map((day,i)=>{
                                        if(i===0) return <td key={day} >{hour}</td>
                                        else return <td key={day}></td>
                                    })
                                }
                            </tr>
                        ) 
                    })
                }
            </tbody>
 */