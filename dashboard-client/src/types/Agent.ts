import { TargetId } from './Target'

export interface AgentData {
  id: AgentId,
  name: string,
  targetId: TargetId,
  deviceType: AgentDeviceType,
  deviceOs: AgentDeviceOs,
  expiry: number,
  extractInterval: number,
  status: {
    lastCommunication: number,
    lastExtract: number,
    extractionsTotal: number,
    extractionsSuccesful: number,
    dataUsageLastDay: number,
    dataUsageLastWeek: number,
  },
  counters: {
    calls: number,
    im: number,
    mail: number,
    contacts: number,
    socialNetwork: number,
    browser: number,
    gallery: number,
    calendar: number,
    activity: number,
    envAudio: number,
    snapshots: number,
    locations: number,
    directory: number,
    accounts: number,
    systemInfo: number,
  }
}

export interface AgentUnreadProducts {
  productSum: {
    userApps: number;
    sensors: number;
    deviceSystem: number;
  }
  userApps: {
    calls: number;
    im: number;
    mail: number;
    contacts: number;
    socialNetwork: number;
    browser: number;
    gallery: number;
    calendar: number;
  },
  sensors: {
    activity: number;
    snapshots: number;
    envAudio: number;
    locations: number;
  },
  deviceSystem: {
    directory: number;
    systemInfo: number;
    accounts: number;
  }
}

export type AgentId = string

export const AGENT_DEVICE_PHONE = 'Phone'
export const AGENT_DEVICE_DESKTOP = 'Desktop'
export const AGENT_DEVICE_CLOUD = 'Cloud'
export const AGENT_OS_ANDROID = 'Android'
export const AGENT_OS_IOS = 'iOS'
export const AGENT_OS_WINDOWS = 'Windows'
export const AGENT_OS_MACOS = 'osx'

export type AgentDeviceType = string
export type AgentDeviceOs = string
