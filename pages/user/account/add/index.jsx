import { useRouter } from 'next/router';

import { useMemo, useState, useCallback, useEffect } from 'react';
import { useFormik } from 'formik';

import { Button, Input, Loader, Chart } from '@components';
import { checkUser } from '@middlewares';
import { useNotifications } from '@hooks';
import * as CurrencyService from '@api/currency';
import * as UserService from '@api/user';

import styles from './style.module.scss';

const AddAccount = ({ currency = [] }) => {
  const router = useRouter();
  const { pushNotifications } = useNotifications();

  const items = useMemo(
    () => currency.map((el) => ({ value: el.currency, label: el.currency })),
    [currency],
  );

  const [loading, setLoading] = useState(false);
  const [stat, setStat] = useState(null);

  const formik = useFormik({
    initialValues: {
      currency: null,
    },
    validate: (data) => {
      const error = {};

      if (!data.currency) {
        error.currency = 'Выберите валюту';
      }

      return error;
    },
    onSubmit: (data) => {
      setLoading(true);
      UserService.createScoreByUser(data)
        .then(() => router.push('/user'))
        .error((err) => {
          pushNotifications({
            type: 'error',
            header: 'Ошибка',
            description: err.response.data.message,
          });
          console.error(err);
        })
        .finally(() => setLoading(false));
    },
  });

  const onCurrencyChange = useCallback(({ value }) => formik.setFieldValue('currency', value), []);
  const onBack = useCallback(() => router.back(), []);

  useEffect(() => {
    if (formik.values.currency) {
      CurrencyService.getRateWithTimes({ base: formik.values.currency })
        .then((res) => setStat(res.data))
        .catch((err) => console.error(err));
    }
  }, [formik.values.currency]);

  return (
    <div className={styles['add-account']}>
      <div className={styles['add-account-container']}>
        <h2>Добавить счет</h2>
        <Chart data={stat} />
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

export const getServerSideProps = (ctx) =>
  checkUser(
    ctx,
    async ({ user }) => {
      try {
        const currency = await (await CurrencyService.getAvailable()).data;

        return {
          props: {
            user,
            currency: currency.filter((el) => !el.banned),
          },
        };
      } catch (e) {
        console.error(e);
        return {
          redirect: {
            destination: '/user',
            permanent: true,
          },
        };
      }
    },
    { redirectToLogin: true },
  );

export default AddAccount;
