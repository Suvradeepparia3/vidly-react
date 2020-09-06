import React, { Component } from 'react';
import './App.css';
import Home from './Component/Home';
import Login from './Component/Login';
import Dashboard from './Component/Dashboard';
import { BrowserRouter, Route } from 'react-router-dom';
import ShopDetails from './Component/ShopDetails';

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
             render={() => (
               <ShopDetails />
             )}
          />
          <Route
             path='/Customer'
             render={() => (
               <ShopDetails />
             )}
          />
         
      </div>
       </BrowserRouter>
    );
  }
}

// hi 
export default App;
