import React, { Component } from 'react';
import './App.css';
import Home from './Component/Home';
import Login from './Component/Login';
import Customer from './Component/Customer';
import Movies from './Component/Movies';
import Dashboard from './Component/Dashboard';
import { BrowserRouter, Route } from 'react-router-dom';

class App extends Component {
  render(){
    return (
      <BrowserRouter >
      <div className="App">
          <Home />
          <Route exact path={"/"} component={Login}  /> 
          <Route
             path='/Dashboard'
             render={(props) => (
                <Dashboard {...props} 
                title={"Dashboard"} 
                name={"Customer name"} 
                movie={"Movie name---(Rent/Day)"} 
                date={"Booking date"} 
                total={"Total cost"}/>
             )}
          />
          <Route
             path='/Movies'
             render={(props) => (
                <Movies {...props} 
                title={"Movies list"} 
                 name={"Title"} 
                 type={"Genre"}
                rate={"Rental Rate / Day"} 
                stock={"Stock"} />
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
