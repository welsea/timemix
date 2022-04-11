import React from 'react';
import Header from './components/Header';
import Pane from './components/Pane';

export default class App extends React.Component{
  render(){
    return(
      <div>
        <Header/>
        <Pane/>
      </div>

    )
  }
}
