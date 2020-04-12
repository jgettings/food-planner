import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import { clear as clearLocalStorage } from 'redux-localstorage-simple';
import DialogTransition from '../DialogTransition';
import EmailForm from './EmailForm';
import ConfirmationAlert from './ConfirmationAlert';


const SettingsDialog = ({
  open,
  close,
  clearProfile,
}) => {
  const [showResetConfirmation, setShowResetConfirmation] = useState(false);

  const resetSettings = () => {
    setShowResetConfirmation(false);
    clearProfile();
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
          <EmailForm />
        </DialogContent>
        <DialogActions>
          <Button
            alt="Reset Settings"
            className="reset-button"
            onClick={() => setShowResetConfirmation(true)}
          >
            Reset All
          </Button>
          <Button
            alt="Close settings dialog"
            onClick={close}
            color="primary"
            className="close-button"
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
      <ConfirmationAlert
        open={showResetConfirmation}
        onConfirm={resetSettings}
        onCancel={() => setShowResetConfirmation(false)}
      />
    </div>
  );
};

SettingsDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  clearProfile: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  clearProfile: () => {
    dispatch({ type: 'CLEAR_USER_PROFILE' });
    clearLocalStorage({ namespace: 'food_planner' });
  },
});

export default connect(null, mapDispatchToProps)(SettingsDialog);
