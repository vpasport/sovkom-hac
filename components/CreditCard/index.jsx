/*eslint-disable*/
import CreditCardInput from 'react-credit-card-input';

import { useState } from 'react';

const CreditCard = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCVC] = useState('');

  const handleCardNumberChange = (e) => {
    console.log(e);

    setCardNumber(e.target.value);
  };

  const handleCardExpiryChange = (e) => {
    console.log(e);

    setExpiry(e.target.value);
  };

  const handleCardCVCChange = (e) => {
    console.log(e);

    setCVC(e.target.value);
  };

  return (
    <CreditCardInput
      cardNumberInputProps={{ value: cardNumber, onChange: handleCardNumberChange }}
      cardExpiryInputProps={{ value: expiry, onChange: handleCardExpiryChange }}
      cardCVCInputProps={{ value: cvc, onChange: handleCardCVCChange }}
      fieldClassName="input"
    />
  );
};

export { CreditCard };
