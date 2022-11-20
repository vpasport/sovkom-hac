/*eslint-disable*/
import CreditCardInput from 'react-credit-card-input';

import { useState } from 'react';

import styles from './style.module.scss';

const CreditCard = ({ onCardNumber, onExp, onCVC }) => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCVC] = useState('');

  const handleCardNumberChange = (e) => {
    setCardNumber(e.target.value);
    onCardNumber(cardNumber);
  };

  const handleCardExpiryChange = (e) => {
    setExpiry(e.target.value);
    onExp(expiry);
  };

  const handleCardCVCChange = (e) => {
    setCVC(e.target.value);
    onCVC(cvc);
  };

  return (
    <CreditCardInput
      invalidClassName={styles['credit-card_invalid']}
      fieldClassName={styles['credit-card']}
      cardNumberInputProps={{ value: cardNumber, onChange: handleCardNumberChange }}
      cardExpiryInputProps={{ value: expiry, onChange: handleCardExpiryChange }}
      cardCVCInputProps={{ value: cvc, onChange: handleCardCVCChange }}
      customTextLabels={{
        invalidCardNumber: ' ',
        expiryError: {
          invalidExpiryDate: 'Срок годности недействителен',
          monthOutOfRange: 'Месяц истечения срока действия должен быть между 01 и 12',
          yearOutOfRange: 'Год истечения срока действия не может быть в прошлом',
          dateOutOfRange: 'Срок действия не может быть в прошлом',
        },
        invalidCvc: 'Код безопасности недействителен',
        invalidZipCode: 'Почтовый индекс недействителен',
        cardNumberPlaceholder: 'Номер карты',
        expiryPlaceholder: 'ММ/ГГ',
        cvcPlaceholder: 'CVC',
      }}
    />
  );
};

export { CreditCard };
