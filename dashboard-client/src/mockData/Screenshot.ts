import { ClickData, ScreenshotData, ScreenshotId } from '../types/Screenshot'

export const getClickData: (width: number, height: number, parentTs: number, parentDurationMs: number) => ClickData =
(width, height, parentTs, parentDurationMs) => {
  const offset = Math.ceil(Math.random() * parentDurationMs);
  return {
    x: 50 + Math.ceil(Math.random() * (width - 100)),
    y: 50 + Math.ceil(Math.random() * (height - 100)),
    timestamp: parentTs + offset,
    timeOffset: offset,
  }
}

export const getScreenshotData: (id: ScreenshotId, durationMs?: number) => ScreenshotData =
(id, durationMs) => {
  durationMs = durationMs || Math.ceil(Math.random() * 5000)
  const width = 200 + Math.ceil(Math.random() * 10) * 100
  const height = 200 + Math.ceil(Math.random() * 10) * 100
  const timeTaken = 150000 + Math.ceil(Math.random() * 100000)
  const clicksCount = Math.ceil(durationMs / 2000)
  const clicks = []
  for (var i = 0; i < clicksCount; i++) {
    clicks.push(getClickData(width, height, timeTaken, durationMs))
  }

  return {
    id: id,
    imageUrl: `https://unsplash.it/${width}/${height}`,
    timeTaken: timeTaken,
    timeExtracted: timeTaken + Math.ceil(Math.random() * 10000),
    clicks,
    width: width,
    height: height,
    isFavorite: Math.random() > 0.75,
    hasNotes: false,
    hasTranslation: false,
    isRead: true,
    tags: [],
  }
}
export const MAX_ID = 1000

export const getScreenshotsBatch = (aId, count, isOlder) => {
  let toLoad
  if (isOlder) {
    toLoad = count > aId ? aId : count
  } else {
    toLoad = aId + count > MAX_ID ? MAX_ID - aId : count
  }
  let id = parseInt(aId, 10) + (isOlder ? -1 : toLoad + 1)
  const res = []
  for (let i = 0; i < toLoad; i++) {
    res.push(getScreenshotData(id - i))
  }
  return res
}
