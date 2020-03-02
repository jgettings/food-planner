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
import localStorage from 'local-storage';
import DialogTransition from '../DialogTransition';
import ConfirmationAlert from './ConfirmationAlert';

// TODO Break user email form into a separate component

const SettingsDialog = ({ open, close }) => {
  const savedUserEmail = localStorage.get('user.email') || '';
  const [userEmail, setUserEmail] = useState(savedUserEmail);
  const [showResetConfirmation, setShowResetConfirmation] = useState(false);
  const [userEmailDirty, setUserEmailDirty] = useState(false);

  const updateUserEmailField = (value) => {
    setUserEmail(value);
    setUserEmailDirty(value !== savedUserEmail);
  };

  const saveUserEmail = (event) => {
    event.preventDefault();
    localStorage.set('user.email', userEmail);
    return false;
  };

  const resetSettings = () => {
    setShowResetConfirmation(false);
    localStorage.clear();
    setUserEmail('');
    setUserEmailDirty(false);
  };

  return (
    <div>
      <Dialog
        id="user-settings-dialog"
        open={open}
        TransitionComponent={DialogTransition}
        keepMounted
        fullScreen
        onClose={close}
        aria-labelledby="user-settings-dialog-title"
        aria-describedby="user-settings-dialog-description"
      >
        <DialogTitle id="user-settings-dialog-title">User Settings</DialogTitle>
        <DialogContent>
          <DialogContentText id="user-settings-dialog-description">
            Currently we&apos;re just using localstorage to store your email address so that
            we can resolve your `gravatar` information, if applicable.
          </DialogContentText>
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
        </DialogContent>
        <DialogActions>
          <Button
            alt="Reset Settings"
            className="reset-button"
            onClick={() => setShowResetConfirmation(true)}
          >
            Reset
          </Button>
          <Button
            alt="Close settings dialog"
            onClick={close}
            color="secondary"
            className="close-button"
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
      <ConfirmationAlert
        open={showResetConfirmation}
        reset={resetSettings}
        cancel={() => setShowResetConfirmation(false)}
      />
    </div>
  );
};

SettingsDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
};

export default SettingsDialog;
