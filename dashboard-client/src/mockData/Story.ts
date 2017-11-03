import { StoryData } from '../types/Story'
import { getKeystrokes } from './Keylogger'
import { getScreenshotData } from './Screenshot'

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max)
}

let lastStoryId = 1

export const getStoryData: () => StoryData =
() => {
  const timeStart = 150000 + getRandomInt(100000)
  const durationMs = 2000 + getRandomInt(50000)
  const keyStrokesDelay = Math.round(Math.random() * durationMs * 0.25)
  const keyStrokesStart = timeStart + keyStrokesDelay
  const maxKeystrokesDuration = durationMs - keyStrokesDelay
  const keyStrokesDuration = Math.min(
    700 + Math.ceil((maxKeystrokesDuration - 700) * Math.random()),
    maxKeystrokesDuration
  )

  return {
    id: lastStoryId++,
    timeStart,
    durationMs,
    keyStrokes: [
      getKeystrokes(keyStrokesStart, keyStrokesDuration)
    ],
    screenshot: getScreenshotData(lastStoryId),
  }
}
