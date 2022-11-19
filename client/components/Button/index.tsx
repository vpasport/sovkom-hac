import type { FC } from 'react';
import type { ButtonWithTypeProps } from './index.types';

import React from 'react';

import * as buttonTypes from './Types';

const Button: FC<ButtonWithTypeProps> = ({
  buttonType = 'default',
  ...props
}) => {
  return React.createElement(buttonTypes[buttonType], {
    ...props,
  });
};

export { Button };
