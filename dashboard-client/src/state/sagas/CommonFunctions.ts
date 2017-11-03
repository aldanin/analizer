import ApiGetInstance from '../../api'
import { Filters } from '../../types/GenericFilters'
import { PRODUCT_TYPES } from '../../types/Product'

export const agentIdSelector = state => state[PRODUCT_TYPES.APP].get('agentId');

export function apiGetData(apiName: string, payload: { agentId, skip: number, limit: number, filters: Filters }) {
  const api = ApiGetInstance();
  const {agentId, skip, limit} = payload;

  return api[apiName](
    {agentId},
    {skip, limit})
    .then((result) => {
      return result
    })
}
