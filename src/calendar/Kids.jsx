import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Badge } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChild } from '@fortawesome/free-solid-svg-icons';
import config from '../config.json';


// todo pull from a calendar - more details and more customizations
// For now this is just hard-coded for Wednesdays and keyed off of a start date in the config!
// This could also extend to display more events from a calendar, not just kids

const Kids = ({ date }) => {
  const wednesday = 3;
  const friday = 5;
  const saturday = 6;

  const keyWeek = config.calendar.kidWeekKey;
  const checkWeek = moment(date).week();
  const checkDay = moment(date).day();
  const kidWeekend = keyWeek % 2 === checkWeek % 2;
  const haveKids = checkDay === wednesday
    || (kidWeekend && (checkDay === friday || checkDay === saturday));

  if (!haveKids) {
    return <div />;
  }

  return (
    <div
      style={{
        position: 'absolute',
        bottom: 0,
        right: 0,
        margin: 5,
      }}
    >
      <Badge style={{ backgroundColor: 'greenyellow', color: 'black' }}>
        <FontAwesomeIcon icon={faChild} />
      </Badge>
    </div>
  );
};

Kids.propTypes = {
  date: PropTypes.string.isRequired,
};


export default Kids;
