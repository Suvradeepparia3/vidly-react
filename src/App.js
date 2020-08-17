import React, { Component } from 'react';
import './App.css';
import Home from './Component/Home';
import Login from './Component/Login';
import Customer from './Component/Customer';
import { BrowserRouter, Route } from 'react-router-dom';

class App extends Component {
  render(){
    return (
      <BrowserRouter >
      <div className="App">
          <Home />
          <Route exact path={"/"} component={Login} /> 
          <Route path={"/customer"} component={Customer} />  
      </div>
       </BrowserRouter>
    );
  }
}

export default App;
