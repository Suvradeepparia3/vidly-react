import React, { Component } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import './Movies.css';

class Customer extends Component {
    constructor(props) {
        super(props);
        const token = localStorage.getItem("x-auth-token")

        let loggedIn = true
        if(token == null){
            loggedIn = false
        }

        this.state = {
            movies: [],
            loggedIn
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
            this.setState({movies: response.data})
        })
        .catch( error => {
            console.log(error)
        })
        }
    }

    logOut(){
        localStorage.removeItem("x-auth-token")
    }

    render(){
        const { movies } = this.state
        if(this.state.loggedIn === false){
            return <Redirect to="/" />
         }
            return (
                <div>
               <div className="row">
                    <div className="col-10">
                    <h1 className="cust-list">{this.props.title}</h1>
                    </div>
                    <div className="col-2 logOutButton">
                    <Link to="/"><Button variant="primary" onClick={()=> {this.logOut()} }>Log Out</Button></Link>
                    </div>
                </div><hr />
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-3 offset-3"><h4>{this.props.name}</h4></div>
                        <div className="col-3"><h4>{this.props.Rate}</h4></div>
                        <div className="col-3"><h4>{this.props.Stock}</h4></div>
                    </div>
                </div><hr />
                {
                    movies.length ?
                    movies.map(post => 
                    <div key={post._id}>
                    <div className="container-fluid">
                        <div className="row">
                        <div className="col-4 offset-3">{post.title}</div>
                        <div className="col-2">{post.dailyRentalRate}$</div>
                        <div className="col-3">{post.numberInStock}</div> 
                        </div>
                    </div>
                    </div>) :
                    null
                } 
                </div>
            );
    }
}


export default Customer;