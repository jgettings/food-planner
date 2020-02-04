import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';
import lightBlue from '@material-ui/core/colors/lightBlue';
import orange from '@material-ui/core/colors/orange';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: lightBlue,
    secondary: orange,
  },
});

export default responsiveFontSizes(theme);
