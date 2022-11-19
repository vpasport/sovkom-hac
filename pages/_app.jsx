import NextNProgress from 'nextjs-progressbar';

import { NotificationContextProvider } from '@contexts';
import { Header } from '@components';

import '@styles/globals.css';
import '@styles/globals.scss';
import styles from '@styles/main.module.scss';

function MyApp({ Component, pageProps }) {
  return (
    <NotificationContextProvider>
      <NextNProgress />
      <div className={styles.root}>
        <Header />
        <div className={styles.content}>
          <Component {...pageProps} />
        </div>
      </div>
    </NotificationContextProvider>
  );
}

export default MyApp;
