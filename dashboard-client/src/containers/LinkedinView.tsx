import * as React from 'react'
import * as Theme from '../components/SocialNetworksAppViewer/Theme'
import { connect } from 'react-redux';
import { LinkedinData, TwitterId } from '../types/SocialNetworks';
import { TagData, TagId } from '../types/Tag';
import { AgentId } from '../types/Agent';
import { linkedinLoadRequest, linkedinRemoveTag, linkedinSetStar, linkedinSortBy } from '../state/actions/Linkedin';
import LinkedinNetwork from '../components/SocialNetworksAppViewer/LinkedinNetwork'
import { ParamsData } from '../urlHelper';
import { productAddTag, productMarkAsRead, productMarkAsUnread } from '../state/actions/ProductActions';
import { PRODUCT_TYPES } from '../types/Product';
import LoadingIndicator from '../components/Common/LoadingIndicator';

export interface LinkedinProps extends React.Props<LinkedinView> {
  data?: LinkedinData;
  isFetching?: boolean;
  loadLinkedin?: (agentId: AgentId) => null;
  connectionSortByIndex: number;
  connectionSortBy: (selectedIndex: number) => void;
  isSorting: boolean;
  setStar: (path: string[], id: TwitterId, isFavorite: boolean) => void;
  removeTag: (path: string[], id: TwitterId, tagId: TagId) => void;
  linkedinExperienceAddTag: (ids: TwitterId[], tags: TagData[]) => void;
  linkedinExperienceMarkAsRead: (ids: TwitterId[]) => void;
  linkedinExperienceMarkAsUnread: (ids: TwitterId[]) => void;
  linkedinEducationAddTag: (ids: TwitterId[], tags: TagData[]) => void;
  linkedinEducationMarkAsRead: (ids: TwitterId[]) => void;
  linkedinEducationMarkAsUnread: (ids: TwitterId[]) => void;
  linkedinConnectionAddTag: (ids: TwitterId[], tags: TagData[]) => void;
  linkedinConnectionMarkAsRead: (ids: TwitterId[]) => void;
  linkedinConnectionMarkAsUnread: (ids: TwitterId[]) => void;
  linkedinSearchAddTag: (ids: TwitterId[], tags: TagData[]) => void;
  linkedinSearchMarkAsRead: (ids: TwitterId[]) => void;
  linkedinSearchMarkAsUnread: (ids: TwitterId[]) => void;
  theme?: Theme.ThemeProps;
  params?: ParamsData;
}

export class LinkedinView extends React.Component<LinkedinProps, {}> {

  static defaultProps: Partial<LinkedinProps> = {
    theme: Theme.defaultTheme,
    data: null,
    isFetching: false,
    loadLinkedin: () => null,
    params: {
      agent_id: 'Tyrion Lannister',
    }
  }

  constructor (props: LinkedinProps) {
    super(props)

    this.state = {
    }
  }

  getLinkedinExperienceActionMenu() {
    return {
      addTagCallback: this.props.linkedinExperienceAddTag,
      addToNotebookCallback: () => {/*TODO: implementation */},
      markAsReadCallback: this.props.linkedinExperienceMarkAsRead,
      markAsUnreadCallback: this.props.linkedinExperienceMarkAsUnread,
      translateCallback: () => {/*TODO: implementation */},
      transcriptCallback: () => {/*TODO: implementation */},
      exportCallback: () => {/*TODO: implementation */},
    }
  }

  getLinkedinEducationActionMenu() {
    return {
      addTagCallback: this.props.linkedinEducationAddTag,
      addToNotebookCallback: () => {/*TODO: implementation */},
      markAsReadCallback: this.props.linkedinEducationMarkAsRead,
      markAsUnreadCallback: this.props.linkedinEducationMarkAsUnread,
      translateCallback: () => {/*TODO: implementation */},
      transcriptCallback: () => {/*TODO: implementation */},
      exportCallback: () => {/*TODO: implementation */},
    }
  }

  getLinkedinConnectionActionMenu() {
    return {
      addTagCallback: this.props.linkedinConnectionAddTag,
      addToNotebookCallback: () => {/*TODO: implementation */},
      markAsReadCallback: this.props.linkedinConnectionMarkAsRead,
      markAsUnreadCallback: this.props.linkedinConnectionMarkAsUnread,
      translateCallback: () => {/*TODO: implementation */},
      transcriptCallback: () => {/*TODO: implementation */},
      exportCallback: () => {/*TODO: implementation */},
    }
  }

  getLinkedinSearchActionMenu() {
    return {
      addTagCallback: this.props.linkedinSearchAddTag,
      addToNotebookCallback: () => {/*TODO: implementation */},
      markAsReadCallback: this.props.linkedinSearchMarkAsRead,
      markAsUnreadCallback: this.props.linkedinSearchMarkAsUnread,
      translateCallback: () => {/*TODO: implementation */},
      transcriptCallback: () => {/*TODO: implementation */},
      exportCallback: () => {/*TODO: implementation */},
    }
  }

  loadLinkedinData = () => {
    this.props.loadLinkedin(this.props.params.agent_id);
  }

