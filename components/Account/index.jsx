import { memo } from 'react';

import styles from './style.module.scss';

const Account = memo(({ id = '', number = '', currency = '', value = 0, onClick = () => {} }) => (
  <div className={styles.account} onClick={() => onClick(id)}>
    <span className={styles['account-number']}>Номер: {number}</span>
    <span className={styles['account-value']}>
      {currency} {value}
    </span>
  </div>
));

export { Account };
