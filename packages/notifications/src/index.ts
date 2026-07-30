export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'error';
  read: boolean;
  timestamp: string;
  app?: string;
  orgId?: string;
  userId?: number;
}
export interface NotificationPayload {
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'error';
  app?: string;
  orgId?: string;
  userId?: number;
}
