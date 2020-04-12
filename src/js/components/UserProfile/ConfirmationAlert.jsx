import React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';

const ConfirmationAlert = ({ open, onCancel, onConfirm }) => (
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
        alt="Cancel settings reset"
        onClick={onCancel}
        color="secondary"
        className="close-button"
      >
        Cancel
      </Button>
      <Button
        alt="Reset user settings"
        className="confirm-button"
        color="primary"
        onClick={onConfirm}
        autoFocus
      >
        Reset Settings
      </Button>
    </DialogActions>
  </Dialog>
);

ConfirmationAlert.propTypes = {
  open: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};

export default ConfirmationAlert;
