import React, { FC, useState, useEffect, useCallback } from 'react';

import { useRouter } from 'next/router';

import { TabMenu } from 'primereact/tabmenu';
import { Button } from 'primereact/button';

import { MenuTypeProps } from '../index.types';
import { ThemeChanger } from './ThemeChanger';

import styles from './styles.module.scss';
import { useTheme } from '../../../hooks';
import { Theme, toClassNames } from '../../../helpers';
import * as userApi from '../../../api/user';

const items = [
  { label: 'Новости', icon: 'pi pi-fw pi-home', path: '/admins/news' },
  {
    label: 'Пользователи',
    icon: 'pi pi-fw pi-calendar',
    path: '/admins/users',
  },
];

const AdminMenu: FC<MenuTypeProps> = ({ path, router }) => {
  const { theme } = useTheme();

  const [activeIndex, setActiveIndex] = useState<number | undefined>(undefined);

  const logout = useCallback(async () => {
    userApi.logout().then((data) => {
      console.log(data);
      router.push('/');
    });
  }, [router]);

  useEffect(() => {
    items.map(
      (el, idx) => new RegExp(`^${path}`).test(el.path) && setActiveIndex(idx),
    );
  }, [path]);

  return (
    <div
      className={toClassNames(
        styles.menu_container,
        theme === Theme.Dark && styles.menu_container__dark,
      )}
    >
      <TabMenu
        className={styles.menu_tabs_content}
        model={items}
        activeIndex={activeIndex}
        onTabChange={(e) => router.push(items[e.index].path)}
      />
      {/* <ThemeChanger /> */}
      <Button
        className={styles.menu_container_logout}
        onClick={() => logout()}
        label="Выйти"
      />
    </div>
  );
};

export { AdminMenu };
