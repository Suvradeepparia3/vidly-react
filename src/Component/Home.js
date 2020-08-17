import React, { Component } from 'react';
import { Navbar,Form,Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Home.css';

class Home extends Component {
    render(){
        const currentDate = new Date().toDateString();
        return (
            <Navbar bg="primary" variant="dark">
            <p className="brand">Movie-Shop</p>
            <Nav className="mr-auto">
            <Link to="/Dashboard" className="link">Dashboard</Link>
            <Link to="/Movies" className="link">Movies</Link>
            <Link to="/Customer" className="link">Customer</Link>
            </Nav>
            <Form className="time">
            {currentDate}
            </Form>
            </Navbar>
        )
    }
}

export default Home