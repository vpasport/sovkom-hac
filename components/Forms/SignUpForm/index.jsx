import { useFormik } from 'formik';
import moment from 'moment';

import { Calendar } from 'primereact/calendar';

import { Input, Button, Loader } from '@components';

import { toClassName } from '@utils';
import styles from './style.module.scss';

const SignUpForm = ({ onSubmit = () => {}, onCancel = () => {}, loading = false }) => {
  const formik = useFormik({
    initialValues: {
      login: '',
      password: '',
      passwordRepit: '',
      firstName: '',
      patronymic: '',
      lastName: '',
      email: '',
      date: null,
    },
    validate: (data) => {
      const error = {};

      if (!data.login) {
        error.login = 'Некорректный логин';
      }
      if (!data.firstName) {
        error.firstName = 'Некорректное имя';
      }
      if (!data.patronymic) {
        error.patronymic = 'Некорректное отчество';
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
      if (data.password !== data.passwordRepit) {
        error.password = 'Пароли не совпадают';
        error.passwordRepit = 'Пароли не совпадают';
      }
      if (data.date === null) {
        error.date = 'Введите дату';
      }
      if (moment().diff(moment(data.date), 'years') < 18) {
        error.date = 'Возраст должен быть больше 18 лет';
      }

      return error;
    },
    onSubmit: (data) => onSubmit({ ...data, date: moment(data.date).utcOffset(0, true).format() }),
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
          placeholder="Логин"
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
            formik.errors.firstName && styles['form-input-container-input_error'],
          )}
          typedefault="text"
          placeholder="Имя"
          name="firstName"
          value={formik.values.firstName}
          onChange={formik.handleChange}
          description={formik.errors.firstName}
        />
      </div>
      <div className={styles['form-input-container']}>
        <Input
          className={toClassName(
            styles['form-input-container-input'],
            formik.errors.patronymic && styles['form-input-container-input_error'],
          )}
          typedefault="text"
          placeholder="Отчество"
          name="patronymic"
          value={formik.values.patronymic}
          onChange={formik.handleChange}
          description={formik.errors.patronymic}
        />
      </div>
      <div className={styles['form-input-container']}>
        <Input
          className={toClassName(
            styles['form-input-container-input'],
            formik.errors.lastName && styles['form-input-container-input_error'],
          )}
          typedefault="text"
          placeholder="Фамилия"
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
            formik.errors.lastName && styles['form-input-container-input_error'],
          )}
          typedefault="text"
          placeholder="Фамилия"
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
        <Input
          className={toClassName(
            styles['form-input-container-input'],
            formik.errors.password && styles['form-input-container-input_error'],
          )}
          typedefault="password"
          placeholder="Пароль"
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
            formik.errors.passwordRepit && styles['form-input-container-input_error'],
          )}
          typedefault="password"
          placeholder="Повторите пароль"
          name="passwordRepit"
          value={formik.values.passwordRepit}
          onChange={formik.handleChange}
          description={formik.errors.passwordRepit}
        />
      </div>
      <div className={styles['form-input-container']}>
        <span className="p-float-label">
          <Calendar
            className={toClassName(
              styles['form-input-container-calendar'],
              formik.errors.date && styles['form-input-container-calendar_error'],
            )}
            id="date"
            name="date"
            value={formik.values.date}
            onChange={formik.handleChange}
            dateFormat="dd.mm.yy"
          />
          <label htmlFor="date">Дата рождения</label>
        </span>
        {formik.errors.date && (
          <p className={styles['form-input-container-calendar-description']}>
            {formik.errors.date}
          </p>
        )}
      </div>
      <div className={styles['form-buttons']}>
        <Button defaulttype="submit" className={styles['form-buttons-button']} disabled={loading}>
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
