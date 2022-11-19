import type { ReactNode, HTMLAttributes } from 'react';

export type NotificationType =
  | 'default'
  | 'warning'
  | 'success'
  | 'error'
  | 'custom';

export interface NotificationProps extends HTMLAttributes<HTMLDivElement> {
  header?: string;
  description?: string;
  custom?: ReactNode;
  other?: any;
  onClose?: () => void;
}

export interface NotificationPropsWithType extends NotificationProps {
  type: NotificationType;
}
