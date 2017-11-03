import * as moment from 'moment'
import * as React from 'react';
import SearchMarker from '../components/Common/SearchMarker';
import { isNullOrUndefined } from './General'
import { DateFormats } from './enums'

export const addSearchMarker = (withMarker: boolean, children: string) => {
  withMarker = !isNullOrUndefined(withMarker) ? withMarker : true;
  const jsx = withMarker
    ? <SearchMarker>{children || ''}</SearchMarker>
    : children

  return jsx;
}

export function msToDateString(ms: number, formatOptions?: DateFormats) {
  formatOptions = formatOptions || DateFormats.dateAndTime;
  let formatter;
  let date;

  switch (formatOptions) {
    case DateFormats.dateAndTime:
      formatter = 'DD/MM/YYYY  HH:mm';
      break;
    case DateFormats.dateOnly:
      formatter = 'DD/MM/YYYY';
      break;
    case DateFormats.timeOnly:
      formatter = 'HH:mm';
      break;
    case DateFormats.timeWhenToday:
      formatter = isToday(ms) ? 'HH:mm' : 'DD/MM/YYYY';
      break;
    case DateFormats.dateOnlyWithShortNames:
      if (isToday(ms)) {
        date = 'Today';
      } else if (isYesterday(ms)) {
        date = 'Yesterday';
      } else {
        formatter = 'DD/MM/YYYY';
      }
      break;
    default:
      break;
  }

  date = date || (ms ? moment(ms).format(formatter) : null);
  return date;
}

export function addLeadingZeros(n: number, w: number) {
  const num = Math.abs(n);
  const zeros = Math.max(0, w - Math.floor(num).toString().length);
  let zeroString = Math.pow(10, zeros).toString().substr(1);
  if (n < 0) {
    zeroString = '-' + zeroString;
  }

  return zeroString + n;
}

export function msSpanToString(milliSecondsIn: number) {
  let secsIn = milliSecondsIn / 1000;

  let hours = addLeadingZeros(Math.floor(secsIn / 3600), 2),
    remainder = secsIn % 3600,
    minutes = addLeadingZeros(Math.floor(remainder / 60), 2),
    seconds = addLeadingZeros(Math.floor(remainder % 60), 2);

  return ( hours + ':'
    + minutes + ':'
    + seconds);
}

export function fileSizeFormatter(sizeKB: number) {

  let formatted;
  if (!sizeKB) {
    sizeKB = 0;
  }

  if (sizeKB < 1000) {
    formatted = `${sizeKB.toFixed(2)}KB`
  } else {
    sizeKB = sizeKB / 1000;

    if (sizeKB < 1000) {
      formatted = `${sizeKB.toFixed(2)}MB`
    } else {
      sizeKB = sizeKB / 1000;

      if (sizeKB < 1000) {
        formatted = `${sizeKB.toFixed(2)}GB`
      }
    }
  }

  return formatted;
}

export function isToday(timestamp: number): boolean {
  return moment().isSame(moment(timestamp), 'day')
}

export function isYesterday(timestamp: number): boolean {
  return moment().add(-1, 'days').isSame(moment(timestamp), 'day')
}
