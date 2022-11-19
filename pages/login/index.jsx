import { useRouter } from 'next/router';
import { useCallback, useState } from 'react';

import { Button, Forms, Svg } from '@components';
import * as UserService from '@api/user';
import { checkUser } from '@middlewares';
import { useNotifications } from '@hooks';

import { toClassName } from '@utils/toClassName';
import styles from './style.module.scss';

const LoginPage = () => {
  const router = useRouter();
  const { pushNotifications } = useNotifications();

  const [signup, setSignup] = useState(false);
  const [loading, setLoading] = useState(false);

  const onLogin = useCallback((data) => {
    setLoading(true);
    UserService.signIn(data)
      .then((res) => {
        if (res.data.verify === 0) {
          pushNotifications({
            type: 'error',
            header: 'Ошибка',
            description: 'Ваша регистрация не подтверждена',
          });
        } else {
          router.push('/user');
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const onSignup = useCallback((data) => {
    setLoading(true);
    UserService.signIn(data)
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

export const getServerSideProps = (ctx) =>
  checkUser(
    ctx,
    async ({ user }) => {
      if (user !== null) {
        return {
          redirect: {
            destination: '/user',
            permanent: true,
          },
        };
      }

      return { props: {} };
    },
    { redirectToLogin: false },
  );

export default LoginPage;
