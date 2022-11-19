import axios from 'axios';

export const userApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_USER_API_URL,
  withCredentials: true,
});

export const createHeaders = ({ cookie, contentType = 'json' }) => {
  const headers = {};

  if (cookie) {
    headers.cookie = cookie;
  }
  if (contentType === 'formData') {
    headers['Content-Type'] = 'multipart/form-data';
  }

  return headers;
};
