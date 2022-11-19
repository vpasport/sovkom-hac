import { useState, useCallback, useMemo } from 'react';

import { checkUser } from '@middlewares';
import { Input, Account, Button } from '@components';
import { useNotifications } from '@hooks';
import * as UserService from '@api/user';

import styles from './style.module.scss';

const Payment = ({ user }) => {
  const { pushNotifications } = useNotifications();
  const dropDownItems = useMemo(() => [
    { value: 'up', label: 'Поплнение' },
    { value: 'down', label: 'Вывод' },
  ]);
  const [account, setAccount] = useState(user.userScore.find((el) => el.currency === 'RUB'));
  const [value, setValue] = useState();
  const [action, setAction] = useState(null);
  const [loading, setLoading] = useState(false);

  const onInputChange = useCallback(({ target: { value } }) => {
    setValue(parseFloat(value));
  }, []);

  const onDropdownChange = useCallback(({ value }) => setAction(value), []);

  const onSubmit = useCallback(() => {
    setLoading(true);
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
    if (action === 'down' && account.value - value < 0) {
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
      value: action === 'up' ? account.value + value : account.value - value,
      isActive: true,
    })
      .then(() => {
        pushNotifications({ type: 'success', description: 'Операция успешно выполнена' });
        setAccount((prev) => ({
          ...prev,
          value: action === 'up' ? account.value + value : account.value - value,
        }));
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
  }, [value, action]);

  return (
    <div className={styles.payment}>
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
            min={0}
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
      </div>
    </div>
  );
};

export const getServerSideProps = (ctx) =>
  checkUser(
    ctx,
    async ({ user }) => ({
      props: {
        user,
      },
    }),
    { redirectToLogin: true },
  );

export default Payment;
