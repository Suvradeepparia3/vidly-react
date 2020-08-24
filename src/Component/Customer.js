import React, { Component } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import './Customer.css';

class Customer extends Component {
    constructor(props) {
        super(props);
        const token = localStorage.getItem("x-auth-token")

        let loggedIn = true
        if(token == null){
            loggedIn = false
        }

        this.state = {
            posts: [],
            loggedIn
        }
    }
    componentDidMount() {
        const token = localStorage.getItem("x-auth-token")
        if(this.state.loggedIn === true){
        axios.get('https://vidly-unique.herokuapp.com/api/customers', {
            headers: {
                'x-auth-token': `${token}`
            }
        })
        .then( response => {
            console.log(response)
            this.setState({posts: response.data})
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
        const { posts } = this.state
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
                    <div className="col-3 offset-3 name"><h4>{this.props.name}</h4></div>
                    <div className="col-3"><h4>{this.props.phone}</h4></div>
                    <div className="col-3"><h4>{this.props.prime}</h4></div>
                </div>
            </div><hr />
            {
                posts.length ?
                posts.map(post => 
                <div key={post._id}>
                <div className="container-fluid">
                    <div className="row">
                    <div className="col-3 offset-3 name">{post.name}</div>
                    <div className="col-3">{post.phone}</div> 
                    <div className="col-3">{post.isGold}</div>
                    </div>
                </div>
                </div>
                ) :
                null
            }
            </div>
        );
    }
}


export default Customer;