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
      header: 'Логин',
      field: 'login',
    },
    {
      header: 'Фамилия',
      field: 'last_name',
    },
    {
      header: 'Имя',
      field: 'first_name',
    },
    {
      header: 'Отчество',
      field: 'patronymic',
    },
    {
      header: 'День рождения',
      field: 'birthday',
    },
    {
      header: 'Верифицикация',
      field: 'verified',
    },
    {
      header: '',
      field: 'blocked',
    },
  ];

  return (
    <div>
      <Table
        columns={columns}
        items={items}
        toggle={(data) => setItems([...data])}
      />
    </div>
  );
};

export { Users };
