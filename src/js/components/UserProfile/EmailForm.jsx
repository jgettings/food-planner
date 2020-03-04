import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Email from '@material-ui/icons/Email';
import Button from '@material-ui/core/Button';


const EmailForm = ({
  userEmail,
  userEmailDirty,
  updateUserEmailField,
  saveUserEmail,
}) => (
  <form id="user-email-form" onSubmit={saveUserEmail}>
    <TextField
      id="user-email"
      label="Email Address"
      type="email"
      name="user-email"
      value={userEmail}
      onChange={(e) => { updateUserEmailField(e.target.value); }}
      required
      helperText="The email address you use with gravatar for a generic profile"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Email />
          </InputAdornment>
        ),
      }}
    />
    <Button type="submit" color="primary" id="update-user-email" disabled={!userEmailDirty}>
      Update
    </Button>
  </form>
);

EmailForm.propTypes = {
  userEmail: PropTypes.string.isRequired,
  userEmailDirty: PropTypes.bool.isRequired,
  updateUserEmailField: PropTypes.func.isRequired,
  saveUserEmail: PropTypes.func.isRequired,
};

export default EmailForm;
