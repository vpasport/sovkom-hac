import { useRouter } from 'next/router';
import { useCallback } from 'react';

import { Button } from '@components';
import { logout } from '@api/user';

import styles from './style.module.scss';

const Header = () => {
  const router = useRouter();

  const isVisable = /^\/user/gm.test(router.pathname);

  const onLogout = useCallback(() => {
    logout();
    router.reload();
  }, [router]);

  return isVisable ? (
    <div className={styles.header}>
      <Button className={styles['header-logout']} onClick={onLogout}>
        Выйти
      </Button>
    </div>
  ) : null;
};

export { Header };
