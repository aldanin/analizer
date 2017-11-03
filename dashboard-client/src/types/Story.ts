import { ScreenshotData } from './Screenshot'
import { KeylogData } from './Keylog'

export interface StoryData {
  id: StoryId,
  timeStart: number,
  durationMs: number,
  keyStrokes: KeylogData[],
  screenshot: ScreenshotData,
}

export type StoryId = number;
export const INITIAL_ID = 0
