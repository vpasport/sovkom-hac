import { useRouter } from 'next/router';

import { useMemo, useState, useCallback } from 'react';
import { useFormik } from 'formik';

import { Button, Input, Loader } from '@components';
import { toClassName } from '@utils';
import { currency } from '@mocks/currency';

import styles from './style.module.scss';

const AddAccount = ({ currency = [] }) => {
  const router = useRouter();

  const items = useMemo(() => currency.map((el) => ({ value: el, label: el })), [currency]);

  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      currency: null,
      value: 0,
    },
    validate: (data) => {
      const error = {};

      if (!data.currency) {
        error.currency = 'Выберите валюту';
      }
      if (!data.value && data.value < 0) {
        error.value = 'Введите сумму';
      }

      return error;
    },
    onSubmit: () => {
      setLoading(true);
      setLoading(false);
    },
  });

  const onCurrencyChange = useCallback(({ value }) => formik.setFieldValue('currency', value), []);
  const onBack = useCallback(() => router.back(), []);

  return (
    <div className={styles['add-account']}>
      <div className={styles['add-account-container']}>
        <h2>Добавить счет</h2>
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
              type="dropdown"
              items={items}
              value={formik.values.currency}
              onChange={onCurrencyChange}
              dropdownName="Валюта"
            />
          </div>
          <div className={styles['form-input-container']}>
            <Input
              className={toClassName(styles['form-input-container-input'])}
              typedefault="number"
              min={0}
              name="value"
              value={formik.values.value}
              onChange={formik.handleChange}
              placeholder="Сумма"
              description={formik.errors.value}
            />
          </div>
          <div className={styles['form-buttons']}>
            <Button defaulttype="submit" className={styles['form-button']} disabled={loading}>
              Добавить
            </Button>
            <Button
              type="border"
              defaulttype="submit"
              className={styles['form-button']}
              disabled={loading}
              onClick={onBack}
            >
              Назад
            </Button>
          </div>
        </form>
      </div>
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
      // let me = await (await UserService.getMe(cookie)).data;
      const me = {
        login: 'user',
        firstName: 'Иван',
        patronymic: 'Иванович',
        lastName: 'Иванов',
        email: 'ivanov@mail.com',
      };

      if (me) {
        return {
          props: {
            user: me,
            currency,
          },
        };
      }

      return {
        redirect: {
          destination: '/login',
          permanent: true,
        },
      };
    }
  } catch (e) {
    console.error(e);
  }
  return { props: {} };
};

export default AddAccount;
