import { CreditCard } from '@components';

const PaymentPage = () => (
  <CreditCard
    onCardNumber={(val) => console.log('card number:', val)}
    onExp={(val) => console.log('expiry:', val)}
    onCVC={(val) => console.log('cvc:', val)}
  />
);

export default PaymentPage;
