import { memo } from 'react';

import { FiUser } from 'react-icons/fi';

import styles from './style.module.scss';

const UserInfo = memo(
  ({ firstName = '', patronymic = '', lastName = '', login = '', email = '' }) => (
    <div className={styles.info}>
      <div className={styles['info-avatar']}>
        <FiUser className={styles['info-avatar-icon']} />
      </div>
      <div className={styles['info-text']}>
        <div className={styles['info-text-name']}>
          {firstName} {patronymic} {lastName}
        </div>
        <span className={styles['info-text-login']}>
          @{login} ({email})
        </span>
      </div>
    </div>
  ),
);

export { UserInfo };
