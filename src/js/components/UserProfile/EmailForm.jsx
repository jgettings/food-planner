import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Email from '@material-ui/icons/Email';
import Button from '@material-ui/core/Button';
import CheckIcon from '@material-ui/icons/Check';


class EmailForm extends Component {
  static isValidEmailAddress(email) {
    const regex = new RegExp(/^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/i);
    return regex.test(email);
  }

  constructor(props) {
    super(props);

    this.state = {
      currentValue: props.savedUserEmail,
      triedSubmit: false,
    };

    this.updateValue = this.updateValue.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  updateValue(e) {
    e.preventDefault();

    const currentValue = e.target.value;
    this.setState((prevState) => ({
      currentValue,
      triedSubmit: prevState.triedSubmit && !EmailForm.isValidEmailAddress(currentValue),
    }));

    const { setDirty } = this.props;
    setDirty();

    return false;
  }

  submitForm(e) {
    e.preventDefault();

    const { saveUserEmail } = this.props;
    const { currentValue } = this.state;

    if (!EmailForm.isValidEmailAddress(currentValue)) {
      this.setState({ triedSubmit: true });
      return false;
    }

    saveUserEmail(currentValue);

    return false;
  }

  render() {
    const { savedUserEmail, isReset, isSaved } = this.props;
    const { currentValue, triedSubmit } = this.state;

    const edited = currentValue !== savedUserEmail;
    const isValid = EmailForm.isValidEmailAddress(currentValue);
    const updateable = edited && isValid && !isReset;

    const helperText = triedSubmit
      ? 'Please enter a valid email address'
      : 'The email address you use with gravatar';

    return (
      <form id="user-email-form" onSubmit={this.submitForm}>
        <TextField
          id="user-email"
          label="Email Address"
          type="email"
          name="email"
          defaultValue={savedUserEmail}
          onChange={this.updateValue}
          key={isReset}
          variant="outlined"
          fullWidth
          error={triedSubmit}
          helperText={helperText}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Email />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                {updateable && (
                  <Button type="submit" color="primary" id="update-user-email">
                    Update
                  </Button>
                )}
                {isSaved && <CheckIcon id="email-saved" />}
              </InputAdornment>
            ),
          }}
        />
      </form>
    );
  }
}

EmailForm.propTypes = {
  savedUserEmail: PropTypes.string.isRequired,
  saveUserEmail: PropTypes.func.isRequired,
  isReset: PropTypes.bool.isRequired,
  setDirty: PropTypes.func.isRequired,
  isSaved: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  savedUserEmail: state.userProfile.userEmail,
  isReset: state.userProfile.isReset,
  isSaved: state.userProfile.emailIsSaved,
});

const mapDispatchToProps = (dispatch) => ({
  saveUserEmail: (value) => dispatch({ type: 'SAVE_USER_EMAIL', value }),
  setDirty: () => dispatch({ type: 'SET_DIRTY' }),
});

export default connect(mapStateToProps, mapDispatchToProps)(EmailForm);
