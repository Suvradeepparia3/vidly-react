import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';
import './Dashboard.css';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        const token = localStorage.getItem("x-auth-token")

        let loggedIn = true
        let loading = true
        if(token == null){
            loggedIn = false
        }

        this.state = {
            rental: [],
            loggedIn,
            loading
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
            this.setState({loading: false, rental: response.data})
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
        const { rental, loading } = this.state
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
                <div className="container">
              
                <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                    <th>{this.props.name}</th>
                    <th>{this.props.movie}</th>
                    <th>{this.props.date}</th>
                    <th>{this.props.total}</th>
                    </tr>
                </thead>
                </Table>
                {loading ? <div id="loading">Loading...</div> : <div>
                {
                rental.length ?
                rental.map(post => 
                <div key={post._id}>
                    <div className="box">
                    <div className="row">
                    <div className="col-3 col-style name">{post.customer.name}</div>
                    <div className="col-5 col-style">{post.movie.title}---({post.movie.dailyRentalRate}$)</div> 
                    <div className="col-2 col-style">{post.dateOut.slice(0, 10)}</div>
                    <div className="col-2 col-style">{}</div> 
                    </div>
                    </div>
                </div>) :
                null
                } 
               </div>
                } 
              </div>
            
                {/* <div className="container-fluid">
                <div className="row">
                    <div className="col-2 offset-2 name"><h4>{this.props.name}</h4></div>
                    <div className="col-3"><h4>{this.props.movie}</h4></div>
                    <div className="col-2"><h4>{this.props.date}</h4></div>
                    <div className="col-2"><h4>{this.props.total}</h4></div>
                </div>
            </div><hr /> */}
            {/* {
                rental.length ?
                rental.map(post => 
                <div key={post._id}>
                <div className="container-fluid">
                    <div className="row">
                    <div className="col-2 offset-2 name">{post.customer.name}</div>
                    <div className="col-3">{post.movie.title}---({post.movie.dailyRentalRate}$)</div> 
                    <div className="col-2">{post.dateOut.slice(0, 10)}</div>
                    <div className="col-2">{}</div> </div>
                </div>
                </div>) :
                null
            } */}


            </div>
        );
    }
}


export default Dashboard;