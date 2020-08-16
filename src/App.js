import React, { Component } from 'react';
import './App.css';
import Home from './Component/Home';
import Login from './Component/Login';


class App extends Component {
  render(){
    return (
      <div className="App">
       <Home />
       <Login />
      </div>
    );
  }
}

export default App;
