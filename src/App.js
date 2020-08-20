import React, { Component } from 'react';
import './App.css';
import Home from './Component/Home';
import Login from './Component/Login';
import Customer from './Component/Customer';
import Movies from './Component/Movies';
import { BrowserRouter, Route } from 'react-router-dom';

class App extends Component {
  render(){
    return (
      <BrowserRouter >
      <div className="App">
          <Home />
          <Route exact path={"/"} component={Login}  /> 
          <Route
             path='/Movies'
             render={(props) => (
                <Movies {...props} 
                title={"Movies list"} 
                name={"Title"} 
                Rate={"Rental Rate / Day"} 
                Stock={"Stock"} />
             )}
          />
          <Route
             path='/Customer'
             render={(props) => (
                <Customer {...props} 
                title={"Customers list"} 
                name={"Name"} 
                phone={"Phone No"} 
                prime={"Subscribe"} />
             )}
          />
      </div>
       </BrowserRouter>
    );
  }
}

export default App;
