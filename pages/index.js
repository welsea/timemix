import Link from 'next/link'
import React from 'react';
import Header from '../components/Header';
import Router from 'next/router';
import Pane from '../components/Pane'
// import Pane from './components/Pane';
export default class App extends React.Component{
  gotoTr=()=>{
    Router.push({
      pathname:'/tr',
      query:{
        id:2,
        name:"tom",
      }
    },'tr/id/name')
  }
  render(){
    return(
      <div>
        <Header/>
        <Pane/>
        {/* <Timeline/> */}
        <a onClick={this.gotoTr}>to tr</a>
      </div>
    )
  }
}