import React, { Component } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';


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
                <div className="container list-header">
                    <div className="row">
                    <div className="col-4 header-component">{this.props.name}</div>
                    <div className="col-3 header-component">{this.props.type}</div>
                    <div className="col-3 header-component">{this.props.rate}</div>
                    <div className="col-2 header-component">{this.props.stock}</div>
                    </div>
                </div>
                {loading ? <div id="loading"><h4>Loading...</h4></div>
                : <div className="data">
                {
                movies.length ?
                movies.map(post => 
                <div key={post._id}>
                    <div className="box">
                    <div className="row">
                    <div className="col-4 col-style pd-l"><Button onClick={()=> alert(post._id)}>{post.title}</Button></div>
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