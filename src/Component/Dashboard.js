import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';


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
                    <div className="col-3 header-component">{this.props.name}</div>
                    <div className="col-5 header-component pd-l">{this.props.movie}</div>
                    <div className="col-2 header-component">{this.props.date}</div>
                    <div className="col-2 header-component">{this.props.total}</div>
                </div>
                </div>
                {loading ? <div id="loading"><h4>Loading...</h4></div> : <div className="data">
                {
                rental.length ?
                rental.map(post => 
                <div key={post._id}>
                    <div className="box">
                    <div className="row">
                    <div className="col-3 col-style pd-l">{post.customer.name} ({post.customer.phone})</div>
                    <div className="col-5 col-style pd-l">{post.movie.title}---({post.movie.dailyRentalRate}$)</div> 
                    <div className="col-2 col-style pd-l">{post.dateOut.slice(0, 10)}</div>
                    <div className="col-2 col-style">{}</div> 
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


export default Dashboard;