import type { FC } from 'react';
import type { ILoader } from './index.types';

import { toClassName } from '../../utils';
import styles from './style.module.scss';

const Loader: FC<ILoader> = ({ className = '', ...props }) => {
  return <div className={toClassName(styles.loader)} {...props} />;
};

export { Loader };
