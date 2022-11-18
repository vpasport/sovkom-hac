import NextNProgress from 'nextjs-progressbar';

import { NotificationContextProvider } from '@contexts';

import '@styles/globals.css';
import '@styles/globals.scss';

function MyApp({ Component, pageProps }) {
  return (
    <NotificationContextProvider>
      <NextNProgress />
      <Component {...pageProps} />
    </NotificationContextProvider>
  );
}

export default MyApp;
