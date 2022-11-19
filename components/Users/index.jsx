import { Table, Loader } from '@components';

import styles from './style.module.scss';

const Users = ({ users = [], loading = false, updateUsers, updatedUser }) => {
  const columns = [
    {
      id: 0,
      header: 'Логин',
      field: 'login',
    },
    {
      id: 1,
      header: 'Фамилия',
      field: 'last_name',
    },
    {
      id: 2,
      header: 'Имя',
      field: 'first_name',
    },
    {
      id: 3,
      header: 'Отчество',
      field: 'patronymic',
    },
    {
      id: 4,
      header: 'День рождения',
      field: 'birthday',
    },
    {
      id: 5,
      header: 'Верифицикация',
      field: 'verified',
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
          items={users}
          toggle={(data) => updateUsers(data)}
          updatedRow={(row) => updatedUser(row)}
        />
      )}
    </>
  );
};

export { Users };
