import moment from 'moment';

import { currencyApi, createHeaders } from '.';

const getAvailable = () => currencyApi.get('/available');

const getRateWithTimes = ({
  base,
  second = 'RUB',
  start = moment().subtract(1, 'month').format('YYYY-MM-DD'),
  end = moment().format('YYYY-MM-DD'),
}) => {
  const params = new URLSearchParams({
    base,
    second,
    start,
    end,
  }).toString();

  return currencyApi.get(`/time-series?${params}`);
};

const changeStatus = (data) =>
  currencyApi.post('/change-status', data, { headers: createHeaders({ cookie: document.cookie }) });

export { getAvailable, getRateWithTimes, changeStatus };