  public componentDidMount() {
    if (!this.props.data) {
      this.loadLinkedinData();
    }
  }

  render() {
    if (this.props.isFetching) {
      return <LoadingIndicator/>
    }

    return (
      <LinkedinNetwork
        data={this.props.data}
        setStar={this.props.setStar}
        removeTag={this.props.removeTag}
        isSorting={this.props.isSorting}
        connectionSortByIndex={this.props.connectionSortByIndex}
        connectionSortBy={this.props.connectionSortBy}
        linkedinExperienceActionMenu={this.getLinkedinExperienceActionMenu()}
        linkedinEducationActionMenu={this.getLinkedinEducationActionMenu()}
        linkedinConnectionActionMenu={this.getLinkedinConnectionActionMenu()}
        linkedinSearchActionMenu={this.getLinkedinSearchActionMenu()}
      />
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const isFetching = state[PRODUCT_TYPES.SOCIAL_NETWORKS_LINKEDIN].get('isFetching');
  const isSorting = state[PRODUCT_TYPES.SOCIAL_NETWORKS_LINKEDIN].get('isSorting');
  const connectionSortByIndex = state[PRODUCT_TYPES.SOCIAL_NETWORKS_LINKEDIN].get('connectionSortBy');
  let data = state[PRODUCT_TYPES.SOCIAL_NETWORKS_LINKEDIN].get('data');

  if (!! data) {
    data = data.toJS();
  }
  return {
    isFetching,
    isSorting,
    connectionSortByIndex,
    data,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadLinkedin: (agentId: AgentId) => {dispatch(linkedinLoadRequest(agentId))},
    connectionSortBy: (selectedIndex: number) => {dispatch(linkedinSortBy({selectedIndex}))},
    setStar: (path: string[], id: TwitterId, isFavorite: boolean) => {dispatch(linkedinSetStar({
      path,
      id,
      isFavorite,
    }))},
    removeTag: (path: string[], id: TwitterId, tagId: TagId) => {dispatch(linkedinRemoveTag({
      path,
      id,
      tagId,
    }))},

    // Linkedin Experience:
    linkedinExperienceAddTag: (ids: TwitterId[], tags: TagData[]) => {
      dispatch(productAddTag({ids, tags}, PRODUCT_TYPES.SOCIAL_NETWORKS_LINKEDIN_EXPERIENCE))},
    linkedinExperienceMarkAsRead: (ids: TwitterId[]) => {
      dispatch(productMarkAsRead({ids}, PRODUCT_TYPES.SOCIAL_NETWORKS_LINKEDIN_EXPERIENCE))},
    linkedinExperienceMarkAsUnread: (ids: TwitterId[]) => {
      dispatch(productMarkAsUnread({ids}, PRODUCT_TYPES.SOCIAL_NETWORKS_LINKEDIN_EXPERIENCE))},

    // Linkedin Education:
    linkedinEducationAddTag: (ids: TwitterId[], tags: TagData[]) => {
      dispatch(productAddTag({ids, tags}, PRODUCT_TYPES.SOCIAL_NETWORKS_LINKEDIN_EDUCATION))},
    linkedinEducationMarkAsRead: (ids: TwitterId[]) => {
      dispatch(productMarkAsRead({ids}, PRODUCT_TYPES.SOCIAL_NETWORKS_LINKEDIN_EDUCATION))},
    linkedinEducationMarkAsUnread: (ids: TwitterId[]) => {
      dispatch(productMarkAsUnread({ids}, PRODUCT_TYPES.SOCIAL_NETWORKS_LINKEDIN_EDUCATION))},

    // Linkedin Connection:
    linkedinConnectionAddTag: (ids: TwitterId[], tags: TagData[]) => {
      dispatch(productAddTag({ids, tags}, PRODUCT_TYPES.SOCIAL_NETWORKS_LINKEDIN_CONNECTION))},
    linkedinConnectionMarkAsRead: (ids: TwitterId[]) => {
      dispatch(productMarkAsRead({ids}, PRODUCT_TYPES.SOCIAL_NETWORKS_LINKEDIN_CONNECTION))},
    linkedinConnectionMarkAsUnread: (ids: TwitterId[]) => {
      dispatch(productMarkAsUnread({ids}, PRODUCT_TYPES.SOCIAL_NETWORKS_LINKEDIN_CONNECTION))},

    // Linkedin Search:
    linkedinSearchAddTag: (ids: TwitterId[], tags: TagData[]) => {
      dispatch(productAddTag({ids, tags}, PRODUCT_TYPES.SOCIAL_NETWORKS_LINKEDIN_SEARCH))},
    linkedinSearchMarkAsRead: (ids: TwitterId[]) => {
      dispatch(productMarkAsRead({ids}, PRODUCT_TYPES.SOCIAL_NETWORKS_LINKEDIN_SEARCH))},
    linkedinSearchMarkAsUnread: (ids: TwitterId[]) => {
      dispatch(productMarkAsUnread({ids}, PRODUCT_TYPES.SOCIAL_NETWORKS_LINKEDIN_SEARCH))},

  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LinkedinView)
