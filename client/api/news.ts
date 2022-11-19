import type { INews } from '../types/news';

import { api, createHeaders } from './';

const getAll = () => api.get('/news/');

const getById = (id: number) => api.get(`/news/${id}`);

const create = (fd: FormData) =>
  api.post('/news', fd, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

const remove = (id: number) => api.delete(`/news/${id}`);

export { getAll, getById, create, remove };
