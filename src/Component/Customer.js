import React, { Component } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
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
            customer: [],
            loggedIn,
            loading
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
            this.setState({loading: false, customer: response.data})
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
        const { customer, loading } = this.state
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
                    <div className="col-4 tb-header"><th>{this.props.phone}</th></div>
                    <div className="col-4 tb-header"><th>{this.props.prime}</th></div>
                    </div>
                    </tr>
                </thead>
                </Table>
                {loading ? <div id="loading"><h4>Loading...</h4></div> : <div>
                {
                customer.length ?
                customer.map(post => 
                <div key={post._id}>
                    <div className="box">
                    <div className="row">
                    <div className="col-4 col-style pd-l">{post.name}</div>
                    <div className="col-4 col-style pd-l">{post.phone}</div> 
                    <div className="col-4 col-style pd-l" >
                    { (post.isGold === 'true' &&
                       <p>Gold</p>) || <p>Not Gold</p>
                    }</div>
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