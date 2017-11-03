import { TagData } from './Tag';
export interface CalendarData {
  accounts: CalendarAccounts[];
}

export interface CalendarAccounts {
  id: accountId;
  account: string;
  calendar: CalendarEvent[];
  isActive: boolean; // Initialize it always as true used inside the component (filter)
}

export interface CalendarEvent {
  id: calendarEventId;
  title: string;
  location: CalendarLocation;
  description: string;
  organizer: string;
  creationDate: number;
  participants: string[];
  attachments: CalendarFile[];
  lastAppear: number;
  fromTime: number;
  toTime: number;
  isNotebook: boolean;
  isFavorite: boolean;
  isFullDay: boolean;
  isNew: boolean;
  tags: TagData[];
}

export interface CalendarFile {
  id: calendarFileId;
  name: string;
  type: string;
}

export interface CalendarLocation {
  place: string;
  city: string;
  street: string;
  number: number; // Number of address
}

export type agendaId = number;
export type accountId = number
export type calendarEventId = number
export type calendarFileId = number
