import axios from 'axios';

import { getCookie } from '@utils';

export const userApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_USER_API_URL,
  withCredentials: false,
});

export const currencyApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_CURRENCY_API_URL,
  withCredentials: false,
});

export const createHeaders = ({ cookie, contentType = 'json' }) => {
  const headers = {};
  const jwt = getCookie('jwt', cookie);

  if (jwt) {
    headers.Authorization = `Bearer ${jwt}`;
  }

  if (contentType === 'formData') {
    headers['Content-Type'] = 'multipart/form-data';
  }

  return headers;
};
