import { TagId } from './Tag'

export type Search = string
export const DEFAULT_SEARCH = ''

export type Tags = TagId[]
export const DEFAULT_TAGS = []

export interface Indicators {
  important: boolean,
  notImportant: boolean,
  unmarked: boolean,
  unread: boolean,
  translated: boolean,
  inNotebook: boolean,
}
export const DEFAULT_INDICATORS = {
  important: false,
  notImportant: false,
  unmarked: false,
  unread: false,
  translated: false,
  inNotebook: false,
}

export interface Filters {
  search: Search,
  tags: Tags,
  indicators: Indicators,
}
export const DEFAULT_FILTERS: Filters = {
  search: DEFAULT_SEARCH,
  tags: DEFAULT_TAGS,
  indicators: DEFAULT_INDICATORS,
}

export interface FiltersExt extends Filters {
  boolean: Set<string>
}

export const DEFAULT_FILTERS_EXT = Object.assign(
  {
    boolean: new Set()
  },
  DEFAULT_FILTERS)
