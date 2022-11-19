import { useCallback, useState } from 'react';

import { Button, Forms, Svg } from '@components';
import * as UsetService from '@api/user';

import { toClassName } from '@utils/toClassName';
import styles from './style.module.scss';

const LoginPage = () => {
  const [signup, setSignup] = useState(false);
  const [loading, setLoading] = useState(false);

  const onLogin = useCallback((data) => {
    setLoading(true);
    UsetService.signIn(data)
      .then((res) => console.log(res))
      .finally(() => setLoading(false));
  }, []);

  const onSignup = useCallback((data) => {
    setLoading(true);
    UsetService.signIn(data)
      .then((res) => console.log(res))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className={toClassName(styles.root, signup && styles.root_signup)}>
      <Svg type="loginicon" className={toClassName(styles.icon, signup && styles.icon_mini)} />
      {signup ? (
        <Forms.SignUpForm
          onSubmit={(data) => onSignup(data)}
          onCancel={() => setSignup(false)}
          loading={loading}
        />
      ) : (
        <>
          <Forms.LoginForm onSubmit={(data) => onLogin(data)} loading={loading} />
          <Button type="text" onClick={() => setSignup(true)}>
            Зарегистрироваться
          </Button>
        </>
      )}
    </div>
  );
};

export const getServerSideProps = async ({
  req: {
    headers: { cookie },
  },
}) => {
  try {
    if (cookie) {
      const me = await (await UsetService.getMe(cookie)).data;

      console.log(me);

      return {
        redirect: {
          destination: '/main',
          permanent: true,
        },
      };
    }
  } catch (e) {
    console.error(e);
  }
  return { props: {} };
};

export default LoginPage;
