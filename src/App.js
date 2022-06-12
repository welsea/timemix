import React from 'react';
import Header from './components/Header';
// import Pane from './components/Pane';
import Timeline from './components/Timeline'
import './iconfont/icofont.min.css'
export default class App extends React.Component{
  render(){
    return(
      <div>
        <Header/>
        {/* <Pane/> */}
        <Timeline/>
      </div>

    )
  }
}
