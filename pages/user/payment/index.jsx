import { useState, useCallback, useMemo } from 'react';

import { checkUser } from '@middlewares';
import { Input, Account, Button } from '@components';
import { useNotifications } from '@hooks';
import * as UserService from '@api/user';

import styles from './style.module.scss';

const Payment = ({ user, history: historyFromServer = [] }) => {
  const { pushNotifications } = useNotifications();
  const dropDownItems = useMemo(
    () => [
      { value: 'up', label: 'Пополнение' },
      { value: 'down', label: 'Вывод' },
    ],
    [],
  );

  const [history, setHistory] = useState(historyFromServer);
  const [account, setAccount] = useState(user.userScore.find((el) => el.currency === 'RUB'));
  const [value, setValue] = useState();
  const [action, setAction] = useState(null);
  const [loading, setLoading] = useState(false);

  const onInputChange = useCallback(({ target: { value } }) => {
    setValue(value);
  }, []);

  const onDropdownChange = useCallback(({ value }) => setAction(value), []);

  const onSubmit = useCallback(() => {
    setLoading(true);

    const val = parseFloat(value);

    if (!value) {
      pushNotifications({
        type: 'error',
        header: 'Ошибка',
        description: 'Введите сумму',
      });
      setLoading(false);
      return;
    }
    if (!action) {
      pushNotifications({
        type: 'error',
        header: 'Ошибка',
        description: 'Введите сумму',
      });
      setLoading(false);
      return;
    }
    if (action === 'down' && account.value - val <= 0) {
      pushNotifications({
        type: 'error',
        header: 'Ошибка',
        description: 'Вы не можете вывести сумму больше вашего баланса',
      });
      setLoading(false);
      return;
    }

    UserService.updateScore({
      userId: user.id,
      currency: 'RUB',
      value: action === 'up' ? account.value + val : account.value - val,
      isActive: true,
      type: action,
    })
      .then((res) => {
        console.log(res, history);
        pushNotifications({ type: 'success', description: 'Операция успешно выполнена' });
        setAccount((prev) => ({
          ...prev,
          value: action === 'up' ? account.value + val : account.value - val,
        }));
        setHistory((prev) => [
          {
            additionalScoreUuid: null,
            createdAt: res.data.createAt,
            deletedAt: null,
            fromCurrency: null,
            scoreUuid: res.data.uuid,
            toCurrency: 'RUB',
            type: action === 'up' ? 'replenishment' : 'buy',
            updatedAt: res.data.updatedAt,
            value: val,
          },
          ...prev,
        ]);
      })
      .catch((err) => {
        pushNotifications({
          type: 'error',
          header: 'Ошибка',
          description: err.response?.data?.message,
        });
        console.error(err);
      })
      .finally(() => setLoading(false));
    // setLoading(false);
  }, [value, action]);

  return (
    <div className={styles.payment}>
      <div className={styles.wrapper}>
        <div className={styles['payment-content']}>
          <div className={styles['payment-content-form']}>
            <h2>Операция:</h2>
            <Account
              key={account.uuid}
              id={account.uuid}
              number={account.uuid}
              currency={account.currency}
              value={account.value}
              withButtons={false}
              disableHover
            />
            <Input type="dropdown" items={dropDownItems} onChange={onDropdownChange} />
            <Input
              value={value}
              onChange={onInputChange}
              placeholder="Сумма"
              className={styles['payment-content-form-input']}
            />
            <Button
              disabled={loading}
              onClick={onSubmit}
              className={styles['payment-content-form-button']}
            >
              Подтвердить
            </Button>
          </div>
          {history.length > 0 && (
            <div className={styles['payment-content-history']}>
              <h2>История:</h2>
              {history.map((el) => (
                <div key={el.createdAt} className={styles.history}>
                  <span className={styles['history-text']}>
                    {el.type === 'replenishment' ? 'Пополнение' : 'Снятие'}: {el.value}
                  </span>
                </div>
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
    }) => {
      try {
        const { uuid } = user.userScore.find((el) => el.currency === 'RUB');

        const history = await (
          await UserService.getOperationHistory(uuid, cookie)
        ).data.filter((el) => !el.additionalScoreUuid);

        return {
          props: {
            user,
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

export default Payment;
