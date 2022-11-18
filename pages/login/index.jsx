import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';

import { Button, Forms, Svg } from '@components';
import * as UsetService from '@api/user';

import { toClassName } from '@utils/toClassName';
import styles from './style.module.scss';

const LoginPage = () => {
  const [signup, setSignup] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const onLogin = useCallback((data) => {
    setLoading(true);
    UsetService.signIn(data)
      .then((res) => console.log(res))
      .finally(() => setLoading(false));
  }, []);

  const onSignup = useCallback((data) => {}, []);

  return (
    <div className={toClassName(styles.root, signup && styles.root_signup)}>
      <Svg
        type="loginicon"
        className={toClassName(styles.icon, signup && styles.icon_mini)}
      />
      {signup ? (
        <Forms.SignUpForm
          onSubmit={(data) => onSignup(data)}
          onCancel={() => setSignup(false)}
          loading={loading}
        />
      ) : (
        <>
          <Forms.LoginForm
            onSubmit={(data) => onLogin(data)}
            loading={loading}
          />
          <Button type="text" onClick={() => setSignup(true)}>
            Зарегистрироваться
          </Button>
        </>
      )}
    </div>
  );
};

export default LoginPage;
