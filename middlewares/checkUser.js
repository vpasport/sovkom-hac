import { getMe } from '@api/user';
import { getCookie } from '@utils';

const checkUser = async (ctx, callback, { redirectToLogin = true }) => {
  const {
    req: {
      headers: { cookie },
    },
  } = ctx;

  if ((!cookie || getCookie('jwt', cookie) === null) && redirectToLogin) {
    return {
      redirect: {
        destination: '/login',
        permanent: true,
      },
    };
  }

  if (cookie) {
    try {
      const user = await (await getMe(cookie)).data;
      ctx.user = user;
    } catch (e) {
      console.error('error', e.response?.data);
      if (redirectToLogin) {
        return {
          redirect: {
            destination: '/login',
            permanent: true,
          },
        };
      }

      ctx.user = null;
    }
  } else {
    ctx.user = null;
  }

  const result = await callback(ctx);

  return result;
};

export { checkUser };
