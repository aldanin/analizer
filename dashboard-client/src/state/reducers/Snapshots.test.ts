import snapshotsReducer from './Snapshots'
import { fromJS }  from 'immutable'
import { PRODUCT_TYPES } from '../../types/Product'

it('should ignore unknown actions', () => {
  const state = fromJS({
    isFetching: false,
    lastFetchTs: 123,
    error: null,
    data: [],
  })
  expect(snapshotsReducer(state, {
    type: 'unknown',
    productType: PRODUCT_TYPES.SNAPSHOTS})).toEqual(state)
})
