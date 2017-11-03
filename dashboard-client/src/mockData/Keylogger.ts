import { KeylogData } from '../types/Keylog'

const PROCESSES = [
  'chrome',
  'mine swipper',
  'paint',
  'word',
  'photoshop',
  'ie',
  'firefox',
]

const URLS = [
  'http://foo.com',
  'http://bar.com',
  'http://google.com',
  'http://facebook.com',
  'http://google.com',
  'https://www.youtube.com/watch?v=RCVAkCrJDdw&t=2560s',
  'http://hotmail.com/foo/bar',
  'https://gmail.com',
]

const LOREM_IPSUM = [
  'Lorem ipsum dolor sit amet, ',
  'consectetur adipiscing elit, ',
  'sed do eiusmod tempor incididunt',
  'ut labore et dolore magna aliqua. ',
  'Ut enim ad minim veniam, quis nostrud',
  'exercitation ullamco laboris nisi ut',
  'aliquip ex ea commodo consequat. Duis',
  'aute irure dolor in reprehenderit in',
  'voluptate velit esse cillum dolore eu',
  'fugiat nulla pariatur. Excepteur',
  'sint occaecat cupidatat non proident,',
  'sunt in culpa qui officia deserunt mollit anim',
  'id est laborum.'
]

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max)
}

export const getContext = (startOffset = 0, duration = 1000) => {
  return {
    process: PROCESSES[getRandomInt(PROCESSES.length)],
    url: URLS[getRandomInt(URLS.length)],
    content: LOREM_IPSUM[getRandomInt(LOREM_IPSUM.length)] + ' ' + LOREM_IPSUM[getRandomInt(LOREM_IPSUM.length)],
    startOffset: startOffset,
    durationMs: duration,
  }
}

let lastKeylogId = 0

export const getKeystrokes: (parentStart?: number, parentDuration?: number) => KeylogData =
  (parentStart = 0, parentDuration = 15000) => {
  const contextsCount = 1 + getRandomInt(4)
  const contextLength = Math.floor(parentDuration / contextsCount)
  const contexts = []
  for (var i = 0; i < contextsCount; i++) {
    contexts.push(
      getContext(contextLength * i, contextLength)
    )
  }

  return {
    id: lastKeylogId++,
    timeStart: parentStart,
    durationMs: parentDuration,
    contexts: contexts,
    isFavorite: lastKeylogId % 7 === 0,
    hasNotes: lastKeylogId % 17 === 0,
    hasTranslation: lastKeylogId % 31 === 0,
    isRead: lastKeylogId % 3 !== 0,
    tags: [],
  }
}
