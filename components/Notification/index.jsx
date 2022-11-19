import React from 'react';
import PropTypes from 'prop-types';
import * as notificationTypes from './Types';

const Notification = ({ type = 'standart', ...props }) =>
  React.createElement(notificationTypes[type], props);

Notification.propTypes = {
  type: PropTypes.oneOf(Object.keys(notificationTypes)).isRequired,
  header: PropTypes.string,
  description: PropTypes.string,
  onClick: PropTypes.func,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
};

export { Notification };
