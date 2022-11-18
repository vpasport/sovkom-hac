import type { FC } from 'react';
import type { IIcon } from '../../index.types';

const Cross: FC<IIcon> = ({ className = '' }) => {
  return (
    <svg
      className={className}
      width="37"
      height="36"
      viewBox="0 0 37 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1.50536 30.1387C0.164554 31.4795 0.164553 33.6534 1.50536 34.9942C2.84617 36.335 5.02005 36.335 6.36086 34.9942L18.4995 22.8556L30.6386 34.9947C31.9794 36.3355 34.1533 36.3355 35.4941 34.9947C36.8349 33.6539 36.8349 31.48 35.4941 30.1392L23.355 18.0001L35.4939 5.86122C36.8347 4.52042 36.8347 2.34654 35.4939 1.00573C34.1531 -0.33508 31.9792 -0.33508 30.6384 1.00573L18.4995 13.1446L6.36113 1.00619C5.02032 -0.334617 2.84644 -0.334618 1.50563 1.00619C0.164815 2.347 0.164814 4.52088 1.50562 5.86168L13.644 18.0001L1.50536 30.1387Z"
        fill="#C7302B"
      />
    </svg>
  );
};

export { Cross };
