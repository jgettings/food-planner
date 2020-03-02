import React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';

const ConfirmationAlert = ({ open, cancel, reset }) => (
  <Dialog
    id="user-settings-confirmation-alert"
    open={open}
    keepMounted
    aria-labelledby="user-settings-confirmation-alert-title"
    aria-describedby="user-settings-confirmation-alert-description"
  >
    <DialogTitle id="user-settings-confirmation-alert-title">Are you sure?</DialogTitle>
    <DialogContent>
      <DialogContentText id="user-settings-confirmation-alert-description">
        Are you sure that you want to reset your user settings?
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button
        alt="Reset user settings"
        className="reset-button"
        color="primary"
        onClick={reset}
        autoFocus
      >
        Reset Settings
      </Button>
      <Button
        alt="Cancel settings reset"
        onClick={cancel}
        color="secondary"
        className="close-button"
      >
        Cancel
      </Button>
    </DialogActions>
  </Dialog>
);

ConfirmationAlert.propTypes = {
  open: PropTypes.bool.isRequired,
  cancel: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
};

export default ConfirmationAlert;
