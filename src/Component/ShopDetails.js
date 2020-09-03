import React, { Component } from 'react';
import Movies from './Movies';
import Customer from './Customer';
import { BrowserRouter, Route } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

class ShopDetails extends Component {
    constructor(props) {
        super(props);
        const token = localStorage.getItem("x-auth-token")
        let loggedIn = true

        if(token == null){
            loggedIn = false
        }
        let loading = true
        let loadingCustomerList = true
        this.state = {
            loggedIn,
            loading,
            loadingCustomerList,
            movies: [],
            customer: []
        }

    }

    componentDidMount() {
        const token = localStorage.getItem("x-auth-token")
        if(this.state.loggedIn === true){
        axios.get('https://vidly-unique.herokuapp.com/api/movies', {
            headers: {
                'x-auth-token': `${token}`
            }
        })
        .then( response => {
            console.log(response)
            this.setState({loading: false, movies: response.data})
        })
        .catch( error => {
            console.log(error)
        })
        axios.get('https://vidly-unique.herokuapp.com/api/customers', {
            headers: {
                'x-auth-token': `${token}`
            }
        })
        .then( response => {
            console.log(response)
            this.setState({loadingCustomerList: false, customer: response.data})
        })
        .catch( error => {
            console.log(error)
        })
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
                movies={this.state.movies}
                // customer={this.state.customer}
                loading={this.state.loading}/>
             )}
            />
            <Route
             path='/Customer'
             render={(props) => (
                <Customer {...props} 
                title={"Customers list"} 
                name={"Name"} 
                phone={"Phone No"} 
                prime={"Subscribe"}
                movies={this.state.movies}
                customer={this.state.customer}
                loadingCustomerList={this.state.loadingCustomerList}/>
             )}
            />
            </div>
            </BrowserRouter>
        );
    }
}



export default ShopDetails;