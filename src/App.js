import React, { Component } from 'react';
import './App.css';
import Piegraph from './Piegraph';
import Bargraph from './Bargraph';
import ReactDOM from 'react-dom';

class App extends Component {
  render() {

        return (
       
       <div className="App">
       
       <Bargraph /><br></br><br></br><br></br>
       <Piegraph />

       </div>
      
    )
    }
 }
export default App;
