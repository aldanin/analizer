import * as React from 'react'
import * as Theme from '../components/SocialNetworksAppViewer/Theme'
import { connect } from 'react-redux';
import TwitterNetwork from '../components/SocialNetworksAppViewer/TwitterNetwork'
import { TwitterData, TwitterId } from '../types/SocialNetworks';
import { TagData, TagId } from '../types/Tag';
import { AgentId } from '../types/Agent';
import { twitterLoadRequest, twitterSetStar, twitterRemoveTag } from '../state/actions/Twitter';
import { ParamsData } from '../urlHelper';
import { withRouter } from 'react-router';
import { productAddTag, productMarkAsRead, productMarkAsUnread } from '../state/actions/ProductActions';
import { PRODUCT_TYPES } from '../types/Product';
import LoadingIndicator from '../components/Common/LoadingIndicator';

export interface TwitterProps extends React.Props<TwitterView> {
  data?: TwitterData,
  isFetching?: boolean;
  loadTwitter?: (agentId: AgentId) => null;
  setStar: (path: string[], id: TwitterId, isFavorite: boolean) => void;
  removeTag: (path: string[], id: TwitterId, tagId: TagId) => void;
  tweeterMessageAddTag: (ids: TwitterId[], tags: TagData[]) => void;
  tweeterMessageMarkAsRead: (ids: TwitterId[]) => void;
  tweeterMessageMarkAsUnread: (ids: TwitterId[]) => void;
  tweeterMentionAddTag: (ids: TwitterId[], tags: TagData[]) => void;
  tweeterMentionMarkAsRead: (ids: TwitterId[]) => void;
  tweeterMentionMarkAsUnread: (ids: TwitterId[]) => void;
  tweeterFollowingAddTag: (ids: TwitterId[], tags: TagData[]) => void;
  tweeterFollowingMarkAsRead: (ids: TwitterId[]) => void;
  tweeterFollowingMarkAsUnread: (ids: TwitterId[]) => void;
  tweeterFollowerAddTag: (ids: TwitterId[], tags: TagData[]) => void;
  tweeterFollowerMarkAsRead: (ids: TwitterId[]) => void;
  tweeterFollowerMarkAsUnread: (ids: TwitterId[]) => void;
  theme?: Theme.ThemeProps;
  params?: ParamsData;
}

class TwitterView extends React.Component<TwitterProps, {}> {

  static defaultProps: Partial<TwitterProps> = {
    theme: Theme.defaultTheme,
    data: null,
    isFetching: false,
    loadTwitter: () => null,
    params: {
      agent_id: 'Tyrion Lannister',
    }
  }

  constructor (props: TwitterProps) {
    super(props)

    this.state = {
    }
  }

  getTweeterMessageActionMenu() {
    return {
      addTagCallback: this.props.tweeterMessageAddTag,
      addToNotebookCallback: () => {/*TODO: implementation */},
      markAsReadCallback: this.props.tweeterMessageMarkAsRead,
      markAsUnreadCallback: this.props.tweeterMessageMarkAsUnread,
      translateCallback: () => {/*TODO: implementation */},
      transcriptCallback: () => {/*TODO: implementation */},
      exportCallback: () => {/*TODO: implementation */},
    }
  }

  getTweeterMentionActionMenu() {
    return {
      addTagCallback: this.props.tweeterMentionAddTag,
      addToNotebookCallback: () => {/*TODO: implementation */},
      markAsReadCallback: this.props.tweeterMentionMarkAsRead,
      markAsUnreadCallback: this.props.tweeterMentionMarkAsUnread,
      translateCallback: () => {/*TODO: implementation */},
      transcriptCallback: () => {/*TODO: implementation */},
      exportCallback: () => {/*TODO: implementation */},
    }
  }

  getTweeterFollowingActionMenu() {
    return {
      addTagCallback: this.props.tweeterFollowingAddTag,
      addToNotebookCallback: () => {/*TODO: implementation */},
      markAsReadCallback: this.props.tweeterFollowingMarkAsRead,
      markAsUnreadCallback: this.props.tweeterFollowingMarkAsUnread,
      translateCallback: () => {/*TODO: implementation */},
      transcriptCallback: () => {/*TODO: implementation */},
      exportCallback: () => {/*TODO: implementation */},
    }
  }

  getTweeterFollowerActionMenu() {
    return {
      addTagCallback: this.props.tweeterFollowerAddTag,
      addToNotebookCallback: () => {/*TODO: implementation */},
      markAsReadCallback: this.props.tweeterFollowerMarkAsRead,
      markAsUnreadCallback: this.props.tweeterFollowerMarkAsUnread,
      translateCallback: () => {/*TODO: implementation */},
      transcriptCallback: () => {/*TODO: implementation */},
      exportCallback: () => {/*TODO: implementation */},
    }
  }

