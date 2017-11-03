import { addAlpha } from './helpers';

it('addAlpha functionality testing', () => {
  const FAIL = 'rgb(255, 255, 255)';

  if (addAlpha('#AF', 0.8) !== FAIL) {throw Error('TEST #1 FAIL')}
  if (addAlpha('#000', 50) !== 'rgba(0, 0, 0, 1)') {throw Error('TEST #2 FAIL')}
  if (addAlpha('#000D', 50) !== FAIL) {throw Error('TEST #3 FAIL')}
  if (addAlpha('#000DF', -50) !== FAIL) {throw Error('TEST #4 FAIL')}
  if (addAlpha('#FFFFFF', 0.6) !== 'rgba(255, 255, 255, 0.6)') {throw Error('TEST #5 FAIL')}
  if (addAlpha('#FFFFFF', 100) !== 'rgba(255, 255, 255, 1)') {throw Error('TEST #6 FAIL')}
  if (addAlpha('#FFFFFF', -50) !== 'rgba(255, 255, 255, 0)') {throw Error('TEST #7 FAIL')}
})

it('should return correct value for legal inputs', () => {
  expect(addAlpha('#000', 0.8)).toEqual('rgba(0, 0, 0, 0.8)')
  expect(addAlpha('#FFFFFF', 0.6)).toEqual('rgba(255, 255, 255, 0.6)')
})

it('should return default value for illegal color inputs', () => {
  const FAIL = 'rgb(255, 255, 255)';

  expect(addAlpha('#AF', 0.8)).toEqual(FAIL)
  expect(addAlpha('#000D', 0.8)).toEqual(FAIL)

})

it('should return min max for illegal opacity inputs', () => {
  expect(addAlpha('#FFF', 52)).toEqual('rgba(255, 255, 255, 1)')
  expect(addAlpha('#FFF', -2)).toEqual('rgba(255, 255, 255, 0)')
})
