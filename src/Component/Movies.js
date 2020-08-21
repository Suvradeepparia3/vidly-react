import React, { Component } from 'react';
import axios from 'axios';
import './Movies.css';

class Customer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            movies: [],
            // loading: false
        }
    }
    componentDidMount() {
        axios.get('https://vidly-unique.herokuapp.com/api/movies')
        .then( response => {
            console.log(response)
            this.setState({movies: response.data, loading: true})
        })
        .catch( error => {
            console.log(error)
        })
    }

    render(){
        const { movies } = this.state
        
            return (
                <div>
                <h1 className="cust-list">{this.props.title}</h1><hr />
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