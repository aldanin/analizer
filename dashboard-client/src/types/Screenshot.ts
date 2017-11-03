import { ProductData } from './Product'

export interface ClickData {
  x: number,
  y: number,
  timestamp: number, // when happened
  timeOffset: number, // relative to screenshot timestamp
}

export interface ScreenshotData extends ProductData {
  id: ScreenshotId,
  imageUrl: string,
  timeTaken: number,
  timeExtracted: number,
  clicks: ClickData[],
  width: number,
  height: number,
}

export type ScreenshotId = number;
export const INITIAL_ID = 0
