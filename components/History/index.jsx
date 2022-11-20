import { useRouter } from 'next/router';
import { memo } from 'react';
import moment from 'moment';

import styles from './style.module.scss';

const History = memo(
  ({ createAt, fromCurrency, scoreUuid, toCurrency, value, additionalScoreUuid }) => {
    const router = useRouter();

    return (
      <div className={styles.history}>
        <div className={styles['history-content']}>
          <div className={styles['history-content-uuids']}>
            <span className={styles['history-content-uuids-number']}>
              Списание:{' '}
              <span
                className={styles['history-content-link']}
                onClick={() => {
                  router.push(`/user/account/${scoreUuid}`);
                  router.reload();
                }}
              >
                {scoreUuid}
              </span>
            </span>
            <span className={styles['history-content-uuids-number']}>
              Пополнение:
              <span
                className={styles['history-content-link']}
                onClick={() => {
                  router.push(`/user/account/${additionalScoreUuid}`);
                  router.reload();
                }}
              >
                {' '}
                {additionalScoreUuid}
              </span>
            </span>
          </div>
          <span className={styles['history-content-value']}>
            {fromCurrency}
            <i className="pi pi-arrow-right" />
            {toCurrency}
          </span>
        </div>
        <div className={styles['history-content-right']}>
          <div className={styles['history-content-right-value']}>
            {value} {fromCurrency}
          </div>
          <div className={styles['history-content-right-date']}>
            {moment(createAt).format('DD.MM.YY HH:mm:ss')}
          </div>
        </div>
      </div>
    );
  },
);

export { History };
