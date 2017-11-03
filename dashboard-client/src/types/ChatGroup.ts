import { ContactPerson,  defaultPerson } from './ContactPerson'

export type  ChatGroupId = number;

export interface ChatGroup {
  id: ChatGroupId,
  name: string,
  photoUrl: string,
  members: ChatMember[]
}

export const defaultChatGroup = {
  id: -1,
  name: 'chatgroup',
  photoUrl: '',
  members: []
}

export interface ChatMember {
  person: ContactPerson,
  chatGroups: ChatGroup[]
}

export const defaultChatMember = {
  person: defaultPerson,
  chatGroups: [defaultChatGroup]
}
