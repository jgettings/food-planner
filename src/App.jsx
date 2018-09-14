import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import { Provider } from 'react-redux';
import configureStore from './store';
import FoodNav from './Navbar';
import Calendar from './calendar';
import ShoppingList from './shoppingList';

const App = () => (
  <Provider store={configureStore()}>
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
  </Provider>
);

export default App;
