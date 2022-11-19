import type { NextPage, NextPageContext } from 'next';

import { useRouter } from 'next/router';
import { Svg } from '../../components';
import { Theme } from '../../helpers';
import { useTheme } from '../../hooks';
import { toClassName } from '../../utils';

import styles from './style.module.scss';

const FourOhFour: NextPage<{}> = () => {
  const { theme } = useTheme();
  const router = useRouter();

  return (
    <div className={styles.container}>
      <div
        className={toClassName(
          styles.root,
          theme === Theme.Dark && styles.root_dark,
        )}
      >
        <h1>404 - Page Not Found</h1>
        <Svg icon="error404" className={styles.icon} />
        <div className={styles.links}>
          <span className={styles.link} onClick={() => router.push('/news')}>
            <b>MAIN PAGE</b>
          </span>
          <span className={styles.link} onClick={() => router.back()}>
            <b>Go back</b>
          </span>
        </div>
      </div>
    </div>
  );
};

export default FourOhFour;
