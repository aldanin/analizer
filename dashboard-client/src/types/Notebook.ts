import { TagData } from './Tag';

export interface NotebookData {
  numberOfPosts: number;
  authorsList: string[];
  posts: NotebookPostData[];
  user: UserData;
  allUsers: NotebookMentionData[];
}

export interface NotebookPostData {
  id: number;
  user: UserData;
  timestamp: number;
  mentions: NotebookMentionData[];
  tags: TagData[];
  content: string;
  comments: NotebookCommentData[];
}

export interface NotebookCommentData {
  id: number;
  user: UserData;
  timestamp: number;
  tags: TagData[];
  content: string;
}

export interface NotebookMentionData {
  id: number;
  user: UserData;
}

export interface UserData {
  id: number;
  name: string;
  avatar: string;
}
