import React from "react";
import { Link } from "react-router-dom";
import {
  ROOT, MAKE_APPOINTMENT, OUR_TEAM, CONTACT_US
} from "navigation/CONSTANTS";
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import '../App.css'

export const NavigationBar = () => {
  return (
    <>
      <Navbar className="mb-4" collapseOnSelect expand="md" variant="dark" bg="dark"
      >
        <Container >
          <Navbar.Brand as={Link} to={ROOT}>ABC Company</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto" >
              <Nav.Link as={Link} to={ROOT}>Home</Nav.Link>
              <Nav.Link as={Link} to={MAKE_APPOINTMENT}>Book Online</Nav.Link>
              <Nav.Link as={Link} to={OUR_TEAM}>Our Team</Nav.Link>
              <Nav.Link as={Link} to={CONTACT_US}>Contact Us</Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link href="#deets">
                Logout
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};
