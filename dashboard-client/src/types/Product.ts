import { TagData } from './Tag'

export type ProductID = number | string;

export type ProductType = string;

export interface ProductData {
  id: ProductID,
  isFavorite: boolean,
  hasNotes?: boolean,
  hasTranslation?: boolean,
  hasTranscript?: boolean,
  isRead: boolean,
  tags: TagData[];
}

export const PRODUCT_TYPES = {
  GALLERY: 'Gallery',
  SNAPSHOTS: 'Snapshots',
  BROWSER: 'Browser',
  BROWSER_BOOKMARK: 'browser_bookmarks',
  BROWSER_HISTORY: 'browser_history',
  CALENDAR: 'Calendar',
  SOCIAL_NETWORKS: 'Social-Networks',
  SOCIAL_NETWORKS_TWEETER: 'Social-Networks/Tweeter',
  SOCIAL_NETWORKS_TWEETER_MESSAGE: 'Social-Networks/Tweeter/Message',
  SOCIAL_NETWORKS_TWEETER_MENTION: 'Social-Networks/Tweeter/Mention',
  SOCIAL_NETWORKS_TWEETER_FOLLOWING: 'Social-Networks/Tweeter/Following',
  SOCIAL_NETWORKS_TWEETER_FOLLOWER: 'Social-Networks/Tweeter/Follower',
  SOCIAL_NETWORKS_LINKEDIN: 'Social-Networks/Linkedin',
  SOCIAL_NETWORKS_LINKEDIN_EXPERIENCE: 'Social-Networks/Linkedin/Experience',
  SOCIAL_NETWORKS_LINKEDIN_EDUCATION: 'Social-Networks/Linkedin/Education',
  SOCIAL_NETWORKS_LINKEDIN_CONNECTION: 'Social-Networks/Linkedin/Connection',
  SOCIAL_NETWORKS_LINKEDIN_SEARCH: 'Social-Networks/Linkedin/Search',
  DIRECTORY: 'Directory',
  DIRECTORY_TREE: 'Directory/Tree',
  DIRECTORY_FILES: 'Directory/Files',
  CONTACTS: 'Contacts',
  ACCOUNTS: 'Accounts',
  IM: 'IM',
  TOPIC: 'Topic',
  CHATMESSAGE: 'messages',
  KEYLOG: 'Keylog',
  SCREENSHOT: 'Screenshot',
  CALLS: 'Calls',
  LOCATION: 'Location',
  MAIL: 'Emails',
  NOTIFICATIONS: 'Notifications',
  USER: 'User',
  AGENTS: 'Agents',
  STORIES: 'Stories',
  TAGS: 'Tags',
  SUMMARY: 'Summary',
  SESSION: 'Session',
  OPERATIONS: 'Operations',
  TARGETS: 'Targets',
  NOTEBOOK: 'Notebook',
  APP: 'App',
  SEARCH: 'Search',
  GLOBAL_LOADERS: 'GlobalLoaders',
}

export const DEFAULT_PRODUCT = {
  id: '-1',
  isFavorite: null,
  hasNotes: null,
  hasTranslation: null,
  hasTranscript: null,
  isRead: null,
  tags: null,
}
