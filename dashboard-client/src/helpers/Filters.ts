import * as Filters from '../types/GenericFilters'
import * as Immutable from 'immutable'
import * as Tags from '../types/Tag'

export function updateBooleanFilters_(oldFilters: Set<string>, key: string, enabled: boolean) {
  //
  // As filters are saved in the store, we need filter objects to be immutable:
  //
  const filters = new Set(oldFilters);

  const found = filters.has(key);
  if (enabled) {
    //
    // If the requested filetr is enabled, we search for it in the current filter list.
    // If not fopund, we add it:
    //
    if (!found) {
      //
      // A new filter to bew added to the boolean filter list:
      //
      filters.add(key);
    }
  } else {
    //
    // We have the requested filter in the boolean filters list,
    // and now we ned to splice it out ( disabled state ):
    //
    filters.delete(key);
  }

  return filters;
}

export function updateTagFilters(oldFilters: Set<Tags.TagId>, tagIds: Tags.TagId[], enabled: boolean) {
  //
  // As filters are saved in the store, we need filter objects to be immutable:
  //
  const filters = new Set(oldFilters);

  tagIds.forEach(tagId => {
    const found = filters.has(tagId);

    if (enabled) {
      //
      // If the requested filetr is enabled, we search for it in the current filter list.
      // If not found, we add it:
      //
      if (!found) {
        //
        // A new filter to bew added to the boolean filter list:
        //
        filters.add(tagId);
      }

    } else {
      //
      // We have the requested filter in the boolean filters list,
      // and now we ned to splice it out ( disabled state ):
      //
      filters.delete(tagId);
    }
  })

  return filters;
}

export function updateBooleanFilters(oldFilters: Filters.Filters, key: string, enabled: boolean) {
  //
  // As filters are saved in the store, we need filter objects to be immutable:
  //
  const filters = Immutable.fromJS(oldFilters).toJS();

  const found = filters.boolean.find(x => x === key);
  if (enabled) {
    //
    // If the requested filetr is enabled, we search for it in the current filter list.
    // If not found, we add it:
    //
    if (!found) {
      //
      // A new filter to bew added to the boolean filter list:
      //
      filters.boolean.push(key);
    }
  } else {
    //
    // We have the requested filter in the boolean filters list,
    // and now we ned to splice it out ( disabled state ):
    //
    const index = filters.boolean.indexOf(found);
    filters.boolean.splice(index, 1);
  }
  return filters;
}
export const updateSortFilter = (oldFilters: Filters.Filters, sortBy: string, sortDirection: boolean) => {
  //
  // As filters are saved in the store, we need filter objects to be immutable:
  //
  const filters = Immutable.fromJS(oldFilters).toJS();

  filters.sort.sortBy = sortBy;
  filters.sort.desc = sortDirection !== null && filters.sort.desc !== undefined
    ? sortDirection
    : false;

  return filters;
}

export const updateDatesFilter = (oldFilters: Filters.Filters, date: number) => {
  const filters = Immutable.fromJS(oldFilters).toJS();

  filters.dates = {
    startDate: date,
    endDate: null
  }

  return filters;
}

export const compareFilters = (oldFilters: Filters.FiltersExt, newFilters: Filters.FiltersExt) => {
  const result = Immutable.fromJS(oldFilters).equals(Immutable.fromJS(newFilters))

  return result;
}
