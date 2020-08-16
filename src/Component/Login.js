import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios'

class Login extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            posts: []
        }
    }
    
    componentDidMount() {
        axios.get('https://vidly-unique.herokuapp.com/api/users')
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
                <Button variant="success">Log In</Button>
                <h1>User list</h1>
                {
                    posts.length ?
                    posts.map(post => <div key={post.id}> {post.name} </div>) :
                    null
                }
            </div>
        );
    }
}

export default Login;