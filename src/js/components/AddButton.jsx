import React from 'react';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  fab: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));


export default () => {
  const classes = useStyles();

  return (
    <Fab aria-label="Add New Recipe" className={classes.fab} color="primary">
      <AddIcon />
    </Fab>
  );
};
