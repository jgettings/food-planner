import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Email from '@material-ui/icons/Email';
import InputAdornment from '@material-ui/core/InputAdornment';
import DialogTransition from '../DialogTransition';


// Break email form into its own component

const SettingsDialog = ({ open, close }) => {
  const [userEmail, setUserEmail] = useState(''); // get from localstorage or empty

  const doIt = (event) => {
    event.preventDefault();
    console.log(`do ${userEmail}`); // eslint-disable-line no-console
    // setUserEmail('b');
    // update localstorage

    return false;
  };

  return (
    <Dialog
      id="user-settings-dialog"
      open={open}
      TransitionComponent={DialogTransition}
      keepMounted
      fullScreen
      onClose={() => close()}
      aria-labelledby="user-settings-dialog-title"
      aria-describedby="user-settings-dialog-description"
    >
      <DialogTitle id="user-settings-dialog-title">User Settings</DialogTitle>
      <DialogContent>
        <DialogContentText id="user-settings-dialog-description">
          Currently we&apos;re just using localstorage to store your email address so that
          we can resolve your `gravatar` information, if applicable.
        </DialogContentText>
        <form id="user-email-form" onSubmit={doIt}>
          <TextField
            id="user-email"
            label="Email Address"
            type="email"
            name="user-email"
            value={userEmail}
            onChange={(e) => { setUserEmail(e.target.value); }}
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
          <Button type="submit" color="primary" id="update-user-email">
            Update
          </Button>
        </form>
      </DialogContent>
      <DialogActions>
        <Button
          alt="Close settings dialog"
          onClick={() => close()}
          color="secondary"
          className="close-button"
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

SettingsDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
};

export default SettingsDialog;
