import { useFormik } from 'formik';

import { Input, Button, Loader } from '@components';

import { toClassName } from '@utils/toClassName';
import styles from './style.module.scss';

const LoginForm = ({ onSubmit = () => {}, loading = false }) => {
  const formik = useFormik({
    initialValues: {
      login: '',
      password: '',
    },
    validate: (data) => {
      const errors = {};

      if (!data.login) {
        errors.login = 'Некорректный логин';
      }
      if (!data.login) {
        errors.password = 'Некорректный пароль';
      }

      return errors;
    },
    onSubmit,
  });

  return (
    <form
      className={styles.form}
      onSubmit={(e) => {
        formik.handleSubmit();
        e.preventDefault();
      }}
    >
      {loading && (
        <div className={styles['form-loader-container']}>
          <Loader />
        </div>
      )}
      <div className={styles['form-input-container']}>
        <Input
          className={toClassName(styles['form-input-container-input'])}
          typedefault="text"
          placeholder="login"
          name="login"
          value={formik.values.login}
          onChange={formik.handleChange}
          description={formik.errors.login}
        />
      </div>
      <div className={styles['form-input-container']}>
        <Input
          className={toClassName(styles['form-input-container-input'])}
          typedefault="password"
          placeholder="password"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          description={formik.errors.password}
        />
      </div>
      <Button defaulttype="submit" className={styles['form-button']} disabled={loading}>
        Авторизоваться
      </Button>
    </form>
  );
};

export { LoginForm };
