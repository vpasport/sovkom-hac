import React, { FC } from 'react';
import { useRouter } from 'next/router';

import { AdminMenu, UserMenu } from './Types';

interface MenuProps {
  admin: boolean;
}

const Menu: FC<MenuProps> = ({ admin = false }) => {
  const router = useRouter();

  return React.createElement(admin ? AdminMenu : UserMenu, {
    path: router.pathname,
    router,
  });
};

export { Menu };
