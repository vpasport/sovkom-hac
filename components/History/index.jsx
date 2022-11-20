import dynamic from 'next/dynamic';
import { memo } from 'react';
import moment from 'moment';

import styles from './style.module.scss';

const Link = dynamic(() => import('next/link').then((mod) => mod.default), {
  ssr: false,
});

const History = memo(
  ({ createAt, fromCurrency, scoreUuid, toCurrency, value, additionalScoreUuid }) => (
    <div className={styles.history}>
      <div className={styles['history-content']}>
        <div className={styles['history-content-uuids']}>
          <span className={styles['history-content-uuids-number']}>Списание: {scoreUuid}</span>
          <span className={styles['history-content-uuids-number']}>
            Пополнение:
            <Link className={styles['history-content-link']} href={`/user/account/${scoreUuid}`}>
              {' '}
              {additionalScoreUuid}
            </Link>
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
  ),
);

export { History };
