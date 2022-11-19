import type { FC } from 'react';
import type { IIconWithType, IIconTypes } from './index.types';

import React from 'react';

import * as svgTypes from './Types';

const Svg: FC<IIconWithType> = ({ icon, ...props }) => {
  return React.createElement(svgTypes[icon as IIconTypes], props);
};

export { Svg };
