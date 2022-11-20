import { setCookie, eraseCookie } from '@utils';
import axios from 'axios';

import { userApi, createHeaders } from '.';

const getMe = (cookie = null) =>
  userApi.get('/me', { headers: createHeaders({ cookie: cookie || document.cookie }) });

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

const getAll = (coockie = null) =>
  userApi.get('/getUsers', { headers: createHeaders({ cookie: coockie || document.cookie }) });

const updateUser = (data) =>
  userApi.post('/updateUser', data, { headers: createHeaders({ cookie: document.cookie }) });

const createScoreByUser = (data) =>
  userApi.post('/createScoreByUser', data, { headers: createHeaders({ cookie: document.cookie }) });

const deleteScore = (data) =>
  userApi.delete('/deleteScore', { headers: createHeaders({ cookie: document.cookie }), data });

const updateScore = (data) =>
  userApi.post('/updateScore', data, { headers: createHeaders({ cookie: document.cookie }) });

const getOperationHistory = (id) =>
  axios.get(`/getHistoryByScoreUuid?uuid=${id}`, {
    headers: createHeaders({ cookie: document.cookie }),
  });

export {
  getMe,
  signIn,
  registration,
  getAll,
  updateUser,
  logout,
  createScoreByUser,
  deleteScore,
  updateScore,
  getOperationHistory,
};
