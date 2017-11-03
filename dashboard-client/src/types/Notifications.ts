export interface NotificationData {
  title: string,
  content: string,
  isRead: boolean,
  created: number,
  id: NotificationId,
}

export type NotificationId = string

export const INITIAL_ID = '0'
