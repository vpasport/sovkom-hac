import { memo, useCallback } from 'react';

import { Button } from 'primereact/button';

import { toClassName } from '@utils';
import styles from './style.module.scss';

const Account = memo(
  ({
    id = '',
    number = '',
    currency = '',
    value = 0,
    onClick = () => {},
    onDelete = () => {},
    withDeposit = false,
    onDeposit = () => {},
    withButtons = true,
    disableHover = false,
  }) => {
    const onDeleteButton = useCallback(
      (e) => {
        e.preventDefault();
        e.stopPropagation();
        onDelete(id);
      },
      [onDelete],
    );

    const onDepositButton = useCallback(
      (e) => {
        e.preventDefault();
        e.stopPropagation();
        onDeposit();
      },
      [onDeposit],
    );

    return (
      <div
        className={toClassName(styles.account, disableHover && styles['account_not-hover'])}
        onClick={() => onClick(id)}
      >
        <div className={styles['account-content']}>
          <span className={styles['account-content-number']}>Номер: {number}</span>
          <span className={styles['account-content-value']}>
            {currency} {value}
          </span>
        </div>
        {withButtons && (
          <div className={styles['account-buttons']}>
            {withDeposit && (
              <Button
                icon="pi pi-wallet"
                className="p-button-rounded p-button-info"
                aria-label="Пополнить"
                onClick={onDepositButton}
              />
            )}
            <Button
              icon="pi pi-times"
              className="p-button-rounded p-button-danger"
              aria-label="Удалить"
              onClick={onDeleteButton}
            />
          </div>
        )}
      </div>
    );
  },
);

export { Account };
