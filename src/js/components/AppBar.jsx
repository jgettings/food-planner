import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

export default () => (
  <AppBar position="static">
    <Toolbar>
      <img
        src="public/images/chompy.gif"
        alt="chomp chomp"
        style={{ height: 50, float: 'left', marginRight: 10 }}
      />
      <Typography variant="h6">
        Plan Some Foods
      </Typography>
    </Toolbar>
  </AppBar>
);
