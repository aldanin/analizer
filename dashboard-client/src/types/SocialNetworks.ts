import { ProductData } from './Product';

export interface TwitterData {
  id: TwitterId;
  user: UserData;
  location: SocialNetworksLocation;
  joinedDate: number;
  tweets: TweeterMessage[];
  mentions: TweeterMention[];
  following: TweeterFollow[];
  followers: TweeterFollow[];
}

export interface SocialNetworksLocation {
  city: string;
  country: string;
}

export interface TweeterMessage extends ProductData {
  user: UserData;
  postDate: number;
  content: string;
  comments: TweeterMessage[];
  likes: number;
  shares: number;
}

export interface TweeterMention extends ProductData {
  user: UserData;
  postDate: number;
  contentBefore: string;
  contentAfter: string;
  comments: number,
  likes: number;
  shares: number;
}

export interface TweeterFollow extends ProductData {
  user: UserData;
  status: string;
}

export interface LinkedinData {
  id: LinkedinId;
  user: UserData;
  headline: string;
  currentPosition: string;
  profile: LinkedinProfile;
  search: SearchData[];
  connection: ConnectionsData[];
}

export interface LinkedinProfile {
  experience: LinkedinExperienceData[];
  education: LinkedinEducationData[];
  skills: SkillData[];
}

export interface LinkedinExperienceData extends ProductData {
  headline: string;
  position: string;
  fromTime: number;
  toTime: number;   // -1 to present current time
  description: string;
}

export interface LinkedinEducationData extends ProductData {
  headline: string;
  degree: string;
  fromTime: number;
  toTime: number;
}

export interface SkillData {
  title: string;
  level: number;
}

export interface SearchData extends ProductData {
  lookingFor: string;
}

export interface ConnectionsData extends ProductData {
  user: UserData;
  headline: string;
  position: string;
}

export interface UserData {
  id: number;
  avatar: string;
  name: string;
  nickname?: string;
}

export type TwitterId = number;
export type LinkedinId = number;
export type TwitterMessageId = number;
