import { toClassName } from '@utils';
import styles from './style.module.scss';

const SwitchInput = ({ value, text, onChange = () => {}, ...props }) => (
  <label
    className={toClassName(
      styles.switch,
      props.disabled && styles['switch-disabled'],
    )}
  >
    <p className={styles.switch_text}>{text}</p>
    <input type="checkbox" checked={value} onChange={onChange} />
    <span className={toClassName(styles.slider, styles.round)} />
  </label>
);

export { SwitchInput };
