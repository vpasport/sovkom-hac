import { toClassName } from '@utils/toClassName';
import styles from './style.module.scss';

const CustomNotification = ({
  onClick = () => {},
  onMouseEnter = () => {},
  onMouseLeave = () => {},
  className = '',
  ...props
}) => (
  <div
    className={toClassName(styles.notification, className)}
    onClick={(e) => onClick(e)}
    onMouseEnter={(e) => onMouseEnter(e)}
    onMouseLeave={(e) => onMouseLeave(e)}
    {...props}
  />
);

export { CustomNotification };
