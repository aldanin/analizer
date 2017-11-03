import * as Redux from 'redux'
import * as Immutable from 'immutable'
import { fromJS } from 'immutable'
import { LinkedinData } from '../../types/SocialNetworks';
import {
  LINKEDIN_REMOVE_TAG,
  LINKEDIN_SET_STAR,
  LINKEDIN_SORT_BY,
  LinkedinLoadFailAction,
  LinkedinLoadSuccessAction, LinkedinRemoveTagAction, LinkedinSetStarAction, LinkedinSortByAction, LOAD_LINKEDIN_FAIL,
  LOAD_LINKEDIN_REQUEST,
  LOAD_LINKEDIN_SUCCESS
} from '../actions/Linkedin';
import {
  PRODUCT_ADD_TAG, PRODUCT_MARK_AS_READ, ProductAddTagAction,
} from '../actions/ProductActions';
import { ProductAction, PRODUCT_MARK_AS_UNREAD } from '../actions/ProductActions';
import { PRODUCT_TYPES } from '../../types/Product';

export type Action = Redux.Action

interface State extends Immutable.Map<string, any>  {
  isFetching: boolean,
  isSorting: boolean;
  connectionSortBy: number,
  error: Error | null,
  data: LinkedinData,
}

export const initialState: State = fromJS({
  isFetching: true,
  isSorting: false,
  connectionSortBy: 0,
  error: null,
  data: null,
})

