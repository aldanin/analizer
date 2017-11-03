import * as React from 'react'
import { connect } from 'react-redux'
import MailAppViewer from '../components/MailAppViewer/index';
import { ParamsData } from '../urlHelper';
import { mailLoadRequest, updateAccountId } from '../state/actions/Mail';
import { MailAppData } from '../types/Mail';
import { TagData, TagId } from '../types/Tag';
import {
  productAddTag, productMarkAsRead, productMarkAsUnread, productRemoveTag,
  productSetFavorite
} from '../state/actions/ProductActions';
import { PRODUCT_TYPES } from '../types/Product';
import PageStatusNoData from '../components/Common/PageStatus/index';

export interface MailPageProps extends React.Props<MailPage> {
  isFetching: boolean;
  isFirstLoading: boolean;
  requestUpdate: () => void;
  lastExtraction: number;
  updateTimeIndicator: number;
  extractNow: () => void;
  showFilter: () => void;
  tagsFilter: () => void;
  loadMail: (agentId: string) => void;
  params: ParamsData;
  data: MailAppData;
  mailAddTag: (ids: string[], tags: TagData[]) => void;
  markAsRead: (ids: string[]) => void;
  markAsUnread: (ids: string[]) => void;
  setStar: (id: string, isFavorite: boolean) => void;
  removeTag: (id: string, tagId: TagId) => void;
  updateAccount: (accountId: string) => void;
  keyword: string;
}
export interface MailPageState {
}

class MailPage extends React.Component<MailPageProps, MailPageState> {
  constructor (props: MailPageProps) {
    super(props)

    this.state = {
    }
  }

  loadMailProps = () => {
    this.props.loadMail(this.props.params.agent_id);
  }

  public componentDidMount() {
    this.loadMailProps();
  }

  render() {
    if ((!this.props.data || !this.props.data.accounts.length) && !this.props.isFirstLoading) {
      return (<PageStatusNoData/>);
    }

    return (
      <MailAppViewer
        isFetching={this.props.isFetching}
        keyword={this.props.keyword}
        extractNow={this.props.extractNow}
        lastExtraction={this.props.lastExtraction}
        requestUpdate={this.props.requestUpdate}
        showFilter={this.props.showFilter}
        tagsFilter={this.props.tagsFilter}
        updateTimeIndicator={this.props.updateTimeIndicator}
        data={this.props.data.accounts}
        mailAddTag={this.props.mailAddTag}
        markAsRead={this.props.markAsRead}
        markAsUnread={this.props.markAsUnread}
        removeTag={this.props.removeTag}
        setStar={this.props.setStar}
        updateAccount={this.props.updateAccount}
      />
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  let data = state[PRODUCT_TYPES.MAIL].get('data');
  if (!!data) {
    data = data.toJS();

    for (let i = 0; i < data.accounts.length; i++) {
      for (let j = 0; j < data.accounts[i].inbox.length; j++) {
        data.accounts[i].inbox[j].body = (
          <div dangerouslySetInnerHTML={{__html: data.accounts[i].inbox[j].body }}/>);
      }
    }
  } else {
    data = {
      accounts: [],
    }
  }
  return {
    keyword: state[PRODUCT_TYPES.SEARCH].get('keyWord'),
    isFetching: state[PRODUCT_TYPES.MAIL].get('isFetching'),
    lastExtraction: state[PRODUCT_TYPES.MAIL].get('lastFetchTs'),
    isFirstLoading: state[PRODUCT_TYPES.MAIL].get('isFirstLoading'),
    updateTimeIndicator: 8000,
    data,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    requestUpdate: () => null,
    extractNow: () => null,
    showFilter: () => null,
    tagsFilter: () => null,
    loadMail: (agentId: string) => {dispatch(mailLoadRequest(agentId))},
    mailAddTag: (ids: string[], tags: TagData[]) => {
      dispatch(productAddTag({ids, tags}, PRODUCT_TYPES.MAIL))},
    markAsRead: (ids: string[]) => {dispatch(productMarkAsRead({ids}, PRODUCT_TYPES.MAIL))},
    markAsUnread: (ids: string[]) => {dispatch(productMarkAsUnread({ids}, PRODUCT_TYPES.MAIL))},
    setStar: (id: string, isFavorite: boolean) => {
      dispatch(productSetFavorite({id, isFavorite}, PRODUCT_TYPES.MAIL))
    },
    removeTag: (id: string, tagId: TagId) => {
      dispatch(productRemoveTag({id, tagId}, PRODUCT_TYPES.MAIL))
    },
    updateAccount: (accountId: string) => {
      dispatch(updateAccountId(accountId));
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MailPage)
