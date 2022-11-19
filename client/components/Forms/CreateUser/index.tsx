import type { FC } from 'react';
import type { IUser } from '../../../types/user';
import type { CreateUserProps } from './index.types';

import { useFormik } from 'formik';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';

import { Loader } from '../../';

import styles from './style.module.scss';
import { toClassName } from '../../../utils';

type FormKeys = 'login' | 'password' | 'confirmPassword';

const CreateUser: FC<CreateUserProps> = ({
  isLoading = false,
  onSubmit = () => {},
}) => {
  const formik = useFormik({
    initialValues: {
      login: '',
      password: '',
      confirmPassword: '',
    },
    validate: (data) => {
      const errors: { [key in FormKeys]?: string } = {};

      if (!data.login) errors.login = 'Enter login';
      if (!data.password) errors.password = 'Enter password';
      if (!data.confirmPassword || data.password !== data.confirmPassword)
        errors.confirmPassword = 'Passwords do not match';

      return errors;
    },
    onSubmit: (data) => {
      onSubmit({ login: data.login, password: data.password } as IUser);
    },
  });

  const isFormFieldValid = (name: FormKeys) =>
    !!(formik.touched[name] && formik.errors[name]);

  return (
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
            htmlFor="login"
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
      <div className={styles.form_field}>
        <span className="p-float-label">
          <Password
            id="confirmPassword"
            name="confirmPassword"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            toggleMask
            feedback={false}
            inputClassName={toClassName(
              styles.form_field_input,
              isFormFieldValid('confirmPassword') && styles.form_field__error,
            )}
            className={styles.form_field_input}
          />
          <label
            htmlFor="confirmPassword"
            className={toClassName(
              isFormFieldValid('confirmPassword') && styles.form_field__error,
            )}
          >
            Confirm password*
          </label>
        </span>
        {!isFormFieldValid('confirmPassword') && (
          <span className={styles.form_field__error}>
            {formik.errors.confirmPassword}
          </span>
        )}
      </div>
      <Button label="Create" type="submit" />
    </form>
  );
};

export { CreateUser };
