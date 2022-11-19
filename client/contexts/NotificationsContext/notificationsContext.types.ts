import type {
  ReactNode,
  ReactComponentElement,
  FC,
  Dispatch,
  SetStateAction,
} from 'react';

export interface INotification {
  id: string;
  component: ReactNode;
}

export interface INotificationContext {
  notifications: INotification[];
  setNotifications: Dispatch<SetStateAction<INotification[]>>;
  maxNotifications: number;
  deleteMS: number;
}

export interface NotificationContextProviderProps {
  max?: number;
  deleteMS?: number;
  children?: ReactNode;
}
