import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import KitchenIcon from '@material-ui/icons/Kitchen';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  barIcon: {
    marginRight: theme.spacing(1),
  },
}));

export default () => {
  const classes = useStyles();

  return (
    <AppBar position="static">
      <Toolbar>
        <KitchenIcon className={classes.barIcon} />
        <Typography variant="h6">
          Plan Some Foods
        </Typography>
      </Toolbar>
    </AppBar>
  );
};
