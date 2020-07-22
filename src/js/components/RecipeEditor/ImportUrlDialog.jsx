import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import DialogTransition from '../DialogTransition';

const ImportUrlDialog = ({ open, cancel, next }) => {
  const [url, setUrl] = useState();

  return (
    <Dialog
      open={open}
      TransitionComponent={DialogTransition}
      keepMounted
      fullScreen
      onClose={() => cancel()}
      aria-labelledby="import-url-dialog-title"
      aria-describedby="import-url-dialog-description"
    >
      <DialogTitle id="import-url-dialog-title">Recipe URL</DialogTitle>
      <DialogContent>
        <DialogContentText id="import-url-dialog-description">
          Enter the url for the recipe that you would like to add.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="url"
          label="Recipe URL"
          type="url"
          fullWidth
          onChange={(event) => { setUrl(event.target.value); }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => cancel()} color="secondary">Cancel</Button>
        <Button onClick={() => next(url)} color="primary">Next</Button>
      </DialogActions>
    </Dialog>
  );
};

ImportUrlDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  cancel: PropTypes.func.isRequired,
  next: PropTypes.func.isRequired,
};

export default ImportUrlDialog;
