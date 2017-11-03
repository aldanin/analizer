import { TagData } from './Tag'
import { ActivityTable } from './ActivityPattern'
import { APP_SYMBOLS } from './AppSymbols'

export interface AccountItem {
  id: number;
  accountName: string;
  password: PasswordItem; // is PASSWORD_CONFLICT ( see below ) if 'conflictedPasswords' has values
  conflictedPasswords?: ConflictingPassword[] // is null if 'password' is not PASSWORD_CONFLICT
  passwordRemarks?: string; // will add a notes icon to password
  passwordTranscription?: string; // will add a transcription icon to password
  service: AppSymbol;
  platform: AppSymbol;
  lastUsed: number; // Date in ms from start of dates
  prevPasswords?: PasswordItem[];
  remarks?: string;
  transcription?: string;
  isFavorite?: boolean;
  tags?: TagData[];

  insights: {
    activityPattern?: ActivityTable
  };
}

export const defaultAccountItem: AccountItem = {
  id: -1,
  accountName: 'ace of base',
  service: APP_SYMBOLS.twitter,
  password: {value: 'password007', lastUsed: 1898289821},
  prevPasswords: [{value: 'b4ssword007', lastUsed: 1198289821}],
  platform: APP_SYMBOLS.chrome,
  lastUsed: 898289821,
  isFavorite: false,
  tags: [],
  insights: {}
};

export const INITIAL_ID = 0;

export interface BooleanFilter {
  key: string;
  // caption:string;
  state: boolean;
}

export interface PasswordItem {
  value: string;
  lastUsed: number; // date
  // details?: EntityNotification;
  // remarks?: string;
  // hasTranscription?: boolean
}

export interface ConflictingPassword {
  value: string;
  actionStatus: PasswordAction;
  actionDate: number;
}

export interface AppSymbol {
  key: string,
  caption: string
}

export const PASSWORD_DEFAULT = {
  value: '',
  lastUsed: 0
}

export const isDefaultPassword = (password: PasswordItem) => {
  const temp = PASSWORD_DEFAULT;
  return password.value === temp.value && password.lastUsed === temp.lastUsed;
}

export enum PasswordAction {
  manuallyAdded = 1,
  extracted = 2,
}
