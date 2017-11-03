import * as moment from 'moment'

export function msToDateString(ms?: number) {
  let date = ms ? moment(ms).format('DD/MM/YYYY  HH:mm') : null;
  return date;
}

export function addLeadingZeros(n: number, length: number) {
  var str = (n > 0 ? n : -n) + '';
  var zeros = '';
  for (var i = length - str.length; i > 0; i--) {
    zeros += '0';
  }
  zeros += str;
  return n >= 0 ? zeros : '-' + zeros;
}
