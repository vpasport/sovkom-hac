import React, { createContext, useState, useMemo } from 'react';

import styles from './style.module.scss';

const initNotificationsContext = {
  notifications: [],
  setNotifications: () => {},
  maxNotifications: 5,
  deleteMS: 5000,
};

const NotificationContext = createContext(initNotificationsContext);

const NotificationContextProvider = ({
  max = 5,
  deleteMS = 5000,
  children,
}) => {
  const [notifications, setNotifications] = useState([]);
  const config = useMemo(
    () => ({
      notifications,
      setNotifications,
      maxNotifications: max,
      deleteMS,
    }),
    [deleteMS, max, notifications],
  );

  return (
    <NotificationContext.Provider value={config}>
      {children}
      <div className={styles.notifications}>
        {notifications.length !== 0 && notifications.map((el) => el.component)}
      </div>
    </NotificationContext.Provider>
  );
};

export {
  NotificationContext,
  NotificationContextProvider,
  initNotificationsContext,
};
