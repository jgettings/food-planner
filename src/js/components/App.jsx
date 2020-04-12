import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider, makeStyles } from '@material-ui/styles';
import { Provider } from 'react-redux';
import { hot } from 'react-hot-loader/root';
import theme from '../theme';
import configureStore from '../configure-store';
import AppBar from './AppBar';
import Calendar from './Calendar';
import RecipeEditor from './RecipeEditor';

const useStyles = makeStyles(() => ({
  root: {
    position: 'relative',
    height: '100vh',
  },
}));

const App = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Provider store={configureStore()}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <AppBar />
          <Calendar />
          <RecipeEditor />
        </ThemeProvider>
      </Provider>
    </div>
  );
};

export default hot(App);
