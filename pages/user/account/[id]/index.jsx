import { useRouter } from 'next/router';
import { useState, useMemo, useCallback } from 'react';
import { Calendar } from 'primereact/calendar';
import { Button } from 'primereact/button';
import moment from 'moment';

import { Chart, Input, Account as Score, Transaction, History } from '@components';
import { checkUser } from '@middlewares';
import * as CurrencyService from '@api/currency';
import * as UserService from '@api/user';
import { useNotifications } from '@hooks';

import styles from './style.module.scss';

const Account = ({ user, currency = [], history: historyFromServer = [] }) => {
  const router = useRouter();
  const { pushNotifications } = useNotifications();

  const dropdowItems = useMemo(
    () => currency.map((el) => ({ value: el.currency, label: el.currency })),
    [],
  );

  const [history, setHistory] = useState(historyFromServer);
  const [score, setScore] = useState(user.userScore.find((el) => el.uuid === router.query.id));
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectedCurrency, setSelectedCurrency] = useState(null);
  const [value, setValue] = useState(0);
  const [transactionLoading, setTransactionLoading] = useState(false);
  const [stat, setStat] = useState(null);
  const updateChart = (second, start, end) => {
    if (second) {
      CurrencyService.getRateWithTimes({
        base: score.currency,
        second,
        start: moment(start).isValid() ? moment(start).format('YYYY-MM-DD') : undefined,
        end: moment(end).isValid() ? moment(end).format('YYYY-MM-DD') : undefined,
      })
        .then((res) => {
          setStat(res.data);
        })
        .catch((err) => console.error(err));
    }
  };

  const onStartDateChange = useCallback(
    ({ target: { value } }) => {
      if (Math.abs(moment(value).diff(moment(endDate), 'months')) > 12) {
        pushNotifications({
          type: 'error',
          description: 'Период не должен превышать 1 год',
        });
        setStartDate(moment(endDate).subtract(1, 'year').toDate());
        return;
      }
      updateChart(selectedCurrency, value, endDate);
      setStartDate(value);
    },
    [endDate],
  );
  const onEndDateChange = useCallback(
    ({ target: { value } }) => {
      if (Math.abs(moment(value).diff(moment(startDate), 'months')) > 12) {
        pushNotifications({
          type: 'error',
          description: 'Период не должен превышать 1 год',
        });
        setEndDate(moment(startDate).add(1, 'year').toDate());
        return;
      }
      updateChart(selectedCurrency, startDate, value);
      setEndDate(value);
    },
    [startDate],
  );
  const onResetDates = useCallback(() => {
    setStartDate(null);
    setEndDate(null);
  }, []);
  const onCurrancySelect = useCallback(({ value }) => {
    updateChart(value, startDate, endDate);
    setSelectedCurrency(value);
  }, []);
  const onValueChange = useCallback(({ target: { value } }) => setValue(value), []);
  const onTransaction = useCallback(() => {
    setTransactionLoading(true);

    if (parseFloat(value) === 0) {
      setTransactionLoading(false);
      return;
    }

    UserService.currencyOperation({
      userId: user.id,
      fromCurrency: score.currency,
      toCurrency: selectedCurrency,
      value: parseFloat(value),
    })
      .then((res) => {
        pushNotifications({
          type: 'success',
          description: 'Транзакция прошла успешно',
        });
        const elem = res.data.historyRes.find((el) => el.scoreUuid === score.uuid);
        setScore((prev) => ({
          ...prev,
          value: prev.value - elem.value,
        }));
        setHistory((prev) => [elem, ...prev]);
      })
      .catch((err) => {
        pushNotifications({
          type: 'error',
          header: 'Ошибка',
          description: err.response?.data?.message,
        });
        console.error(err);
      })
      .finally(() => setTransactionLoading(false));
  }, [score, value, selectedCurrency]);

  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h2>Действия:</h2>
          <div className={styles['content-score']}>
            <Score
              key={score.uuid}
              id={score.uuid}
              number={score.uuid}
              currency={score.currency}
              value={score.value}
              withButtons={false}
              disableHover
            />
          </div>
          <div className={styles['content-inputs']}>
            <Input type="dropdown" items={dropdowItems} onChange={onCurrancySelect} />
            <Calendar
              className={styles['content-inputs-input']}
              name="date"
              value={startDate}
              onChange={onStartDateChange}
              dateFormat="dd.mm.yy"
              placeholder="Начало периода"
              maxDate={endDate || new Date()}
            />
            <Calendar
              className={styles['content-inputs-input']}
              name="date"
              value={endDate}
              onChange={onEndDateChange}
              dateFormat="dd.mm.yy"
              placeholder="Конец периода"
              maxDate={new Date()}
              minDate={startDate}
            />
            <Button
              icon="pi pi-times"
              className={styles['content-inputs-button']}
              onClick={onResetDates}
            />
          </div>
          <div className={styles['content-chart']}>
            <Chart data={stat} />
          </div>
          <div className={styles['content-transaction']}>
            <Transaction
              id={router.query.id}
              from={score.currency}
              to={selectedCurrency}
              value={value}
              loading={transactionLoading}
              onChange={onValueChange}
              onTransaction={onTransaction}
            />
          </div>
          {history.length > 0 && (
            <div className={styles['content-history']}>
              <h2>История:</h2>
              {history.map((el) => (
                <History
                  key={el.createAt}
                  createAt={el.createAt}
                  fromCurrency={el.fromCurrency}
                  scoreUuid={el.scoreUuid}
                  toCurrency={el.toCurrency}
                  value={el.value}
                  additionalScoreUuid={el.additionalScoreUuid}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = (ctx) =>
  checkUser(
    ctx,
    async ({
      user,
      req: {
        headers: { cookie },
      },
      params: { id },
    }) => {
      try {
        const currency = await (await CurrencyService.getAvailable()).data;
        const history = await (
          await UserService.getOperationHistory(id, cookie)
        ).data.filter((el) => !!el.additionalScoreUuid);

        return {
          props: {
            user,
            currency: currency.filter((el) => !el.banned),
            history,
          },
        };
      } catch (e) {
        console.error(e);
        return {
          redirect: {
            destination: '/user',
            permanent: true,
          },
        };
      }
    },
    { redirectToLogin: true },
  );

export default Account;
