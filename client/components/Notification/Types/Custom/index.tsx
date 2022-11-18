import type { FC } from 'react';
import type { NotificationProps } from '../../notification.type';

import { toClassName } from '../../../../utils';
import styles from './style.module.scss';

const CustomNotification: FC<NotificationProps> = ({
  onClick = () => {},
  onMouseEnter = () => {},
  onMouseLeave = () => {},
  className = '',
  ...props
}) => {
  return (
    <div
      className={toClassName(styles.notification, className)}
      onClick={(e) => onClick(e)}
      onMouseEnter={(e) => onMouseEnter(e)}
      onMouseLeave={(e) => onMouseLeave(e)}
      {...props}
    ></div>
  );
};

export { CustomNotification };
