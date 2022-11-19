import { useState } from 'react';

import Cards from 'react-credit-cards';
import { Input } from '@components';

import 'react-credit-cards/es/styles-compiled.css';

const CreditCard = () => {
  const [cardData, setCardData] = useState({
    cvc: '',
    expiry: '',
    focus: '',
    name: '',
    number: '',
  });

  const handleInputFocus = (e) => {
    setCardData({
      ...cardData,
      focus: e.target.name,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCardData({
      ...cardData,
      [name]: value,
    });
  };

  return (
    <div id="PaymentForm">
      <Cards
        cvc={cardData.cvc}
        expiry={cardData.expiry}
        focused={cardData.focus}
        name={cardData.name}
        number={cardData.number}
      />
      <Input placeholder="Card Number" onChange={handleInputChange} onFocus={handleInputFocus} />
    </div>
  );
};

export { CreditCard };
