import * as Redux from 'redux'
import * as Contacts from '../../types/Contacts';

export interface FiltersProps {
  filters: Contacts.Filters
}

export interface FiltersChangeActionProps extends Redux.Action {
  payload: {
    filters: Contacts.Filters
  }
}

export const CONTACTS_FILTERS_CHANGE = 'Contacts/FILTERS_CHANGE';

export function filtersChange(payload: FiltersProps): FiltersChangeActionProps {
  return {
    type: CONTACTS_FILTERS_CHANGE,
    payload,
  };
}
