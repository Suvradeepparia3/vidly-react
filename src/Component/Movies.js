import React, { Component } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import { Button } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import './Movies.css';

class Customer extends Component {
    constructor(props) {
        super(props);
        const token = localStorage.getItem("x-auth-token")

        let loggedIn = true
        let loading = true
        if(token == null){
            loggedIn = false
        }

        this.state = {
            movies: [],
            loggedIn,
            loading
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
        }
    }

    logOut(){
        localStorage.removeItem("x-auth-token")
    }

    render(){
        const { movies, loading } = this.state
        if(this.state.loggedIn === false){
            return <Redirect to="/" />
         }
            return (
                <div className="container-fluid">
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
                    <div className="row">
                    <div className="col-4 tb-header"><th>{this.props.name}</th></div>
                    <div className="col-3 tb-header"><th>{this.props.type}</th></div>
                    <div className="col-3 tb-header"><th>{this.props.rate}</th></div>
                    <div className="col-2 tb-header"><th>{this.props.stock}</th></div>
                    </div>
                    </tr>
                </thead>
                </Table>
                {loading ? <div id="loading"><h4>Loading...</h4></div> : <div>
                {
                movies.length ?
                movies.map(post => 
                <div key={post._id}>
                    <div className="box">
                    <div className="row">
                    <div className="col-4 col-style pd-l">{post.title}</div>
                    <div className="col-4 col-style pd-l">{post.genre.name}</div> 
                    <div className="col-2 col-style">{post.dailyRentalRate}$</div>
                    <div className="col-2 col-style pd-l">{post.numberInStock}</div> 
                    </div>
                    </div>
                </div>) :
                null
                } 
               </div>
                } 
              </div>
            </div>
            );
    }
}


export default Customer;