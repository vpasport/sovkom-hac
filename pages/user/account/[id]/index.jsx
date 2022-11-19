// // import { useState } from 'react';

// import { checkUser } from '@middlewares';
// import * as CurrencyService from '@api/currency';
// // import * as UserService from '@api/user';

// // import styles from './style.module.scss';

// const Account = () => 'test';

// export const getServerSideProps = (ctx) =>
//   checkUser(
//     ctx,
//     async ({ user }) => {
//       try {
//         const currency = await (await CurrencyService.getAvailable()).data;
//         // const history = await (await UserService.)

//         return {
//           props: {
//             user,
//             currency: currency.filter((el) => !el.banned),
//           },
//         };
//       } catch (e) {
//         console.error(e);
//         return {
//           redirect: {
//             destination: '/user',
//             permanent: true,
//           },
//         };
//       }
//     },
//     { redirectToLogin: true },
//   );

// export default Account;

const Account = () => 'test';

export default Account;
