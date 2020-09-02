import React, { Component } from 'react';
import Movies from './Movies';
import Customer from './Customer';
import { BrowserRouter, Route } from 'react-router-dom';
import { Redirect } from 'react-router-dom';


class ShopDetails extends Component {
    constructor(props) {
        super(props);
        const token = localStorage.getItem("x-auth-token")
        let loggedIn = true

        if(token == null){
            loggedIn = false
        }
        
        this.state = {
            loggedIn
        }

    }


   

    render() {
        if(this.state.loggedIn === false){
            return <Redirect to="/" />
         }
        return (
            <BrowserRouter>
            <div>
            <Route
             path='/Movies'
             render={(props) => (
                <Movies {...props} 
                title={"Movies list"} 
                 name={"Title"} 
                 type={"Genre"}
                rate={"Rental Rate / Day"} 
                stock={"Stock"} 
                loggedIn={this.state.loggedIn}/>
             )}
            />
            <Route
             path='/Customer'
             render={(props) => (
                <Customer {...props} 
                title={"Customers list"} 
                name={"Name"} 
                phone={"Phone No"} 
                prime={"Subscribe"}/>
             )}
            />
            </div>
            </BrowserRouter>
        );
    }
}



export default ShopDetails;