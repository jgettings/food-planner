import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { connect } from 'react-redux';
import { Badge } from 'react-bootstrap';
import Kids from './Kids';

const Day = ({ date, cards }) => {
  const todayStart = moment().hours(0).minutes(0).seconds(0);
  const past = moment(date).isBefore(todayStart);
  const todayEnd = moment().hours(23).minutes(59).seconds(59);
  const current = moment(date).isAfter(todayStart) && moment(date).isBefore(todayEnd);

  const firstCard = cards.find(c => c && c.attachments && c.attachments.length);
  const background = firstCard && firstCard.attachments[0];
  const overlayColor = firstCard && firstCard.attachments[0].edgeColor;

  // todo colors per meal (or maybe only for today?)
  // todo hover for labels (slow cooker, etc)

  /* eslint-disable no-nested-ternary */
  return (
    <div
      style={{
        border: current ? '3px greenyellow solid' : '1px gray solid',
        width: '14%',
        float: 'left',
        backgroundImage: background ? `url(${background.url})` : '',
        backgroundSize: 'cover',
      }}
    >
      <div style={{ width: '100%', paddingTop: '100%', position: 'relative' }}>
        {past && (
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: '#9babcc',
              opacity: 0.7,
            }}
          />
        )}

        <div
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            margin: 5,
            fontWeight: 'bold',
          }}
        >
          <Badge>
            {moment(date).date()}
          </Badge>
        </div>
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            height: '85%',
            padding: 5,
            overflow: 'auto',
          }}
        >
          {cards.map(c => (
            <a
              key={c.id}
              href={c.url}
              style={{
                backgroundColor: overlayColor || '#5af6ff',
                color: 'black',
                whiteSpace: 'nowrap',
                borderRadius: 5,
                cursor: 'pointer',
                display: 'block',
                margin: 3,
              }}
              target="_new"
            >
              {c.name}
            </a>
          ))}
        </div>
        <Kids date={date} />
      </div>
    </div>
  );
};

Day.propTypes = {
  date: PropTypes.string.isRequired,
  cards: PropTypes.array.isRequired,
};

const mapStateToProps = (state, props) => ({
  cards: state.trello.list
    .filter((c) => {
      // Get only the cards that are due on this date
      const testDate = moment(c.due);
      const cardDateStart = moment(props.date).hours(0).minutes(0).seconds(0);
      const cardDateEnd = moment(props.date).hours(23).minutes(59).seconds(59);
      return testDate >= cardDateStart && testDate <= cardDateEnd;
    })
    .sort((a, b) => (moment(a.due).isAfter(b.due))),
});

export default connect(mapStateToProps)(Day);
