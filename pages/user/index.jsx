import { useRouter } from 'next/router';
import { useCallback, useState } from 'react';

import { UserInfo, Button, Account } from '@components';
import { useNotifications } from '@hooks';
import { checkUser } from '@middlewares';
import * as UserService from '@api/user';

import styles from './style.module.scss';

const User = ({ user = {} }) => {
  const router = useRouter();
  const { pushNotifications } = useNotifications();

  const [userInfo, setUserInfo] = useState(user);

  const onAccountAdd = useCallback(() => {
    router.push('/user/account/add');
  }, [router]);

  const onAccountClick = useCallback(
    (id) => {
      router.push(`/user/account/${id}`);
    },
    [router],
  );

  const onAccountDelete = useCallback(
    (id) => {
      const acc = userInfo.userScore.find((el) => el.uuid === id);

      if (acc.value !== 0) {
        pushNotifications({
          type: 'warning',
          description: 'На счету не должно быть денег',
        });
      } else {
        UserService.deleteScore({
          userId: user.id,
          scoreUuid: id,
        })
          .then(() => {
            pushNotifications({
              type: 'success',
              description: 'Счет успешно удален',
            });
            setUserInfo((prev) => ({
              ...prev,
              userScore: prev.userScore.filter((el) => el.uuid !== id),
            }));
          })
          .catch((err) => {
            pushNotifications({
              type: 'error',
              header: 'Ошибка',
              description: err.response?.data?.message,
            });
            console.error(err);
          });
      }
    },
    [userInfo],
  );

  return (
    <div className={styles['user-page']}>
      <UserInfo
        firstName={userInfo.additionalFields.firstName}
        patronymic={userInfo.additionalFields.secondName}
        lastName={userInfo.additionalFields.lastName}
        login={userInfo.login}
        email={userInfo.additionalFields.email}
      />
      <div className={styles['user-page-accounts']}>
        <div className={styles['user-page-accounts-header']}>
          <h2>Мои счета:</h2>
          <Button className={styles['user-page-accounts-header-button']} onClick={onAccountAdd}>
            Добавить
          </Button>
        </div>
        {userInfo.userScore.map((el) => (
          <Account
            key={el.uuid}
            id={el.uuid}
            number={el.uuid}
            currency={el.currency}
            value={el.value}
            onClick={onAccountClick}
            onDelete={onAccountDelete}
          />
        ))}
      </div>
    </div>
  );
};

export const getServerSideProps = (ctx) =>
  checkUser(
    ctx,
    async ({ user }) => ({
      props: {
        user,
      },
    }),
    { redirectToLogin: true },
  );

export default User;
