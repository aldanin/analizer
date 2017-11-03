import * as Agent from '../types/Agent'
import { TargetId } from '../types/Target'

let lastId = 0
const names = [
  'xxx',
  'yyy',
  'zzz',
  'wtf',
  'Boris',
  'Bond',
  'James',
]

const DEVICE_TYPES = [
  {
    device: Agent.AGENT_DEVICE_PHONE,
    os: Agent.AGENT_OS_ANDROID,
  },
  {
    device: Agent.AGENT_DEVICE_PHONE,
    os: Agent.AGENT_OS_IOS,
  },
  {
    device: Agent.AGENT_DEVICE_DESKTOP,
    os: Agent.AGENT_OS_WINDOWS,
  },
  {
    device: Agent.AGENT_DEVICE_DESKTOP,
    os: Agent.AGENT_OS_MACOS,
  },
  {
    device: Agent.AGENT_DEVICE_CLOUD,
    os: 'foo',
  }
]

function pickOne (arr: Array<any>, idx: number) {
  return arr[idx % arr.length]
}

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max)
}

export const getAgent: (targetId: TargetId) => Agent.AgentData = (targetId) => {
  lastId++
  const extractionsTotal = getRandomInt(50)
  const dataUsageLastWeek = getRandomInt(200)
  const device = pickOne(DEVICE_TYPES, lastId)

  return {
    id: lastId.toString(),
    name: pickOne(names, lastId),
    targetId: targetId,
    deviceType: device.device,
    deviceOs: device.os,
    expiry: (Date.now() + getRandomInt(7) * 24 * 60 * 60 * 1000),
    extractInterval: getRandomInt(48) * 60 * 60 * 1000, // hours
    status: {
      lastCommunication: Date.now(),
      lastExtract: Date.now(),
      extractionsTotal: extractionsTotal,
      extractionsSuccesful: Math.round(extractionsTotal * Math.random()),
      dataUsageLastDay: Math.round(dataUsageLastWeek / 7) / 10,
      dataUsageLastWeek: dataUsageLastWeek / 10,
    },
    counters: {
      im: getRandomInt(50),
      calls: getRandomInt(50),
      mail: getRandomInt(50),
      contacts: getRandomInt(50),
      socialNetwork: getRandomInt(50),
      browser: getRandomInt(50),
      gallery: getRandomInt(50),
      calendar: getRandomInt(50),
      activity: getRandomInt(50),
      envAudio: getRandomInt(50),
      snapshots: getRandomInt(50),
      locations: getRandomInt(50),
      directory: getRandomInt(50),
      accounts: getRandomInt(50),
      systemInfo: getRandomInt(50),
    }
  }
}
