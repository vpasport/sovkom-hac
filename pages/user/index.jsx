import { useRouter } from 'next/router';
import { useCallback } from 'react';

import { UserInfo, Button, Account } from '@components';
import { checkUser } from '@middlewares';

import styles from './style.module.scss';

const User = ({ user = {} }) => {
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

  const onAccountDelete = useCallback((id) => {
    console.log(id);
  }, []);

  return (
    <div className={styles['user-page']}>
      <UserInfo
        firstName={user.additionalFields.firstName}
        patronymic={user.additionalFields.secondName}
        lastName={user.additionalFields.lastName}
        login={user.login}
        email={user.additionalFields.email}
      />
      <div className={styles['user-page-accounts']}>
        <div className={styles['user-page-accounts-header']}>
          <h2>Мои счета:</h2>
          <Button className={styles['user-page-accounts-header-button']} onClick={onAccountAdd}>
            Добавить
          </Button>
        </div>
        {user.userScore.map((el) => (
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
