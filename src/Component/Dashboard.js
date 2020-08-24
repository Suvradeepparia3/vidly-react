import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';
import './Dashboard.css';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        const token = localStorage.getItem("x-auth-token")

        let loggedIn = true
        if(token == null){
            loggedIn = false
        }

        this.state = {
            rental: [],
            loggedIn
        }
    }
    componentDidMount() {
        const token = localStorage.getItem("x-auth-token")
        if(this.state.loggedIn === true){
        axios.get('https://vidly-unique.herokuapp.com/api/rentals', {
            headers: {
                'x-auth-token': `${token}`
            }
        })
        .then( response => {
            console.log(response)
            this.setState({rental: response.data})
           
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
        const { rental } = this.state
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
                rental.length ?
                rental.map(post => 
                <div key={post._id}>
                <div className="container-fluid">
                    <div className="row">
                    <div className="col-3 offset-3 name">{post.customer.name}</div>
                    <div className="col-3">anything</div> 
                    <div className="col-3">is possible</div>
                    </div>
                </div>
                </div>) :
                null
            }

            
            </div>
        );
    }
}


export default Dashboard;