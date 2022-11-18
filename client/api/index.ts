import type { IHeaders } from './api.types';

import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

export const createHeaders = ({ cookie, contentType = 'json' }: IHeaders) => {
  let headers: { [key: string]: string } = {};

  if (cookie) {
    headers.cookie = cookie;
  }
  if (contentType === 'formData') {
    headers['Content-Type'] = 'multipart/form-data';
  }

  return headers;
};
