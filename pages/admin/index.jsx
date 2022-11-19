// import { useCallback, useState } from 'react';
import { useRouter } from 'next/router';

// import { FiChevronLeft } from 'react-icons/fi';

import { Button } from '@components';

// import * as UsetService from '@api/user';

const AdminPage = () => {
  const router = useRouter();

  // const [loading, setLoading] = useState(false);
  // const updUser = {};

  return (
    <div>
      <h2>Администратор</h2>
      <div>
        <Button type="text" onClick={() => router.push('admin/users/')}>
          Пользователи
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
