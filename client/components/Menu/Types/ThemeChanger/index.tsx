import React, { FC, useState, useEffect, useContext } from 'react';

import { InputSwitch } from 'primereact/inputswitch';

import styles from './style.module.scss';
import { ThemeContext, toClassNames, Theme } from '../../../../helpers';

const ThemeChanger: FC = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <span className={styles.container}>
      <i
        className={toClassNames(
          'pi pi-sun',
          theme === Theme.Light && styles.sun__selected,
        )}
      />
      <InputSwitch
        checked={theme === Theme.Dark}
        onChange={({ value }) => setTheme(value ? Theme.Dark : Theme.Light)}
      />
      <i
        className={toClassNames(
          'pi pi-moon',
          styles.moon,
          theme === Theme.Dark && styles.moon__selected,
        )}
      />
    </span>
  );
};

export { ThemeChanger };
