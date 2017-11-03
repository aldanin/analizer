import { Product } from 'common-interfaces/types/Product';

export interface MailAppData {
  accounts: AccountMailData[];
}

export interface AccountMailData {
  id: string;
  email: string;
  avatar: string;
  labels: MailLabel[];
  inbox: MailData[];
}

export interface MailLabel {
  id: string;
  label: string;
  newItems: number;
}

export interface MailData extends Product {
  id: string;
  from: string;
  to: string[];
  cc: string[];
  subject: string;
  shortContent: string;
  attachments: Attachment[];
  body: JSX.Element | string;
  timestamp: number;
}

export interface Attachment {
  id: string;
  name: string;
}
