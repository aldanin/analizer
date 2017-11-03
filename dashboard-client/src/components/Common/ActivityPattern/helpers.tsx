import * as moment from 'moment'

export function msToDateString(ms?: number) {
  let date = ms ? moment(ms).format('DD/MMM/YYYY  HH:mm') : undefined;
  return date;
}

export function addLeadingZeros(n: number, w: number) {
  var num = Math.abs(n);
  var zeros = Math.max(0, w - Math.floor(num).toString().length);
  var zeroString = Math.pow(10, zeros).toString().substr(1);
  if (n < 0) {
    zeroString = '-' + zeroString;
  }

  return zeroString + n;
}
