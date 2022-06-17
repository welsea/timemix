import React from 'react';
import Header from './components/Header';
import Pane from './components/Pane';
import './iconfont/icofont.min.css'
export default class App extends React.Component{
  render(){
    return(
      <div>
        <Header/>
        <Pane/>
        {/* <Timeline/> */}
      </div>

    )
  }
}
