import { useState, useCallback } from 'react';
import { useRouter } from 'next/router';

import { checkUser } from '@middlewares';
import * as CurrencyService from '@api/currency';
import { useNotifications } from '@hooks';

import { v4 as uuidv4 } from 'uuid';

import { Button, CurrencyManagement } from '@components';

import styles from './style.module.scss';

const AdminPage = ({ currency = [] }) => {
  const router = useRouter();
  const { pushNotifications } = useNotifications();

  const [currencies, setCurrencies] = useState(currency);

  const getAvailable = useCallback(() => {
    CurrencyService.getAvailable()
      .then((res) => setCurrencies(res.data))
      .catch((error) => {
        pushNotifications({
          type: 'error',
          header: 'Ошибка',
          description: error.message,
        });
        console.log(error);
      });
  }, []);

  const changeStatus = useCallback((data) => {
    CurrencyService.changeStatus(data)
      .then((res) => {
        pushNotifications({
          type: 'success',
          header: 'Успешно!',
          description: res,
        });
        console.log(res);
      })
      .catch((error) => {
        pushNotifications({
          type: 'error',
          header: 'Ошибка',
          description: error.message,
        });
        console.log(error);
      })
      .finally(() => getAvailable());
  }, []);

  function setValueCurrency(val, item) {
    const data = JSON.parse(JSON.stringify(currencies));
    const updCurrency = data.find((el) => el.currency === item.currency);

    // updCurrency.started = val;
    updCurrency.banned = !val;

    changeStatus(updCurrency);
  }

  return (
    <div className={styles.root}>
      <div className={styles['admin-page']}>
        <div className={styles['admin-page_card']}>
          <h2 className={styles['admin-page_card__title']}>Администратор</h2>
          <Button
            className={styles['admin-page_card__btn-users']}
            type="border"
            onClick={() => router.push('admin/users/')}
          >
            Список пользователей
          </Button>
        </div>
        <div className={styles['admin-page_wrapper']}>
          <h2 className={styles['admin-page_wrapper__title']}>Управление валютами</h2>
          <div className={styles['admin-page_wrapper__currs']}>
            {!!currencies &&
              currencies.map((item) => (
                <CurrencyManagement
                  key={uuidv4()}
                  currency={item}
                  toggle={(val) => setValueCurrency(val, item)}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = (ctx) =>
  checkUser(
    ctx,
    async ({ user }) => {
      if (user === null || user.role !== 'admin') {
        return {
          redirect: {
            destination: '/login',
            permanent: true,
          },
        };
      }

      try {
        const currency = await (await CurrencyService.getAvailable()).data;

        return { props: { currency } };
      } catch (e) {
        console.error(e);
        return { props: { currency: [] } };
      }
    },
    { redirectToLogin: true },
  );

export default AdminPage;
