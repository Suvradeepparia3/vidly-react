import React, { Component } from 'react';
import { Navbar,Form,Nav } from 'react-bootstrap'

class Home extends Component {
    render(){
        const currentDate = new Date().toDateString();
        return (
            <Navbar bg="primary" variant="dark">
            <Navbar.Brand >Movie-Shop</Navbar.Brand>
            <Nav className="mr-auto">
            <Nav.Link href="#Dashboard">Dashboard</Nav.Link>
            <Nav.Link href="#Movies">Movies</Nav.Link>
            <Nav.Link href="#Customer">Customer</Nav.Link>
            </Nav>
            <Form className="time">
            {currentDate}
            </Form>
            </Navbar>
        )
    }
}

export default Home