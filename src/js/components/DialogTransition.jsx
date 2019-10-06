import React from 'react';
import Slide from '@material-ui/core/Slide';

const Transition = React.forwardRef((props, ref) => <Slide direction="left" ref={ref} {...props} />); // eslint-disable-line react/jsx-props-no-spreading

export default Transition;
