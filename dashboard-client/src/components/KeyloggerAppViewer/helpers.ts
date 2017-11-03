import * as moment from 'moment'

export function getDurationStr(durationMs: number) {
  const duration = moment.duration(durationMs)
  const hours = ('00' + duration.hours()).slice(-2)
  const minutes = ('00' + duration.minutes()).slice(-2)
  const seconds = ('00' + duration.seconds()).slice(-2)

  return `${hours}:${minutes}:${seconds}`
}
