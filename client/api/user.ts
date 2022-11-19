import type { IUser } from '../types/user';

import { api, createHeaders } from './';

const logout = () => api.post('/users/logout');

const login = (data: IUser) => api.post('/users/login', data);

const getMe = (cookie?: string) =>
  api.get('/users/me', { headers: createHeaders({ cookie }) });

const checkAuth = (cookie?: string) =>
  new Promise((resolve, reject) => {
    api
      .get('/users/me', {
        headers: createHeaders({ cookie }),
      })
      .then((res) => {
        res.status === 200 ? resolve(true) : reject(false);
      })
      .catch((error) => {
        console.error(error);
        reject(false);
      });
  });

const getAllUsers = (cookie?: string) =>
  api.get('/users', { headers: createHeaders({ cookie }) });

const register = (data: IUser) => api.post('/users/register', data);

const remove = (id: number) => api.delete(`/users/${id}`);

export { logout, getMe, login, getAllUsers, checkAuth, register, remove };
