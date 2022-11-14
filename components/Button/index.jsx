import React from 'react';
import PropTypes from 'prop-types';

import * as buttonTypes from './Types';

const Button = ({ type = 'button', defaulttype = 'button', ...props }) => {
  return React.createElement(buttonTypes[type], {
    ...props,
    type: defaulttype,
  });
};

Button.propTypes = {
  type: PropTypes.oneOf(Object.keys(buttonTypes)),
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.string])
    .isRequired,
  onClick: PropTypes.func,
  rightIcon: PropTypes.func,
  leftIcon: PropTypes.func,
};

export { Button };
