import { Product } from './Product';

export type AttachmentType = 'image' | 'video' | 'audio';

export type Direction = 'incoming' | 'outgoing';

export interface Participant {
    id: string,
    name: string,
    identifier: string,
    phoneNumber: string,
    status: string,
    about: string,
    homepage: string,
    address: {
        street?: string,
        city?: string,
        country?: string,
    },
    lastChat: number;
    lastModified: number;
    birthday: string;
    avatar?: string,
    partial?: boolean // Not implemented yet
}

export interface Attachment {
    id: string,
    path: string,
    type: AttachmentType,
    size: number,
}

export interface ChatMessage extends Product {
    from: Participant,
    to: Participant[],
    body: string,
    direction: Direction,
    timestamp: number,
    translatedBody?: string,
    attachments: Attachment[],
    isFirstOnDate?: boolean,
}

export interface ChatConversation {
    id: string,
    name: string;
    appName: string,
    isGroup: boolean,
    participants: Participant[],
    chat: ChatMessage[],
}

export interface Conversations {
    conversations: ChatConversation[]
}