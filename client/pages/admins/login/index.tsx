import type { NextPage, GetServerSideProps } from 'next';
import type { IUser } from '../../../types/user';

import { useState } from 'react';
import { useRouter } from 'next/router';

import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { useFormik } from 'formik';

import { Svg, Loader } from '../../../components';
import { toClassName } from '../../../utils';
import * as userApi from '../../../api/user';

import styles from './style.module.scss';

const LoginPage: NextPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>();

  const formik = useFormik({
    initialValues: {
      login: '',
      password: '',
    },
    validate: (data) => {
      const errors: { login?: string; password?: string } = {};

      if (!data.login) errors.login = 'login';
      if (!data.password) errors.password = 'password';

      return errors;
    },
    onSubmit: (data) => {
      setIsLoading(true);
      userApi
        .login(data as IUser)
        .then((res) => router.push('/admins/users'))
        .catch((err) => {
          formik.setFieldError('login', 'login');
          formik.setFieldError('password', 'password');
        })
        .finally(() => setIsLoading(false));
    },
  });

  const isFormFieldValid = (name: 'login' | 'password') =>
    !!(formik.touched[name] && formik.errors[name]);

  return (
    <div className={styles.container}>
      <div className={styles.root}>
        <Svg icon="loginicon" className={toClassName(styles.icon)} />
        <form
          className={styles.form}
          onSubmit={(e) => {
            e.preventDefault();
            formik.handleSubmit();
          }}
        >
          {isLoading && (
            <div className={styles.loader}>
              <Loader />
            </div>
          )}
          <div className={styles.form_field}>
            <span className="p-float-label">
              <InputText
                id="login"
                name="login"
                value={formik.values.login}
                onChange={formik.handleChange}
                autoFocus
                className={toClassName(
                  styles.form_field_input,
                  isFormFieldValid('login') && styles.form_field__error,
                )}
              />
              <label
                htmlFor="name"
                className={toClassName(
                  isFormFieldValid('login') && styles.form_field__error,
                )}
              >
                Login*
              </label>
            </span>
          </div>
          <div className={styles.form_field}>
            <span className="p-float-label">
              <Password
                id="password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                toggleMask
                feedback={false}
                inputClassName={toClassName(
                  styles.form_field_input,
                  isFormFieldValid('password') && styles.form_field__error,
                )}
                className={styles.form_field_input}
              />
              <label
                htmlFor="password"
                className={toClassName(
                  isFormFieldValid('password') && styles.form_field__error,
                )}
              >
                Password*
              </label>
            </span>
            {/* {getFormErrorMessage('password')} */}
          </div>
          <Button label="Login" />
        </form>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  req: {
    headers: { cookie },
  },
}) => {
  try {
    if (cookie && (await userApi.checkAuth(cookie))) {
      return {
        redirect: {
          destination: '/admins/users',
          permanent: true,
        },
      };
    }
    throw new Error('user not authorized');
  } catch {
    return {
      props: {},
    };
  }
};

export default LoginPage;
