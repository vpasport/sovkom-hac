import { useCallback, useState } from 'react';
import { useRouter } from 'next/router';

import { Users, Button } from '@components';

import * as UserService from '@api/user';
import { checkUser } from '@middlewares';
import { useNotifications } from '@hooks';

import { FiChevronLeft } from 'react-icons/fi';

import styles from './style.module.scss';

const UsersPage = ({ users: serverSideUsers = [] }) => {
  const router = useRouter();
  const { pushNotifications } = useNotifications();

  const [loading, setLoading] = useState(false);
  let updUser = {};
  const [users, setUsers] = useState(serverSideUsers);

  const getAll = useCallback((id) => {
    UserService.getAll()
      .then((res) => {
        setUsers(res.data.filter((item) => item.id !== id));
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

  const updateUser = useCallback((data) => {
    setLoading(true);

    UserService.updateUser(data)
      .then((res) => {
        pushNotifications({
          type: 'success',
          header: 'Успешно!',
          description: res.statusText,
        });
      })
      .catch((error) => {
        pushNotifications({
          type: 'error',
          header: 'Ошибка',
          description: error.message,
        });
        console.log(error);
      })
      .finally(() => {
        UserService.getMe()
          .then((res) => getAll(res.data.id))
          .catch((err) => console.log(err));
      });
  }, []);

  function setNewUser(val) {
    updUser = { ...val };

    updateUser(updUser);
  }

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
    async ({
      user,
      req: {
        headers: { cookie },
      },
    }) => {
      if (user === null || user.role !== 'admin') {
        return {
          redirect: {
            destination: '/login',
            permanent: true,
          },
        };
      }

      try {
        const users = await (
          await UserService.getAll(cookie)
        ).data.filter((item) => item.id !== user.id);

        return {
          props: {
            users,
          },
        };
      } catch (e) {
        console.error(e);
        return {
          props: {
            users: [],
          },
        };
      }
    },
    { redirectToLogin: true },
  );

export default UsersPage;
