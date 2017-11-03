import * as React from 'react'
import { connect } from 'react-redux'
import {
  socialNetworksLoadRequest,
} from '../state/actions/SocialNetworks';
import { AgentId } from '../types/Agent';
import SocialNetworksAppViewer from '../components/SocialNetworksAppViewer/index';
import { SocialNetworksTheme } from '../theme/ScTheme';
import { PRODUCT_TYPES } from '../types/Product'

export interface SocialNetworksProps extends React.Props<SocialNetworksPage> {
  isFetching: boolean;
  loadSocialNetworks: (id: AgentId) => void;
  lastExtraction: number;
  updateTimeIndicator: number;
  params?: any;
  requestUpdate: () => void;
  extractNow: () => void;
  showFilter: () => void;
  tagsFilter: () => void;
  actionsFilter: () => void;
  keyword: string;

}
export interface SocialNetworksAppViewerState {
}

export class SocialNetworksPage extends React.Component<SocialNetworksProps, SocialNetworksAppViewerState> {
  constructor (props: SocialNetworksProps) {
    super(props)

    this.state = {
    }
  }

  loadSocialNetworksProps = () => {
    this.props.loadSocialNetworks(this.props.params.agent_id);
  }

  public componentDidMount() {
    this.loadSocialNetworksProps();
  }

  render() {
    return (
     <SocialNetworksAppViewer
       isFetching={this.props.isFetching}
       requestUpdate={this.props.requestUpdate}
       extractNow={this.props.extractNow}
       showFilter={this.props.showFilter}
       tagsFilter={this.props.tagsFilter}
       actionsFilter={this.props.actionsFilter}
       updateTimeIndicator={this.props.updateTimeIndicator}
       lastExtraction={this.props.lastExtraction}
       keyword={this.props.keyword}
       theme={SocialNetworksTheme}
     />
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const isFetching = state[PRODUCT_TYPES.SOCIAL_NETWORKS].get('isFetching');
  const lastExtraction = state[PRODUCT_TYPES.SOCIAL_NETWORKS].get('lastFetchTs');
  const keyword = state[PRODUCT_TYPES.SEARCH].get('keyWord');

  return {
    isFetching,
    lastExtraction,
    keyword,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadSocialNetworks: (agentId: AgentId) => {
      dispatch(socialNetworksLoadRequest(agentId))
    },

    requestUpdate: () => {/* TODO: implement the function */
    },
    extractNow: () => {/* TODO: implement the function */
    },

    // Filters functions:
    showFilter: () => {/* TODO: implement the function */
    },
    tagsFilter: () => {/* TODO: implement the function */
    },
    actionsFilter: () => {/* TODO: implement the function */
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SocialNetworksPage)
