import { useCallback, useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import { FiChevronLeft } from 'react-icons/fi';

import { Users, Button } from '@components';

import * as UsetService from '@api/user';

const UsersPage = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  let updUser = {};
  const [users, setUsers] = useState([
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

  const getAll = useCallback(() => {
    // setLoading(true);
    UsetService.getAll()
      .then((res) => console.log(res))
      .catch((error) => console.log(error.message));
    // .finally(() => setLoading(false));
  }, []);

  const updateUser = useCallback((data) => {
    console.log('updateUser', data);
    setLoading(false);
    // UsetService.updateUser(data).then((res) => console.log(res)).catch(error => console.log(error.message))
    // .finally(() => setLoading(false));
  }, []);

  function setNewUser(val) {
    updUser = { ...val };
    console.log('updUser', updUser);
    updateUser(updUser);
  }

  useEffect(() => {
    getAll();
  }, []);
  return (
    <div>
      <div>
        <Button type="text" leftIcon={FiChevronLeft} onClick={() => router.push('/admin/')}>
          Назад
        </Button>
      </div>

      <h2>Информация о пользователях</h2>
      <Users
        users={users}
        updateUsers={(data) => setUsers([...data])}
        updatedUser={(val) => setNewUser(val)}
        loading={loading}
      />
    </div>
  );
};
// export const getServerSideProps = async ({
//   req: {
//     headers: { cookie },
//   },
// }) => {
//   try {
//     if (cookie) {
//       const me = await (await UsetService.getMe(cookie)).data;

//       console.log(me);

//       return {
//         redirect: {
//           destination: '/main',
//           permanent: true,
//         },
//       };
//     }
//   } catch (e) {
//     console.error(e);
//   }
//   return { props: {} };
// };

export default UsersPage;
