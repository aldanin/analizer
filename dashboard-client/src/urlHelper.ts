export const ViewPage = {
  SUMMARY: 'summary',
  CALLS: 'calls',
  INSTANT_MESSAGING: 'im',
  MAIL: 'mail',
  CONTACTS: 'contacts',
  SOCIAL_NETWORKS: 'social-networks',
  BROWSER: 'browser',
  GALLERY: 'gallery',
  CALENDAR: 'calendar',
  ACTIVITY: 'activity',
  SNAPSHOTS: 'snapshots',
  ENVIRONMENTAL_AUDIO: 'environmental',
  LOCATIONS: 'locations',
  DIRECTORY: 'directory',
  SYSTEM_INFO: 'system-info',
  ACCOUNTS: 'accounts',
  CONTROL: 'control',
}

const VIEW_INDEX = 2;

export interface ParamsData {  // Params inject to page from Router or component wrapped withRouter
  agent_id: string;
}

interface BuildUrlProps {
  agent_id: string,
  viewPage: string;
  tab?: string;
  itemId?: string;
}

export function buildURL(props: BuildUrlProps) {
  if (!!props.itemId) {
    // TODO: handle item_id link
  } else if (!!props.tab) {
    // TODO: handle tab link
  }

  return `/agent/${props.agent_id}/${props.viewPage}`;
}

export function getViewPageFromURL(location: any) {
  let myLocation = location.href;
  let result = '';
  const locationPath = location.origin;
  myLocation = myLocation.replace(locationPath + '/', '');
  const urlParameters = myLocation.split('/');

  if (urlParameters.length > VIEW_INDEX) {
    result = urlParameters[VIEW_INDEX];
  }

  return result;
}
