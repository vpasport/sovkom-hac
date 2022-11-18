import React from 'react';

import { toClassName } from '@utils/toClassName';
import styles from './style.module.scss';

const Loader = ({ className = '', ...props }) => (
  <div className={toClassName(styles.loader, className)} {...props} />
);

export { Loader };
