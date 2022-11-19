import { useState } from 'react';

import { Table } from '@components';

const Users = () => {
  const [items, setItems] = useState([
    {
      id: 0,
      login: 'anyalozovaya@mail.ru',
      first_name: 'Анна',
      last_name: 'Лозовая',
      patronymic: 'Яковлевна',
      birthday: '08.12.1999',
      verified: true,
      blocked: false,
    },
    {
      id: 1,
      login: 'kdsj@mail.ru',
      first_name: 'Геннадий',
      last_name: 'Петров',
      patronymic: 'Ибрагимович',
      birthday: '18.02.1979',
      verified: true,
      blocked: true,
    },
    {
      id: 2,
      login: 'kdaaadjdhadhsj@mail.ru',
      first_name: 'Алефтина',
      last_name: 'Семенова',
      patronymic: 'Олеговна',
      birthday: '01.01.1947',
      verified: false,
      blocked: false,
    },
  ]);

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
    <div>
      <Table columns={columns} items={items} toggle={(data) => setItems([...data])} />
    </div>
  );
};

export { Users };
