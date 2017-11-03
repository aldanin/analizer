import * as Redux from 'redux'
import * as Immutable from 'immutable'
import { fromJS } from 'immutable'
import { TwitterData } from '../../types/SocialNetworks';
import {
  LOAD_TWITTER_FAIL, LOAD_TWITTER_REQUEST, LOAD_TWITTER_SUCCESS, TWITTER_REMOVE_TAG, TWITTER_SET_STAR,
  TwitterLoadFailAction,
  TwitterLoadSuccessAction, TwitterRemoveTagAction, TwitterSetStarAction
} from '../actions/Twitter';
import {
  PRODUCT_ADD_TAG, ProductAction, ProductAddTagAction, PRODUCT_MARK_AS_READ,
  PRODUCT_MARK_AS_UNREAD
} from '../actions/ProductActions';
import { PRODUCT_TYPES } from '../../types/Product';

export type Action = Redux.Action

interface State extends Immutable.Map<string, any>  {
  isFetching: boolean,
  error: Error | null,
  data: TwitterData,
}

export const initialState: State = fromJS({
  isFetching: true,
  error: null,
  data: null,
})

function twitter(state: State = initialState, action: Action) {
  switch (action.type) {
    case LOAD_TWITTER_REQUEST: {
      return state
        .set('isFetching', true)
    }

    case LOAD_TWITTER_SUCCESS: {
      const { payload } = (<TwitterLoadSuccessAction> action)
      return state
        .set('isFetching', false)
        .set('error', null)
        .set('data', fromJS(payload))
    }

    case LOAD_TWITTER_FAIL: {
      return state
        .set('isFetching', false)
        .set('error', (action as TwitterLoadFailAction).error)
        .set('data', null)
    }

    case TWITTER_SET_STAR: {
      const path = (action as TwitterSetStarAction).payload.path;
      path.splice(0, 0, 'data');
      const starData = state.getIn(path).toJS();

      const starIndex = starData.findIndex(
        item => item.id === (action as TwitterSetStarAction).payload.id);
      path.push(starIndex);
      path.push('isFavorite');

      return state
        .setIn(path, (action as TwitterSetStarAction).payload.isFavorite);
    }
    case TWITTER_REMOVE_TAG: {
      const path = (action as TwitterRemoveTagAction).payload.path;
      path.splice(0, 0, 'data');
      const tagData = state.getIn(path).toJS();

      const tagIndex = tagData.findIndex(
        item => item.id === (action as TwitterRemoveTagAction).payload.id);
      path.push(tagIndex);
      path.push('tags');

      return state
        .updateIn(path, (tags) => tags.filter (
          (tag) => tag.get('id') !== (action as TwitterRemoveTagAction).payload.tagId
        ))
    }

    default:

      // LISTENER TO PRODUCT (GLOBAL) ACTIONS [Tweeter Message]:
      if ('productType' in action &&
        (action as ProductAction).productType === PRODUCT_TYPES.SOCIAL_NETWORKS_TWEETER_MESSAGE) {
        switch (action.type) {
          case PRODUCT_ADD_TAG:
            const allIDs = (action as ProductAddTagAction).payload.tags
            const allTags = (action as ProductAddTagAction).payload.tags;
            return state.withMutations(tempState => {
              allIDs.forEach(id => {
                const index = tempState.getIn(['data', 'tweets']).findIndex(tweet => {
                  return tweet.get('id') === id
                });
                allTags.map((tag) => {
                  tempState.updateIn(['data', 'tweets', index, 'tags'], (tags) => tags.push(fromJS(tag)));
                })
              })
            })

          case PRODUCT_MARK_AS_READ:
            return state.withMutations(tempState => {
              (action as ProductAddTagAction).payload.tags.forEach(id => {
                const index = tempState.getIn(['data', 'tweets']).findIndex(photo => {
                  return photo.get('id') === id
                });
                tempState.setIn(['data', 'tweets', index, 'isRead'], true);
              })
            })

          case PRODUCT_MARK_AS_UNREAD:
            return state.withMutations(tempState => {
              (action as ProductAddTagAction).payload.tags.forEach(id => {
                const index = tempState.getIn(['data', 'tweets']).findIndex(photo => {
                  return photo.get('id') === id
                });
                tempState.setIn(['data', 'tweets', index, 'isRead'], false);
              })
            })

          default:
        }
      }

      // LISTENER TO PRODUCT (GLOBAL) ACTIONS [Tweeter Mention]:
      if ('productType' in action &&
        (action as ProductAction).productType === PRODUCT_TYPES.SOCIAL_NETWORKS_TWEETER_MENTION) {
        switch (action.type) {
          case PRODUCT_ADD_TAG:
            const allIDs = (action as ProductAddTagAction).payload.tags;
            const allTags = (action as ProductAddTagAction).payload.tags;
            return state.withMutations(tempState => {
              allIDs.forEach(id => {
                const index = tempState.getIn(['data', 'mentions']).findIndex(tweet => {
                  return tweet.get('id') === id
                });
                allTags.map((tag) => {
                  tempState.updateIn(['data', 'mentions', index, 'tags'], (tags) => tags.push(fromJS(tag)));
                })
              })
            })

          case PRODUCT_MARK_AS_READ:
            return state.withMutations(tempState => {
              (action as ProductAddTagAction).payload.tags.forEach(id => {
                const index = tempState.getIn(['data', 'mentions']).findIndex(photo => {
                  return photo.get('id') === id
                });
                tempState.setIn(['data', 'mentions', index, 'isRead'], true);
              })
            })

          case PRODUCT_MARK_AS_UNREAD:
            return state.withMutations(tempState => {
              (action as ProductAddTagAction).payload.tags.forEach(id => {
                const index = tempState.getIn(['data', 'mentions']).findIndex(photo => {
                  return photo.get('id') === id
                });
                tempState.setIn(['data', 'mentions', index, 'isRead'], false);
              })
            })

          default:
        }
      }

      // LISTENER TO PRODUCT (GLOBAL) ACTIONS [Tweeter Following]:
      if ('productType' in action &&
        (action as ProductAction).productType === PRODUCT_TYPES.SOCIAL_NETWORKS_TWEETER_FOLLOWING) {
        switch (action.type) {
          case PRODUCT_ADD_TAG:
            const allIDs = (action as ProductAddTagAction).payload.tags;
            const allTags = (action as ProductAddTagAction).payload.tags;
            return state.withMutations(tempState => {
              allIDs.forEach(id => {
                const index = tempState.getIn(['data', 'following']).findIndex(tweet => {
                  return tweet.get('id') === id
                });
                allTags.map((tag) => {
                  tempState.updateIn(['data', 'following', index, 'tags'], (tags) => tags.push(fromJS(tag)));
                })
              })
            })

          case PRODUCT_MARK_AS_READ:
            return state.withMutations(tempState => {
              (action as ProductAddTagAction).payload.tags.forEach(id => {
                const index = tempState.getIn(['data', 'following']).findIndex(photo => {
                  return photo.get('id') === id
                });
                tempState.setIn(['data', 'following', index, 'isRead'], true);
              })
            })

          case PRODUCT_MARK_AS_UNREAD:
            return state.withMutations(tempState => {
              (action as ProductAddTagAction).payload.tags.forEach(id => {
                const index = tempState.getIn(['data', 'following']).findIndex(photo => {
                  return photo.get('id') === id
                });
                tempState.setIn(['data', 'following', index, 'isRead'], false);
              })
            })

          default:
        }
      }

      // LISTENER TO PRODUCT (GLOBAL) ACTIONS [Tweeter Follower]:
      if ('productType' in action &&
        (action as ProductAction).productType === PRODUCT_TYPES.SOCIAL_NETWORKS_TWEETER_FOLLOWER) {
        switch (action.type) {
          case PRODUCT_ADD_TAG:
            const allIDs = (action as ProductAddTagAction).payload.tags;
            const allTags = (action as ProductAddTagAction).payload.tags;
            return state.withMutations(tempState => {
              allIDs.forEach(id => {
                const index = tempState.getIn(['data', 'followers']).findIndex(tweet => {
                  return tweet.get('id') === id
                });
                allTags.map((tag) => {
                  tempState.updateIn(['data', 'followers', index, 'tags'], (tags) => tags.push(fromJS(tag)));
                })
              })
            })

          case PRODUCT_MARK_AS_READ:
            return state.withMutations(tempState => {
              (action as ProductAddTagAction).payload.tags.forEach(id => {
                const index = tempState.getIn(['data', 'followers']).findIndex(photo => {
                  return photo.get('id') === id
                });
                tempState.setIn(['data', 'followers', index, 'isRead'], true);
              })
            })

          case PRODUCT_MARK_AS_UNREAD:
            return state.withMutations(tempState => {
              (action as ProductAddTagAction).payload.tags.forEach(id => {
                const index = tempState.getIn(['data', 'followers']).findIndex(photo => {
                  return photo.get('id') === id
                });
                tempState.setIn(['data', 'followers', index, 'isRead'], false);
              })
            })

          default:
        }
      }

      return state;
  }
}

export default twitter
