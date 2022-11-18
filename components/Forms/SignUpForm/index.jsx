import { useFormik } from 'formik';
import moment from 'moment';

import { Input, Button, Loader, TextEditor } from '@components';
import { useNotifications } from '@hooks';

import { toClassName } from '@utils';
import styles from './style.module.scss';

const SignUpForm = ({
  onSubmit = () => {},
  onCancel = () => {},
  loading = false,
}) => {
  const { pushNotifications } = useNotifications();
  const formik = useFormik({
    initialValues: {
      login: '',
      password: '',
      passwordRepit: '',
      firstName: '',
      lastName: '',
      description: '',
      email: '',
      date: new Date(),
    },
    validate: (data) => {
      const error = {};

      if (!data.login) {
        error.login = 'Некорректный логин';
      }
      if (!data.firstName) {
        error.firstName = 'Некорректное имя';
      }
      if (!data.lastName) {
        error.lastName = 'Некорректная фамилия';
      }
      if (
        !data.email ||
        // eslint-disable-next-line
        !/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          data.email,
        )
      ) {
        error.email = 'Некорректный email';
      }
      if (!data.date || moment(data.date).year() > 2005) {
        pushNotifications({
          type: 'error',
          header: 'Ошибка',
          description: 'Некорректная дата рождения',
        });
        error.date = 'Некорректная дата рождения';
      }
      if (data.password !== data.passwordRepit) {
        error.password = 'Пароли не совпадают';
        error.passwordRepit = 'Пароли не совпадают';
      }

      return error;
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
          className={toClassName(
            styles['form-input-container-input'],
            formik.errors.login && styles['form-input-container-input_error'],
          )}
          typedefault="text"
          placeholder="Login"
          name="login"
          value={formik.values.login}
          onChange={formik.handleChange}
          description={formik.errors.login}
        />
      </div>
      <div className={styles['form-input-container']}>
        <Input
          className={toClassName(
            styles['form-input-container-input'],
            formik.errors.firstName &&
              styles['form-input-container-input_error'],
          )}
          typedefault="text"
          placeholder="First name"
          name="firstName"
          value={formik.values.firstName}
          onChange={formik.handleChange}
          description={formik.errors.lastName}
        />
      </div>
      <div className={styles['form-input-container']}>
        <Input
          className={toClassName(
            styles['form-input-container-input'],
            formik.errors.lastName &&
              styles['form-input-container-input_error'],
          )}
          typedefault="text"
          placeholder="Last name"
          name="lastName"
          value={formik.values.lastName}
          onChange={formik.handleChange}
          description={formik.errors.lastName}
        />
      </div>
      <div className={styles['form-input-container']}>
        <Input
          className={toClassName(
            styles['form-input-container-input'],
            formik.errors.date && styles['form-input-container-input_error'],
          )}
          type="date"
          placeholder="Birth date"
          value={formik.values.date}
          onChange={(e) => formik.setFieldValue('date', e)}
          description={formik.errors.date}
        />
      </div>
      <div className={styles['form-input-container']}>
        <Input
          className={toClassName(
            styles['form-input-container-input'],
            formik.errors.email && styles['form-input-container-input_error'],
          )}
          typedefault="email"
          placeholder="Email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          description={formik.errors.email}
        />
      </div>
      <div className={styles['form-input-container']}>
        <TextEditor
          placeholder="О себе"
          className={styles['form-input-container-editor']}
          onChange={(val) => formik.setFieldValue('description', val)}
        />
      </div>
      <div className={styles['form-input-container']}>
        <Input
          className={toClassName(
            styles['form-input-container-input'],
            formik.errors.password &&
              styles['form-input-container-input_error'],
          )}
          typedefault="password"
          placeholder="Password"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          description={formik.errors.password}
        />
      </div>
      <div className={styles['form-input-container']}>
        <Input
          className={toClassName(
            styles['form-input-container-input'],
            formik.errors.passwordRepit &&
              styles['form-input-container-input_error'],
          )}
          typedefault="password"
          placeholder="Repeat password"
          name="passwordRepit"
          value={formik.values.passwordRepit}
          onChange={formik.handleChange}
          description={formik.errors.passwordRepit}
        />
      </div>
      <div className={styles['form-buttons']}>
        <Button
          defaulttype="submit"
          className={styles['form-buttons-button']}
          disabled={loading}
        >
          Зарегистрироваться
        </Button>
        <Button
          type="text"
          className={styles['form-buttons-button']}
          disabled={loading}
          onClick={(e) => {
            e.preventDefault();
            onCancel();
          }}
        >
          Отмена
        </Button>
      </div>
    </form>
  );
};

export { SignUpForm };
