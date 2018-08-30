import React from 'react';
import moment from 'moment';
import Day from './Day';


const Grid = () => {
  const labels = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const today = moment();
  const start = 0 - today.day(); // last Sunday

  const days = Array(14).fill(0).map((d, i) => (moment().add(start + i, 'days').toISOString()));

  return (
    <div style={{ marginLeft: 25 }}>
      {labels.map(l => (<div style={{ width: '14%', float: 'left', fontWeight: 'bold' }} key={l}>{l}</div>)) }
      {days.map(d => (<Day key={d} date={d} />))}
    </div>
  );
};


export default Grid;
