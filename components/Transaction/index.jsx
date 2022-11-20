import { Button } from 'primereact/button';

import { Input } from '@components';

import styles from './style.module.scss';

const Transaction = ({
  id,
  from,
  to,
  value,
  loading = false,
  onChange = () => {},
  onTransaction = () => {},
}) => (
  <div className={styles.transaction}>
    <div className={styles['transaction-content']}>
      <span className={styles['transaction-content-number']}>Номер: {id}</span>
      <h3>Перевод</h3>
      <div className={styles['transaction-content-input']}>
        <span className={styles['transaction-content-value']}>
          {from}
          <i className="pi pi-arrow-right" />
          {to}
        </span>
        {!!to && (
          <Input
            value={value}
            onChange={onChange}
            min={0}
            className={styles['transaction-content-input-input']}
          />
        )}
      </div>
    </div>
    <div className={styles['transaction-buttons']}>
      <Button
        icon="pi pi-wallet"
        className="p-button-rounded p-button-info"
        aria-label="Перевсти"
        onClick={onTransaction}
        disabled={loading}
      />
    </div>
  </div>
);

export { Transaction };
