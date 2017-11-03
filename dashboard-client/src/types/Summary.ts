export interface SummaryData {
  userApps: UserApps;
  sensors: Sensors;
  deviceSystem: DeviceSystem;
}

export interface UserApps {
  calls: number;
  im: number;
  mail: number;
  contacts: number;
  socialNetwork: number;
  browser: number;
  gallery: number;
  calendar: number;
}

export interface Sensors {
  activity: number;
  snapshots: number;
  envAudio: number;
  locations: number;
}

export interface DeviceSystem {
  directory: number;
  systemInfo: number;
  accounts: number;
}

export interface MostActiveContactsData {
  avatar: string;
  name: string;
  bar: ActiveContactsBar;
}

export interface ActiveContactsBar {
  lastCommunication: number;
  calls: number;
  lastCall: number;
  im: number;
  lastIM: number;
  mails: number;
  lastMail: number;
}

export interface LatestCommands {
  timestamp: number;
  app: string;
  command: string;
  status: string;
}
