import { useRouter } from 'next/router';
import { useCallback } from 'react';

import moment from 'moment';
import { v4 as uuid } from 'uuid';

import { UserInfo, Button, Account } from '@components';
import { checkUser } from '@middlewares';

import styles from './style.module.scss';

const User = ({ user = {}, accounts = [] }) => {
  const router = useRouter();

  const onAccountAdd = useCallback(() => {
    router.push('/user/account/add');
  }, [router]);

  const onAccountClick = useCallback(
    (id) => {
      router.push(`/user/account/${id}`);
    },
    [router],
  );

  return (
    <div className={styles['user-page']}>
      <UserInfo
        firstName={user.firstName}
        patronymic={user.patronymic}
        lastName={user.lastName}
        login={user.login}
        email={user.email}
      />
      <div className={styles['user-page-accounts']}>
        <div className={styles['user-page-accounts-header']}>
          <h2>Мои счета:</h2>
          <Button className={styles['user-page-accounts-header-button']} onClick={onAccountAdd}>
            Добавить
          </Button>
        </div>
        {accounts.map((el) => (
          <Account
            key={el.id}
            id={el.id}
            number={el.number}
            currency={el.currency}
            value={el.value}
            onClick={onAccountClick}
          />
        ))}
      </div>
    </div>
  );
};

export const getServerSideProps = (ctx) =>
  checkUser(
    ctx,
    async ({
      req: {
        headers: { cookie },
      },
    }) => {
      console.log(1, cookie);

      if (cookie) {
        const me = {
          login: 'user',
          firstName: 'Иван',
          patronymic: 'Иванович',
          lastName: 'Иванов',
          email: 'ivanov@mail.com',
          date: moment().utcOffset(0, true).format(),
        };

        const accounts = [
          {
            id: uuid(),
            number: uuid(),
            currency: 'RUB',
            value: 1000,
            createdAt: moment().format(),
          },
          {
            id: uuid(),
            number: uuid(),
            currency: 'EUR',
            value: 20,
            createdAt: moment().format(),
          },
          {
            id: uuid(),
            number: uuid(),
            currency: 'USD',
            value: 18,
            createdAt: moment().format(),
          },
          {
            id: uuid(),
            number: uuid(),
            currency: 'RUB',
            value: 1000,
            createdAt: moment().format(),
          },
          {
            id: uuid(),
            number: uuid(),
            currency: 'EUR',
            value: 20,
            createdAt: moment().format(),
          },
          {
            id: uuid(),
            number: uuid(),
            currency: 'USD',
            value: 18,
            createdAt: moment().format(),
          },
          {
            id: uuid(),
            number: uuid(),
            currency: 'RUB',
            value: 1000,
            createdAt: moment().format(),
          },
          {
            id: uuid(),
            number: uuid(),
            currency: 'EUR',
            value: 20,
            createdAt: moment().format(),
          },
          {
            id: uuid(),
            number: uuid(),
            currency: 'USD',
            value: 18,
            createdAt: moment().format(),
          },
        ];

        if (me) {
          return {
            props: {
              user: me,
              accounts,
            },
          };
        }
      }
      return { props: {} };
    },
    { redirectToLogin: true },
  );

export default User;