function linkedin(state: State = initialState, action: Action) {
  switch (action.type) {
    case LOAD_LINKEDIN_REQUEST: {
      return state
        .set('isFetching', true)
    }

    case LOAD_LINKEDIN_SUCCESS: {
      const { payload } = (<LinkedinLoadSuccessAction> action)
      return state
        .set('isSorting', false)
        .set('isFetching', false)
        .set('error', null)
        .set('data', fromJS(payload))
    }

    case LOAD_LINKEDIN_FAIL: {
      return state
        .set('isFetching', false)
        .set('error', (action as LinkedinLoadFailAction).error)
        .set('data', null)
    }

    case LINKEDIN_SORT_BY: {
      return state
        .set('isSorting', true)
        .set('error', false)
        .set('connectionSortBy', (action as LinkedinSortByAction).payload.selectedIndex)
    }

    case LINKEDIN_SET_STAR: {
      const path = (action as LinkedinSetStarAction).payload.path;
      path.splice(0, 0, 'data');
      const starData = state.getIn(path).toJS();

      const starIndex = starData.findIndex(
        item => item.id === (action as LinkedinSetStarAction).payload.id);
      path.push(starIndex);
      path.push('isFavorite');

      return state
        .setIn(path, (action as LinkedinSetStarAction).payload.isFavorite);
    }
    case LINKEDIN_REMOVE_TAG: {
      const path = (action as LinkedinRemoveTagAction).payload.path;
      path.splice(0, 0, 'data');
      const tagData = state.getIn(path).toJS();

      const tagIndex = tagData.findIndex(
        item => item.id === (action as LinkedinRemoveTagAction).payload.id);
      path.push(tagIndex);
      path.push('tags');

      return state
        .updateIn(path, (tags) => tags.filter (
          (tag) => tag.get('id') !== (action as LinkedinRemoveTagAction).payload.tagId
        ))
    }

    default:

      // LISTENER TO PRODUCT (GLOBAL) ACTIONS [Linkedin Experience]:
      if ('productType' in action &&
        (action as ProductAction).productType === PRODUCT_TYPES.SOCIAL_NETWORKS_LINKEDIN_EXPERIENCE) {
        switch (action.type) {
          case PRODUCT_ADD_TAG:
            const allIDs = (action as ProductAddTagAction).payload.ids;
            const allTags = (action as ProductAddTagAction).payload.tags;
            return state.withMutations(tempState => {
              allIDs.forEach(id => {
                const index = tempState.getIn(['data', 'profile', 'experience']).findIndex(tweet => {
                  return tweet.get('id') === id
                });
                allTags.map((tag) => {
                  tempState.updateIn(
                    ['data', 'profile', 'experience', index, 'tags'], (tags) => tags.push(fromJS(tag)));
                })
              })
            })

          case PRODUCT_MARK_AS_READ:
            return state.withMutations(tempState => {
              (action as ProductAddTagAction).payload.ids.forEach(id => {
                const index = tempState.getIn(['data', 'profile', 'experience']).findIndex(photo => {
                  return photo.get('id') === id
                });
                tempState.setIn(['data', 'profile', 'experience', index, 'isRead'], true);
              })
            })

          case PRODUCT_MARK_AS_UNREAD:
            return state.withMutations(tempState => {
              (action as ProductAddTagAction).payload.ids.forEach(id => {
                const index = tempState.getIn(['data', 'profile', 'experience']).findIndex(photo => {
                  return photo.get('id') === id
                });
                tempState.setIn(['data', 'profile', 'experience', index, 'isRead'], false);
              })
            })

          default:
        }
      }

      // LISTENER TO PRODUCT (GLOBAL) ACTIONS [Linkedin Education]:
      if ('productType' in action &&
        (action as ProductAction).productType === PRODUCT_TYPES.SOCIAL_NETWORKS_LINKEDIN_EDUCATION) {
        switch (action.type) {
          case PRODUCT_ADD_TAG:
            const allIDs = (action as ProductAddTagAction).payload.ids;
            const allTags = (action as ProductAddTagAction).payload.tags;
            return state.withMutations(tempState => {
              allIDs.forEach(id => {
                const index = tempState.getIn(['data', 'profile', 'education']).findIndex(tweet => {
                  return tweet.get('id') === id
                });
                allTags.map((tag) => {
                  tempState.updateIn(
                    ['data', 'profile', 'education', index, 'tags'], (tags) => tags.push(fromJS(tag)));
                })
              })
            })

          case PRODUCT_MARK_AS_READ:
            return state.withMutations(tempState => {
              (action as ProductAddTagAction).payload.ids.forEach(id => {
                const index = tempState.getIn(['data', 'profile', 'education']).findIndex(photo => {
                  return photo.get('id') === id
                });
                tempState.setIn(['data', 'profile', 'education', index, 'isRead'], true);
              })
            })

          case PRODUCT_MARK_AS_UNREAD:
            return state.withMutations(tempState => {
              (action as ProductAddTagAction).payload.ids.forEach(id => {
                const index = tempState.getIn(['data', 'profile', 'education']).findIndex(photo => {
                  return photo.get('id') === id
                });
                tempState.setIn(['data', 'profile', 'education', index, 'isRead'], false);
              })
            })

          default:
        }
      }

      // LISTENER TO PRODUCT (GLOBAL) ACTIONS [Linkedin Connection]:
      if ('productType' in action &&
        (action as ProductAction).productType === PRODUCT_TYPES.SOCIAL_NETWORKS_LINKEDIN_CONNECTION) {
        switch (action.type) {
          case PRODUCT_ADD_TAG:
            const allIDs = (action as ProductAddTagAction).payload.ids;
            const allTags = (action as ProductAddTagAction).payload.tags;
            return state.withMutations(tempState => {
              allIDs.forEach(id => {
                const index = tempState.getIn(['data', 'connection']).findIndex(tweet => {
                  return tweet.get('id') === id
                });
                allTags.map((tag) => {
                  tempState.updateIn(
                    ['data', 'connection', index, 'tags'], (tags) => tags.push(fromJS(tag)));
                })
              })
            })

          case PRODUCT_MARK_AS_READ:
            return state.withMutations(tempState => {
              (action as ProductAddTagAction).payload.ids.forEach(id => {
                const index = tempState.getIn(['data', 'connection']).findIndex(photo => {
                  return photo.get('id') === id
                });
                tempState.setIn(['data', 'connection', index, 'isRead'], true);
              })
            })

          case PRODUCT_MARK_AS_UNREAD:
            return state.withMutations(tempState => {
              (action as ProductAddTagAction).payload.ids.forEach(id => {
                const index = tempState.getIn(['data', 'connection']).findIndex(photo => {
                  return photo.get('id') === id
                });
                tempState.setIn(['data', 'connection', index, 'isRead'], false);
              })
            })

          default:
        }
      }

      // LISTENER TO PRODUCT (GLOBAL) ACTIONS [Linkedin Connection]:
      if ('productType' in action &&
        (action as ProductAction).productType === PRODUCT_TYPES.SOCIAL_NETWORKS_LINKEDIN_SEARCH) {
        switch (action.type) {
          case PRODUCT_ADD_TAG:
            const allIDs = (action as ProductAddTagAction).payload.ids;
            const allTags = (action as ProductAddTagAction).payload.tags;
            return state.withMutations(tempState => {
              allIDs.forEach(id => {
                const index = tempState.getIn(['data', 'search']).findIndex(tweet => {
                  return tweet.get('id') === id
                });
                allTags.map((tag) => {
                  tempState.updateIn(
                    ['data', 'search', index, 'tags'], (tags) => tags.push(fromJS(tag)));
                })
              })
            })

          case PRODUCT_MARK_AS_READ:
            return state.withMutations(tempState => {
              (action as ProductAddTagAction).payload.ids.forEach(id => {
                const index = tempState.getIn(['data', 'search']).findIndex(photo => {
                  return photo.get('id') === id
                });
                tempState.setIn(['data', 'search', index, 'isRead'], true);
              })
            })

          case PRODUCT_MARK_AS_UNREAD:
            return state.withMutations(tempState => {
              (action as ProductAddTagAction).payload.ids.forEach(id => {
                const index = tempState.getIn(['data', 'search']).findIndex(photo => {
                  return photo.get('id') === id
                });
                tempState.setIn(['data', 'search', index, 'isRead'], false);
              })
            })

          default:
        }
      }

      return state;

  }
}

export default linkedin
