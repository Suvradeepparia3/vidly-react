import React, { Component } from 'react';
import axios from 'axios';
import './Customer.css';

class Customer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            posts: []
        }
    }
    componentDidMount() {
        axios.get('https://vidly-unique.herokuapp.com/api/customers')
        .then( response => {
            console.log(response)
            this.setState({posts: response.data})
        })
        .catch( error => {
            console.log(error)
        })
    }

    render() {
        const { posts } = this.state

        return (
            <div>
            <h1 className="cust-list">Customers list</h1><hr />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-3 offset-2"><h4>Name</h4></div>
                    <div className="col-3"><h4>Phone No</h4></div>
                    <div className="col-3"><h4>Prime</h4></div>
                </div>
            </div><hr />
            {
                posts.length ?
                posts.map(post => 
                <div key={post._id}>
                <div className="container-fluid">
                    <div className="row">
                    {/* <div className="col-3">{post._id}</div> */}
                    <div className="col-3 offset-2">{post.name}</div>
                    <div className="col-3">{post.phone}</div>
                    <div className="col-3">{post.isGold}</div> 
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