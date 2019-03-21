import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { connect } from 'react-redux';
import { Badge } from 'react-bootstrap';
import convert from 'color-convert';
import classnames from 'classnames';
import weekdays from './weekdays';
import './Day.css';
import Kids from './Kids';

const Day = ({ date, cards }) => {
  const todayStart = moment().hours(0).minutes(0).seconds(0);
  const past = moment(date).isBefore(todayStart);
  const todayEnd = moment().hours(23).minutes(59).seconds(59);
  const current = moment(date).isAfter(todayStart) && moment(date).isBefore(todayEnd);

  const firstCard = cards.find(c => c && c.attachments && c.attachments.length);
  const background = firstCard && firstCard.attachments[0];
  const backgroundColor = firstCard && firstCard.attachments[0].edgeColor;

  const backgroundHSL = convert.hex.hsl(backgroundColor);
  const backgroundLightness = backgroundHSL ? backgroundHSL[2] : 0;
  const color = backgroundLightness > 70 ? 'black' : 'white';

  const empty = !cards.length;


  // todo colors per meal (or maybe only for today?)
  // todo hover for labels (slow cooker, etc) https://atomiks.github.io/tippyjs/

  return (
    <div
      className={classnames({ day: true, current, empty })}
      style={{ backgroundImage: background ? `url(${background.url})` : '' }}
    >
      <div className="container">
        {past && <div className="past-overlay" />}

        <Badge pill className="number" variant="primary">
          <span className="extra">
            {`${weekdays[moment(date).day()]} `}
          </span>
          {moment(date).date()}
        </Badge>

        <div className="card-container">
          {cards.map(c => (
            <a
              key={c.id}
              href={c.url}
              style={{ backgroundColor, color }}
              className="card"
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
  cards: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    attachments: PropTypes.array,
  })).isRequired,
};

const mapStateToProps = (state, props) => ({
  cards: state.plan.cards
    .filter((c) => {
      // Get only the cards that are due on this date
      const testDate = moment(c.due);
      const cardDateStart = moment(props.date).hours(0).minutes(0).seconds(0);
      const cardDateEnd = moment(props.date).hours(23).minutes(59).seconds(59);
      const isShoppingList = c.labels.find(l => l.name === 'Shopping List');
      return testDate >= cardDateStart && testDate <= cardDateEnd && !isShoppingList;
    })
    .sort((a, b) => (moment(a.due).isAfter(b.due))),
});

export default connect(mapStateToProps)(Day);
