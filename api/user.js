import { userApi, createHeaders } from '.';

const getMe = (cookie) => userApi.get('/me', { headers: createHeaders({ cookie }) });

const signIn = (data) => userApi.post('/signIn', data);

const registration = (data) => userApi.post('/registration', data);

const getAll = () => userApi.get('/getUsers');

const updateUser = (data) => userApi.post('/updateUser', data);

export { getMe, signIn, registration, getAll, updateUser };
