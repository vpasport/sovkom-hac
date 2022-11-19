import type { FC } from 'react';
import type { NotificationPropsWithType } from './notification.type';

import React from 'react';
import * as notificationTypes from './Types';

import PropTypes from 'prop-types';

const Notification: FC<NotificationPropsWithType> = ({
  type = 'default',
  ...props
}) => {
  return React.createElement(notificationTypes[type], props);
};

export { Notification };
