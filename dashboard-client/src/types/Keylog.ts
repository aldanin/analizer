import { ProductData } from './Product'

export interface Context {
  process: string,
  url: string,
  content: string,
  startOffset: number,
  durationMs: number,
}

export interface KeylogData extends ProductData {
  id: KeylogId,
  timeStart: number,
  durationMs: number,
  contexts: Context[],
}

export type KeylogId = number
