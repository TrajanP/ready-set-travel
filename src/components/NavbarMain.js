//Component is used to display website wide Nav bar.

//Library Imports
import React from 'react';
//Component Imports
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';

export const MainNavbar = () => {
    return ( 
        <Navbar bg="dark" variant="dark" style={{fontSize:"180%"}}>
        <Container>
        <Navbar.Brand href="#home" style={{fontSize:"100%"}}> Trip Planner </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/pages/DashboardPage">My Trips</Nav.Link>
            <Nav.Link href="/pages/NewTrip">New Trip</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    )
  };

export default MainNavbar; 