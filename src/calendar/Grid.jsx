import React from 'react';
import moment from 'moment';
import Day from './Day';
import weekdays from './weekdays';
import './Grid.css';


const Grid = () => {
  const today = moment();
  const start = 0 - today.day(); // last Sunday

  const days = Array(14).fill(0).map((d, i) => (moment().add(start + i, 'days').toISOString()));

  return (
    <div className="grid">
      {weekdays.map(l => (<div className="calendar-label" key={l}>{l}</div>)) }
      {days.map(d => (<Day key={d} date={d} />))}
    </div>
  );
};


export default Grid;
