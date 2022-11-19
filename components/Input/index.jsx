import React from 'react';
import PropTypes from 'prop-types';

import * as inputTypes from './Types';

const Input = ({ type, typedefault, ...props }) =>
  React.createElement(inputTypes[type], {
    ...props,
    type: typedefault,
  });

Input.defaultProps = {
  type: 'input',
  defaulttype: 'text',
  value: '',
  onChange: () => {},
  onClick: () => {},
  rightIcon: () => null,
  leftIcon: () => null,
};

Input.propTypes = {
  type: PropTypes.oneOf(Object.keys(inputTypes)),
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool, PropTypes.array]),
  onChange: PropTypes.func,
  defaulttype: PropTypes.string,
  onClick: PropTypes.func,
  rightIcon: PropTypes.func,
  leftIcon: PropTypes.func,
};

export { Input };
