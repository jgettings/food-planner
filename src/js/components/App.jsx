import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider, makeStyles } from '@material-ui/styles';
import theme from '../theme';
import AppBar from './AppBar';
import Calendar from './Calendar';
import AddButton from './AddButton';

const useStyles = makeStyles(() => ({
  root: {
    position: 'relative',
    height: '100vh',
  },
}));

export default () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar />
        <Calendar />
        <AddButton />
      </ThemeProvider>
    </div>
  );
};
