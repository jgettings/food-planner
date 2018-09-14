import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// Need to abstract out trello calls before this test will work
xit('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});
