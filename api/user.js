import { setCookie, eraseCookie } from '@utils';

import { userApi, createHeaders } from '.';

const getMe = (cookie) => userApi.get('/me', { headers: createHeaders({ cookie }) });

const signIn = (data) =>
  userApi.post('/signIn', data).then((res) => {
    setCookie('jwt', res.data.token, 7);

    return res;
  });

const logout = () =>
  new Promise((res) => {
    eraseCookie('jwt');
    res(true);
  });

const registration = (data) => userApi.post('/registration', data);

const getAll = () => userApi.get('/getUsers');

const updateUser = (data) => userApi.post('/updateUser', data);

const createScoreByUser = (data) =>
  userApi.post('/createScoreByUser', data, { headers: createHeaders({ cookie: document.cookie }) });

export { getMe, signIn, registration, getAll, updateUser, logout, createScoreByUser };
