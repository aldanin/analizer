import { Product } from './Product';
import { EntityStatus } from './Enums'

export interface Contact extends Product {
    name: string,
    phoneHome: string,
    phoneWork?: string,
    phoneMobile?: string,
    email?: string,
    address?: {
        street?: string,
        city?: string,
        country?: string,
    },
    avatar: string,
    app: string,
    identifier?: string, // string used to identify the contact in the conversation
    details?: string,
    lastChat: number, // Should be converted from string to ms
    status?: EntityStatus
    //
    // Field usage is not clear, as the api mock didn't have it.
    // Anyway, should be converted from string to ms:
    //
    date: number,

    dateAdded: number, // Should be converted from string to ms
    dateModified?: number, // As for now not applied by the api. Anyway should be converted from string to ms
    lastOnline?: number, // was dateLastExtractionAppearance
    birthday?: number,
    // insights: {
    //   statistics: {
    //     ingoing: number,
    //     outgoing: number,
    //   },
    //   activityPattern: ActivityTable
    // }
}

