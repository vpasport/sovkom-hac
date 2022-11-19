import type { NotificationPropsWithType } from '../components/Notification/notification.type';

import React, { useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { Notification } from '../components';
import { NotificationContext } from '../contexts';
import { INotification } from '../contexts/NotificationsContext/notificationsContext.types';

const useNotifications = () => {
  const { notifications, setNotifications, maxNotifications, deleteMS } =
    useContext(NotificationContext);

  const pushNotifications = ({
    type,
    header,
    description,
    custom = null,
    onClose = () => {},
    onMouseEnter = () => {},
    onMouseLeave = () => {},
    ...other
  }: NotificationPropsWithType) => {
    setNotifications((prev) => {
      console.log(1);

      const tmp = [...prev];
      if (notifications.length === maxNotifications) {
        tmp.shift();
      }

      const id = uuidv4();
      const deleteNotification = () => {
        const element = document.getElementById(id);
        if (element) {
          element.setAttribute(
            'style',
            'transform: translate(120%) scale(0.5); opacity: 0',
          );
          // element.style =
          // 	'transform: translate(120%) scale(0.5); opacity: 0';
          element.addEventListener('transitionend', () => {
            setNotifications((prev: INotification[]) =>
              prev.filter((el) => el.id !== id),
            );
          });
        } else {
          setNotifications((prev) => prev.filter((el) => el.id !== id));
        }
      };

      let timer = setTimeout(deleteNotification, deleteMS);

      const component = (
        <Notification
          id={id}
          key={id}
          type={type}
          header={header}
          description={description}
          onClick={() => {
            clearTimeout(timer);
            deleteNotification();
            onClose();
          }}
          onMouseEnter={(e) => {
            clearTimeout(timer);
            onMouseEnter(e);
          }}
          onMouseLeave={(e) => {
            timer = setTimeout(deleteNotification, 2000);
            onMouseLeave(e);
          }}
          {...other}
        >
          {type === 'custom' && custom !== null && custom}
        </Notification>
      );

      tmp.push({
        id: id,
        component,
      });

      return [...tmp];
    });
  };

  return { pushNotifications };
};

export { useNotifications };
