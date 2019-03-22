import React from 'react';
import { Navbar } from 'react-bootstrap';
import ImportForm from './import';

const FoodNav = () => (
  <Navbar expand="lg" variant="dark" bg="primary">
    <img
      src="chompy.gif"
      alt="chomp chomp chomp"
      style={{ height: 50, float: 'left', marginRight: 10 }}
    />

    <Navbar.Brand>
      <a href="#home">Om Nom Nom Nom...</a>
    </Navbar.Brand>

    <Navbar.Toggle aria-controls="basic-navbar-nav" />

    <Navbar.Collapse id="basic-navbar-nav">
      <ImportForm />
    </Navbar.Collapse>
  </Navbar>
);

export default FoodNav;
