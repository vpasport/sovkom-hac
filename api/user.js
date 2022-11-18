import { userApi } from '.';

const getMe = () => userApi.get('/me');

const signIn = (data) => userApi.post('/signIn', data);

export { getMe, signIn };
