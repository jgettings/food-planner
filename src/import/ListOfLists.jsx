import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import ListForm from './ListForm';

class ListOfLists extends Component {//= ({ title, children, controlId }) => (
  constructor(props) {
    super(props);

    this.state = {
      children: props.children,
    };

    this.addList = this.addList.bind(this);
    this.removeList = this.removeList.bind(this);
  }

  addList() {
    this.setState(prevState => ({
      children: [...prevState.children, { title: '', values: [] }],
    }));
  }

  removeList(idx) {
    this.setState(prevState => ({
      children: prevState.children.filter((value, i) => i !== idx),
    }));
  }

  render() {
    const { title, controlId } = this.props;
    const { children } = this.state;

    return (
      <div>
        <h3>
          {title}
          {' '}
          <Button variant="success" size="sm" onClick={this.addList}>
            Add List
          </Button>
        </h3>
        {children.map((child, i) => (
          <ListForm
            title={child.title}
            values={child.values}
            controlId={`${controlId}-${i}`}
            key={child.title}
            removeFn={() => this.removeList(i)}
          />
        ))}
      </div>
    );
  }
}

ListOfLists.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    values: PropTypes.array,
  })),
  controlId: PropTypes.string.isRequired,
};

ListOfLists.defaultProps = {
  children: [],
};

export default ListOfLists;
