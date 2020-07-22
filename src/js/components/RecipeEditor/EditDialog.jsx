import React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';
import DialogTransition from '../DialogTransition';

const EditDialog = ({
  open,
  url,
  cancel,
  next,
}) => (
  <Dialog
    open={open}
    TransitionComponent={DialogTransition}
    keepMounted
    fullScreen
    onClose={() => cancel()}
    aria-labelledby="edit-recipe-dialog-title"
    aria-describedby="edit-recipe-dialog-description"
  >
    <DialogTitle id="edit-recipe-dialog-title">Edit Recipe</DialogTitle>
    <DialogContent>
      <LinearProgress />
      <DialogContentText id="edit-recipe-dialog-description">
        Check out what we imported and make sure it is correct...
        <br />
        {url}
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={() => cancel()} color="secondary">Cancel</Button>
      <Button onClick={() => next()} color="primary">Add</Button>
    </DialogActions>
  </Dialog>
);

EditDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  url: PropTypes.string.isRequired,
  cancel: PropTypes.func.isRequired,
  next: PropTypes.func.isRequired,
};

export default EditDialog;
