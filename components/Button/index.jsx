import React from 'react';
import PropTypes from 'prop-types';

import * as buttonTypes from './Types';

const Button = ({ type, defaulttype, ...props }) =>
  React.createElement(buttonTypes[type], {
    ...props,
    type: defaulttype,
  });

Button.defaultProps = {
  type: 'button',
  defaulttype: 'button',
  onClick: () => {},
  rightIcon: () => null,
  leftIcon: () => null,
};

Button.propTypes = {
  type: PropTypes.oneOf(Object.keys(buttonTypes)),
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.string]).isRequired,
  onClick: PropTypes.func,
  defaulttype: PropTypes.string,
  rightIcon: PropTypes.func,
  leftIcon: PropTypes.func,
};

export { Button };
