import React from 'react';
import PropTypes from 'prop-types';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  fab: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));


const AddButton = ({ start }) => {
  const classes = useStyles();

  return (
    <Fab
      aria-label="Add New Recipe"
      className={classes.fab}
      color="primary"
      variant="extended"
      onClick={start}
    >
      <AddIcon className={classes.extendedIcon} />
      Add New Recipe
    </Fab>
  );
};

AddButton.propTypes = {
  start: PropTypes.func.isRequired,
};

export default AddButton;
