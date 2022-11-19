// import { useCallback, useState } from 'react';
import { useRouter } from 'next/router';

// import { FiChevronLeft } from 'react-icons/fi';

import { Button } from '@components';

import styles from './style.module.scss';

// import * as UsetService from '@api/user';

const AdminPage = () => {
  const router = useRouter();

  // const [loading, setLoading] = useState(false);
  // const updUser = {};

  return (
    <div className={styles['admin-page']}>
      <div className={styles['admin-page_card']}>
        <h2 className={styles['admin-page_card__title']}>Администратор</h2>
        <Button
          className={styles['admin-page_card__btn-users']}
          type="border"
          onClick={() => router.push('admin/users/')}
        >
          Список пользователей
        </Button>
      </div>
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

export default AdminPage;
