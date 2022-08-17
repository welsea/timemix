import React from 'react'
import d from './index.module.css'
import Router from 'next/router';

export default function Detail(props) {
    const {content,gotoEdit,handleDel,operate}=props
    const typeArr=[
        {
            id:0,
            name:"work",
            color:"#91AD70"
        },
        {
            id:1,
            name:"study",
            color:"#89916B"
        },
        {
            id:2,
            name:"life",
            color:"#69B0AC"
        }
    ]


    function gotoUser(id){
        Router.push({
          pathname:'/user',
          query:{
            name:id,
          }
        },'/user/@'+id)
      }

    function clickDel(){
        if(window.confirm("Are you sure to delete this event?")){
            handleDel(content.id,content.date)
            operate(false)
        }
    }
  return (
      <div>
        <table className={d.table}><tbody>
            <tr><td style={{"margin":0}}></td>
                <td className={d.title}>{content.title}</td>
            </tr>
            <tr><td>Type:</td>
                <td className={d.type} style={{"backgroundColor":typeArr[content.type].color}}>{typeArr[content.type].name}
                </td>
            </tr>
            <tr><td>Time</td>
                <td>{content.start}&nbsp;-&nbsp;{content.end}</td>
            </tr>
            <tr><td>Share With:</td>
                <td className={d.namelist}>
                    {content.shareWith.map((i)=>{
                        return <div key={i} className={d.name} onClick={()=>gotoUser(i)}>@{i}</div>
                    })}
                </td>
            </tr>
            <tr><td>Detail:</td>
                <td>{content.info}</td>
            </tr>
        </tbody></table>
        <div className={d.btnrow}>
            <div className={d.delbtn} onClick={clickDel}>Delete</div>
            <div className={d.addBtn} onClick={()=>gotoEdit(true)}>Edit</div>
        </div>
    </div>

  )
}
