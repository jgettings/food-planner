import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import FoodNav from './Navbar';
import Calendar from './calendar';
import ShoppingList from './shoppingList';

const App = () => (
  <div>
    <FoodNav />
    <Calendar />
    <Grid fluid style={{ marginTop: 20 }}>
      <Row>
        <Col md={6}>
          <ShoppingList />
        </Col>
      </Row>
    </Grid>
  </div>
);

export default App;
