import * as React from 'react'
import { connect } from 'react-redux'
import * as moment from 'moment'
import { List, ListItem } from 'material-ui/List'
import AssignmentIcon from 'material-ui/svg-icons/action/assignment'

import { NotificationData, NotificationId } from '../types/Notifications'
import { PRODUCT_TYPES } from '../types/Product'

import { List as ImmutableList } from 'immutable'
import InfinitePager from '../components/InfinitePager/'

import { notificationsLoadRequest, notificationsSetReadStatus } from '../state/actions/Notifications'

export const PAGE_SIZE = 5

export interface NotificationsListProps extends React.Props<NotificationsList> {
  items: NotificationData[],
  hasNextPage: boolean,
  isFetching: boolean,
  lastId: NotificationId,
  unreadIds: NotificationId[],
  markNotificationsViewed: (ids: NotificationId[]) => void,
  loadNotifications: (lastId: NotificationId, count: number) => void,
}
export interface NotificationsListState {
}

class NotificationsList extends React.Component<NotificationsListProps, NotificationsListState> {
  constructor (props: NotificationsListProps) {
    super(props)

    this.state = {
    }
  }

  loadNextPage = () => {
    const { lastId, loadNotifications } = this.props
    loadNotifications(lastId, PAGE_SIZE)
  }
  onNotificationsRangeViewed = (startIndex, stopIndex) => {
    const { items } = this.props
    // convert indexes to ids
    const ids = items.slice(startIndex, stopIndex).map((item) => item.id)
    // filter ids which are not already read
    const idsToUpdate = ids.filter(id => this.props.unreadIds.indexOf(id) !== -1)
    if (idsToUpdate.length > 0) {
      this.props.markNotificationsViewed(idsToUpdate)
    }
  }

  renderItem = (item, key, style) => {
    const primaryText = (
      <div>
        {`${item.id} : ${item.title}`}
        <span
          style={{
            float: 'right',
            fontSize: '0.7em',
            color: 'silver',
          }}
        >
          {moment(item.created).fromNow()}
        </span>
      </div>
    )
    const secondaryText = <div dangerouslySetInnerHTML={{ __html: item.content }}/>

    return (
      <div key={key} style={style}>
        <ListItem
          primaryText={primaryText}
          secondaryText={secondaryText}
          key={item.id}
          leftIcon={<AssignmentIcon/>}
          style={item.isRead ? {borderLeft: 'solid white'} : {borderLeft: 'solid red'}}
        />
      </div>
    )
  }

  render() {
    const { items, hasNextPage, isFetching } = this.props
    const listItems = ImmutableList(items)
    return (
      <List
        style={{maxHeight: '75vh', width: '501px'}}
      >
        <InfinitePager
          hasNextPage={hasNextPage}
          isNextPageLoading={isFetching}
          loadNextPage={this.loadNextPage}
          onSliceRendered={this.onNotificationsRangeViewed}
          list={listItems}
          listHeight={400}
          rowHeight={72}
          rowRenderer={this.renderItem}
          loaderRenderer={(key, style) => <div key={key} style={style}>Loading...</div>}
        />
      </List>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const { data, isFetching, countTotal, lastId } = state[PRODUCT_TYPES.NOTIFICATIONS]
  return {
    items: data,
    isFetching,
    hasNextPage: countTotal > data.length,
    lastId: lastId,
    unreadIds: data.filter(item => !item.isRead).map(item => item.id)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadNotifications: (lastId, count) => { dispatch(notificationsLoadRequest(lastId, count)) },
    markNotificationsViewed: (ids: NotificationId[]) => dispatch(notificationsSetReadStatus(ids, true))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NotificationsList)
