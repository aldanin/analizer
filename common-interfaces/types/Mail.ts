import {Product} from './Product';

export interface MailData extends Product {
  app: string;
  from: string;
  to: string[];
  cc: string[];
  bcc: string[];
  subject: string;
  body: string;
  attachments: string[];
  timestamp: string;
}