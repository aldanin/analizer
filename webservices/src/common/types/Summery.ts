export interface DeviceSystem {
    accounts: number
    directory: number
    systemInfo: number
}
export interface Sensors {
    activity: number
    envAudio: number
    locations: number
    snapshots: number
}

export interface UserApps {
    browser: number
    calendar: number
    calls: number
    contacts: number
    gallery: number
    im: number
    mail: number
    socialNetwork: number
}

export interface ProductSum {
    appUsers: number
    sensors: number
    deviceSystem: number
}

export interface Summery {
    deviceSystem: DeviceSystem
    sensors: Sensors
    userApps: UserApps
    productSum: ProductSum
}