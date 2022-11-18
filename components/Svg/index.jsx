import React from 'react';

import * as svgTypes from './Types';

const Svg = ({ type, ...props }) => React.createElement(svgTypes[type], props);

export { Svg };