  loadTwitterData = () => {
    this.props.loadTwitter(this.props.params.agent_id);
  }

  public componentDidMount() {
    if (!this.props.data) {
      this.loadTwitterData();
    }
  }

  render() {
    if (this.props.isFetching || !this.props.data) {
      return <LoadingIndicator/>
    }

    return (
      <TwitterNetwork
        data={this.props.data}
        setStar={this.props.setStar}
        removeTag={this.props.removeTag}
        tweeterMessageActionMenu={this.getTweeterMessageActionMenu()}
        tweeterMentionActionMenu={this.getTweeterMentionActionMenu()}
        tweeterFollowingActionMenu={this.getTweeterFollowingActionMenu()}
        tweeterFollowerActionMenu={this.getTweeterFollowerActionMenu()}
      />)
  }
}

const mapStateToProps = (state, ownProps) => {
  const isFetching = state[PRODUCT_TYPES.SOCIAL_NETWORKS_TWEETER].get('isFetching');
  let data = state[PRODUCT_TYPES.SOCIAL_NETWORKS_TWEETER].get('data');

  if (!! data) {
    data = data.toJS();
  }
  return {
    isFetching,
    data,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadTwitter: (agentId: AgentId) => {dispatch(twitterLoadRequest(agentId))},
    setStar: (path: string[], id: TwitterId, isFavorite: boolean) => {dispatch(twitterSetStar({
      path,
      id,
      isFavorite,
    }))},
    removeTag: (path: string[], id: TwitterId, tagId: TagId) => {dispatch(twitterRemoveTag({
      path,
      id,
      tagId,
    }))},

    // Tweeter Messages:
    tweeterMessageAddTag: (ids: TwitterId[], tags: TagData[]) => {
      dispatch(productAddTag({ids, tags}, PRODUCT_TYPES.SOCIAL_NETWORKS_TWEETER_MESSAGE))},
    tweeterMessageMarkAsRead: (ids: TwitterId[]) => {
      dispatch(productMarkAsRead({ids}, PRODUCT_TYPES.SOCIAL_NETWORKS_TWEETER_MESSAGE))},
    tweeterMessageMarkAsUnread: (ids: TwitterId[]) => {
      dispatch(productMarkAsUnread({ids}, PRODUCT_TYPES.SOCIAL_NETWORKS_TWEETER_MESSAGE))},

    // Tweeter Mention:
    tweeterMentionAddTag: (ids: TwitterId[], tags: TagData[]) => {
      dispatch(productAddTag({ids, tags}, PRODUCT_TYPES.SOCIAL_NETWORKS_TWEETER_MENTION))},
    tweeterMentionMarkAsRead: (ids: TwitterId[]) => {
      dispatch(productMarkAsRead({ids}, PRODUCT_TYPES.SOCIAL_NETWORKS_TWEETER_MENTION))},
    tweeterMentionMarkAsUnread: (ids: TwitterId[]) => {
      dispatch(productMarkAsUnread({ids}, PRODUCT_TYPES.SOCIAL_NETWORKS_TWEETER_MENTION))},

    // Tweeter Following:
    tweeterFollowingAddTag: (ids: TwitterId[], tags: TagData[]) => {
      dispatch(productAddTag({ids, tags}, PRODUCT_TYPES.SOCIAL_NETWORKS_TWEETER_FOLLOWING))},
    tweeterFollowingMarkAsRead: (ids: TwitterId[]) => {
      dispatch(productMarkAsRead({ids}, PRODUCT_TYPES.SOCIAL_NETWORKS_TWEETER_FOLLOWING))},
    tweeterFollowingMarkAsUnread: (ids: TwitterId[]) => {
      dispatch(productMarkAsUnread({ids}, PRODUCT_TYPES.SOCIAL_NETWORKS_TWEETER_FOLLOWING))},

    // Tweeter Follower:
    tweeterFollowerAddTag: (ids: TwitterId[], tags: TagData[]) => {
      dispatch(productAddTag({ids, tags}, PRODUCT_TYPES.SOCIAL_NETWORKS_TWEETER_FOLLOWER))},
    tweeterFollowerMarkAsRead: (ids: TwitterId[]) => {
      dispatch(productMarkAsRead({ids}, PRODUCT_TYPES.SOCIAL_NETWORKS_TWEETER_FOLLOWER))},
    tweeterFollowerMarkAsUnread: (ids: TwitterId[]) => {
      dispatch(productMarkAsUnread({ids}, PRODUCT_TYPES.SOCIAL_NETWORKS_TWEETER_FOLLOWER))},
  }
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(TwitterView))
