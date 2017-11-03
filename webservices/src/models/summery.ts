import {Summery, DeviceSystem, Sensors, UserApps, ProductSum} from '../common/types/Summery';

class DeviceSystemModel implements DeviceSystem {
    public accounts: number;
    public directory: number;
    public systemInfo: number;

    static fromData(data: any) {
        let deviceSystem = <any>{};

        deviceSystem.accounts = data.accounts;
        deviceSystem.directory = data.direction;
        deviceSystem.systemInfo = data.systeminfo;

        return deviceSystem;
    }
}

class SensorsModel implements Sensors {
    public activity: number;
    public envAudio: number;
    public locations: number;
    public snapshots: number;

    static fromData(data: any) {
        let sensors = <any>{};

        sensors.activity = data.activity;
        sensors.envAudio = data.env_audio;
        sensors.locations = data.locations;
        sensors.snapshots = data.snapshots;

        return sensors;
    }
}

class UserAppsModel implements UserApps {
    public browser: number;
    public calendar: number;
    public calls: number;
    public contacts: number;
    public gallery: number;
    public im: number;
    public mail: number;
    public socialNetwork: number;

    static fromData(data: any) {
        let userApps = <any>{};

        userApps.browser = data.browser;
        userApps.calendar = data.calendar;
        userApps.calls = data.calls;
        userApps.contacts = data.contacts;
        userApps.gallery = data.gallery;
        userApps.im = data.im;
        userApps.mail = data.mail;
        userApps.socialNetwork = data.social_network;

        return userApps;
    }
}

class SummeryModel implements Summery {
    public deviceSystem: DeviceSystemModel;
    public sensors: Sensors;
    public userApps: UserApps;
    public productSum: ProductSum;

    static fromData(data: any) {
        let deviceSystemSum = 0;
        let deviceSystem = DeviceSystemModel.fromData(data.device_system);

        for (let key in deviceSystem) {
            deviceSystemSum += deviceSystem[key];
        }

        let sensorsSum = 0;
        let sensors = SensorsModel.fromData(data.sensors);

        for (let key in sensors) {
            sensorsSum += sensors[key];
        }

        let userAppsSum = 0;
        let userApps = UserAppsModel.fromData(data.user_apps);

        for (let key in userApps) {
            userAppsSum += userApps[key];
        }

        return {
            deviceSystem: deviceSystem,
            sensors: sensors,
            userApps: userApps,
            productSum: {
                userApps: userAppsSum || 0,
                sensors: sensorsSum || 0,
                deviceSystem: deviceSystemSum || 0

            }
        };
    }
}

export default SummeryModel;