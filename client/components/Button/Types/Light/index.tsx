import type { FC } from 'react';
import type { ButtonProps } from '../../index.types';

import React from 'react';

import { toClassName } from '../../../../utils';
import styles from './style.module.scss';

const LightButon: FC<ButtonProps> = ({
  onClick = () => {},
  className = '',
  children = null,
  leftIcon: LeftIcon = null,
  rightIcon: RightIcon = null,
  ...props
}) => {
  return (
    <button
      onClick={onClick}
      className={toClassName(styles.button, className)}
      {...props}
    >
      {!!LeftIcon && LeftIcon}
      {!!children && children}
      {!!RightIcon && RightIcon}
    </button>
  );
};

export { LightButon };
