import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';

import { checkUser } from '@middlewares';
import * as CurrencyService from '@api/currency';
import { useNotifications } from '@hooks';

import { Button, CurrencyManagement, Loader } from '@components';

import styles from './style.module.scss';

const AdminPage = () => {
  const router = useRouter();
  const { pushNotifications } = useNotifications();

  const [loading, setLoading] = useState(false);
  const [currencies, setCurrencies] = useState([
    {
      id: 0,
      name: 'Доллар',
      started: false,
    },
    {
      id: 1,
      name: 'Рубль',
      started: true,
    },
    {
      id: 2,
      name: 'Доллар',
      started: false,
    },
    {
      id: 3,
      name: 'Рубль',
      started: true,
    },
    {
      id: 4,
      name: 'Доллар',
      started: false,
    },
    {
      id: 5,
      name: 'Рубль',
      started: true,
    },
    {
      id: 6,
      name: 'Доллар',
      started: false,
    },
    {
      id: 7,
      name: 'Рубль',
      started: true,
    },
  ]);

  function setValueCurrency(val, item) {
    const data = JSON.parse(JSON.stringify(currencies));
    const updCurrency = data.find((el) => el.id === item.id);

    updCurrency.started = val;

    setCurrencies(data);
  }

  const getAvailable = useCallback(() => {
    setLoading(true);
    CurrencyService.getAvailable()
      .then((res) => setCurrencies(res))
      .catch((error) => {
        pushNotifications({
          type: 'error',
          header: 'Ошибка',
          description: error.message,
        });
        console.log(error);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    getAvailable();
  }, []);

  return (
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
          {loading ? (
            <div className={styles.users_loader}>
              <Loader />
            </div>
          ) : (
            !!currencies &&
            currencies.map((item) => (
              <CurrencyManagement
                key={item.id}
                currency={item}
                toggle={(val) => setValueCurrency(val, item)}
              />
            ))
          )}
        </div>
      </div>
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
            destination: `/${user.role}`,
            permanent: true,
          },
        };
      }

      return { props: {} };
    },
    { redirectToLogin: false },
  );

export default AdminPage;
