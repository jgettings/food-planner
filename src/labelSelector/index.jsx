import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import loadBoardLabels from './actions';
import Selector from './selector';

class TrelloLabelSelect extends Component {
  constructor() {
    super();

    this.state = { selectedIds: '' };

    this.updateLabels = this.updateLabels.bind(this);
  }

  componentDidMount() {
    const { loadLabels } = this.props;
    loadLabels();
  }

  updateLabels(values) {
    this.setState({
      selectedIds: values.map(label => label.id).join(','),
    });
  }

  render() {
    const { loading, labels } = this.props;
    if (loading) {
      return (<FontAwesomeIcon icon={faSpinner} spin transform="grow-30" />);
    }

    const { selectedIds } = this.state;
    return (
      <div>
        <Selector labels={labels} onChange={this.updateLabels} />
        <input type="hidden" id="idLabels" value={selectedIds} />
      </div>
    );
  }
}

TrelloLabelSelect.propTypes = {
  loading: PropTypes.bool.isRequired,
  loadLabels: PropTypes.func.isRequired,
  labels: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
};

const mapStateToProps = state => ({
  loading: state.trelloBoardLabels.loading,
  labels: state.trelloBoardLabels.list,
});

const mapDispatchToProps = dispatch => ({
  loadLabels: id => dispatch(loadBoardLabels(id)),
});


export default connect(mapStateToProps, mapDispatchToProps)(TrelloLabelSelect);
