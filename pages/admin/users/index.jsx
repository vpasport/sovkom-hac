import { useCallback, useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import { Users, Button } from '@components';

import * as UserService from '@api/user';
import { checkUser } from '@middlewares';
import { useNotifications } from '@hooks';

import { FiChevronLeft } from 'react-icons/fi';

import styles from './style.module.scss';

const UsersPage = () => {
  const router = useRouter();
  const { pushNotifications } = useNotifications();

  const [loading, setLoading] = useState(false);
  let updUser = {};
  const [users, setUsers] = useState([
    {
      login: 'gavno13',
      id: 8,
      verify: 0,
      role: 'user',
      rights: null,
      createdAt: '2022-11-19T04:52:13.648Z',
      deletedAt: null,
      additionalFields: null,
    },
    {
      login: 'gavno228',
      id: 9,
      verify: 1,
      role: 'user',
      rights: null,
      createdAt: '2022-11-19T06:27:57.504Z',
      deletedAt: null,
      additionalFields: {
        id: 6,
        deletedAt: null,
        createdAt: '2022-11-19T05:05:06.696Z',
        updatedAt: '2022-11-19T05:05:06.696Z',
        lastName: 'neo4en',
        firstName: 'loh',
        secondName: 'olen',
        codeWord: 'allah velik',
        dateOfBirth: '1992-10-23T00:00:00.000Z',
      },
    },
    {
      login: 'gavno22',
      id: 3,
      verify: 1,
      role: 'user',
      rights: null,
      createdAt: '2022-11-18T18:36:13.353Z',
      deletedAt: '2022-11-19T06:39:42.591Z',
      additionalFields: {
        id: 3,
        deletedAt: null,
        createdAt: '2022-11-18T21:40:42.326Z',
        updatedAt: '2022-11-19T05:36:49.981Z',
        lastName: 'neo4en',
        firstName: 'loh',
        secondName: 'olen',
        codeWord: 'allah velik',
        dateOfBirth: '1992-10-23T00:00:00.000Z',
      },
    },
  ]);

  const getAll = useCallback(() => {
    setLoading(true);
    UserService.getAll()
      .then((res) => setUsers(res))
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

  const updateUser = useCallback((data) => {
    const usersArray = [...users];
    const indexUpdUser = users.findIndex((el) => el.id === data.id);

    usersArray[indexUpdUser] = data;

    setUsers(usersArray);
    setLoading(true);

    UserService.updateUser(data)
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
      .finally(() => setLoading(false));
  }, []);

  function setNewUser(val) {
    updUser = { ...val };

    updateUser(updUser);
  }

  useEffect(() => {
    getAll();
  }, []);
  return (
    <div className={styles['users-page']}>
      <section className={styles['users-page_btns']}>
        <Button type="text" leftIcon={FiChevronLeft} onClick={() => router.push('/admin/')}>
          Назад
        </Button>
      </section>
      <section className={styles['users-page_wrapper']}>
        <h2 className={styles['users-page_wrapper__title']}>Информация о пользователях</h2>
        <Users
          className={styles['users-page_wrapper__table']}
          users={users}
          updatedUser={(val) => setNewUser(val)}
          loading={loading}
        />
      </section>
    </div>
  );
};

export const getServerSideProps = (ctx) =>
  checkUser(
    ctx,
    async ({ user }) => {
      if (user === null || user.role !== 'amdin') {
        return {
          redirect: {
            destination: '/login',
            permanent: true,
          },
        };
      }

      return { props: {} };
    },
    { redirectToLogin: false },
  );

export default UsersPage;
