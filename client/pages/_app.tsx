import '../styles/globals.scss';
import { AppProps } from 'next/app';
import NextNProgress from 'nextjs-progressbar';

import { NotificationContextProvider } from '../contexts';

import 'primereact/resources/themes/lara-light-indigo/theme.css'; //theme
import 'primereact/resources/primereact.min.css'; //core css
import 'primeicons/primeicons.css'; //icons

import { ThemeContextProvider } from '../helpers';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NotificationContextProvider>
      <ThemeContextProvider>
        <NextNProgress />
        <Component {...pageProps} />
      </ThemeContextProvider>
    </NotificationContextProvider>
  );
}

export default MyApp;
