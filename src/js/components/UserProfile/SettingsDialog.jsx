import React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import DialogTransition from '../DialogTransition';


const SettingsDialog = ({ open, close }) => (
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
        Do the settings!
      </DialogContentText>
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

SettingsDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
};

export default SettingsDialog;
