import moment from 'moment';

import { Table, Loader } from '@components';

import styles from './style.module.scss';

const Users = ({ users = [], loading = false, updateUsers, updatedUser }) => {
  const infoUsers = users
    .filter((item) => item.deletedAt === null)
    .map((user) => ({
      id: user.id,
      login: user.login,
      lastName: user.additionalFields?.lastName || null,
      firstName: user.additionalFields?.firstName || null,
      secondName: user.additionalFields?.secondName || null,
      dateOfBirth: user.additionalFields?.dateOfBirth
        ? moment(user.additionalFields.dateOfBirth).format('DD.MM.YYYY')
        : null,
      verify: user.verify,
    }));

  const columns = [
    {
      id: 0,
      header: 'Логин',
      field: 'login',
    },
    {
      id: 1,
      header: 'Фамилия',
      field: 'lastName',
    },
    {
      id: 2,
      header: 'Имя',
      field: 'firstName',
    },
    {
      id: 3,
      header: 'Отчество',
      field: 'secondName',
    },
    {
      id: 4,
      header: 'День рождения',
      field: 'dateOfBirth',
    },
    {
      id: 5,
      header: 'Верифицикация',
      field: 'verify',
    },
    {
      id: 6,
      header: '',
      field: 'blocked',
    },
  ];

  return (
    <>
      {loading ? (
        <div className={styles.users_loader}>
          <Loader />
        </div>
      ) : (
        <Table
          columns={columns}
          items={infoUsers}
          toggle={(data) => updateUsers(data)}
          updatedRow={(row) => updatedUser(row)}
        />
      )}
    </>
  );
};

export { Users };
