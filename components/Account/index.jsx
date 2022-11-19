import { memo, useCallback } from 'react';

import { Button } from 'primereact/button';

import styles from './style.module.scss';

const Account = memo(
  ({ id = '', number = '', currency = '', value = 0, onClick = () => {}, onDelete = () => {} }) => {
    const onDeleteButton = useCallback(
      (e) => {
        e.preventDefault();
        e.stopPropagation();
        onDelete(id);
      },
      [onDelete],
    );

    return (
      <div className={styles.account} onClick={() => onClick(id)}>
        <div className={styles['account-content']}>
          <span className={styles['account-content-number']}>Номер: {number}</span>
          <span className={styles['account-content-value']}>
            {currency} {value}
          </span>
        </div>
        <div>
          <Button
            icon="pi pi-times"
            className="p-button-rounded p-button-danger"
            aria-label="Удалить"
            onClick={onDeleteButton}
          />
        </div>
      </div>
    );
  },
);

export { Account };
