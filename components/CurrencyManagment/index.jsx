import { Button } from '@components';

import styles from './style.module.scss';

const CurrencyManagement = ({ currency, toggle }) => (
  <div className={styles['currency-settings']}>
    <h3 className={styles['currency-settings_name']}>{currency.name}</h3>

    {currency.started ? (
      <Button className={styles['currency-settings_btn--stop']} onClick={() => toggle(false)}>
        Приостановить
      </Button>
    ) : (
      <Button className={styles['currency-settings_btn--start']} onClick={() => toggle(true)}>
        Возобновить
      </Button>
    )}
  </div>
);

export { CurrencyManagement };
