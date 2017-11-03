// import * as React from 'react'
import { connect } from 'react-redux'
import GlobalStatusBar from '../components/Common/GlobalStatusBar/'
import { logoutRequest } from '../state/actions/Session'
import { notificationsLoadRequest } from '../state/actions/Notifications'
import { PAGE_SIZE as NOTIFICATIONS_PAGE_SIZE } from './NotificationsList'
import { INITIAL_ID } from '../types/Notifications'
import { AgentData } from '../types/Agent'
import { PRODUCT_TYPES } from '../types/Product'

const mapStateToProps = (state, ownProps) => {
  const { isAuthenticated } = state[PRODUCT_TYPES.SESSION]
  let agentData = null
  if (ownProps.agentId !== undefined) {
    agentData = state[PRODUCT_TYPES.AGENTS].data.find(item => item.id === ownProps.agentId)
  }
  return {
    agentData: agentData as AgentData,
    isLoggedIn: isAuthenticated as boolean,
    userName: (state[PRODUCT_TYPES.USER].data ? state[PRODUCT_TYPES.USER].data.name : '') as string,
    isGlobalFetching: (state[PRODUCT_TYPES.GLOBAL_LOADERS].count > 0) as boolean,
    notificationsUnreadCount: state[PRODUCT_TYPES.NOTIFICATIONS].countUnread as number,
    isHomePage: ownProps.agentId === undefined,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    doLogout: (ev) => { dispatch(logoutRequest()) },
    loadInitialNotifications: () => dispatch(notificationsLoadRequest(INITIAL_ID, NOTIFICATIONS_PAGE_SIZE))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(GlobalStatusBar)
