import { toClassName } from '@utils/toClassName';
import styles from './style.module.scss';

const BorderButon = ({
  onClick = () => {},
  className = '',
  children = null,
  leftIcon: LeftIcon = null,
  rightIcon: RightIcon = null,
  ...props
}) => (
  <button onClick={onClick} className={toClassName(styles.button, className)} {...props}>
    {!!LeftIcon && <LeftIcon />}
    {!!children && children}
    {!!RightIcon && <RightIcon />}
  </button>
);

export { BorderButon };
