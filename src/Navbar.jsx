import React from 'react';
import { Navbar } from 'react-bootstrap';
import ImportForm from './importForm';

const FoodNav = () => (
  <Navbar fluid>
    <Navbar.Header>
      <img
        src="chompy.gif"
        alt="chomp chomp chomp"
        style={{ height: 50, float: 'left', marginRight: 10 }}
      />
      <Navbar.Brand>
        <a href="#home">Om Nom Nom Nom...</a>
      </Navbar.Brand>

      <Navbar.Toggle />
    </Navbar.Header>

    <Navbar.Collapse>
      <Navbar.Form pullLeft>
        <ImportForm />
      </Navbar.Form>
    </Navbar.Collapse>
  </Navbar>
);

export default FoodNav;
