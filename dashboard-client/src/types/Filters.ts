export type DataKey = string;

export interface FiltersData {
  boolean: string[],
  sort: {
    sortBy: DataKey,
    desc: boolean
  },
  dates?: {
    startDate: number,
    endDate: number,
  }
}

export const DEFAULT_FILTERS = {
  boolean: [],
  sort: {
    sortBy: null,
    desc: false
  },
  dates: {
    startDate: null,
    endDate: null,
  }
}
