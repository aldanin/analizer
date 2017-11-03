import * as React from 'react'
import { connect } from 'react-redux'
import SnapshotsView from '../components/SnapshotsView/index';
import { SnapshotsViewTheme } from '../theme/ScTheme';
import { SnapshotID, SnapshotsData } from '../types/Snapshots';
import { AgentId } from '../types/Agent';
import { TagData, TagId } from '../types/Tag';
import {
  productAddTag, productAddToNotebook, productAskForTranscript, productAskForTranslate, productExportItem,
  productMarkAsRead,
  productMarkAsUnread, productRemoveTag, productSetFavorite
} from '../state/actions/ProductActions';
import { PRODUCT_TYPES } from '../types/Product';
import PageStatusNoData from '../components/Common/PageStatus/index';

export interface SnapshotsPageProps extends React.Props<SnapshotsPage> {
  data: SnapshotsData[];
  isFetching: boolean;
  isFirstRequest: boolean;
  isFirstLoading: boolean;
  loadSnapshots: (id: AgentId) => void;
  requestUpdate: () => void;
  extractNow: () => void;
  showFilter: () => void;
  tagsFilter: () => void;
  addTag: (ids: SnapshotID[], tags: TagData[]) => void;
  addToNotebook: (ids: SnapshotID[]) => void;
  markAsRead: (ids: SnapshotID[]) => void;
  markAsUnRead: (ids: SnapshotID[]) => void;
  askForTranslate: (ids: SnapshotID[]) => void;
  askForTranscript: (ids: SnapshotID[]) => void;
  exportItem: (ids: SnapshotID[]) => void;
  lastExtraction: number;
  updateTimeIndicator: number;
  actionsFilter: () => void;
  getFullSizeImage: () => void;
  removeTag: (itemID: SnapshotID, tagId: TagId) => void;
  setStar: (id: SnapshotID, isFavorite: boolean) => void;
  keyword: string;
  params: any;
}

export interface SnapshotsPageState {
}

export class SnapshotsPage extends React.Component<SnapshotsPageProps, SnapshotsPageState> {
  constructor (props: SnapshotsPageProps) {
    super(props)

    this.state = {
    }
  }

  loadSnapshotsProps = () => {
    this.props.loadSnapshots(this.props.params.agent_id);
  }

  public componentDidMount() {
    //  this.loadSnapshotsProps();
  }

  render() {
    if ((!this.props.data || !this.props.data.length) && !this.props.isFirstRequest) {
      return (<PageStatusNoData/>);
    }

    return (
      <SnapshotsView
        photos={this.props.data}
        isFetching={this.props.isFetching}
        isFirstRequest={this.props.isFirstRequest}
        updateRequest={this.props.requestUpdate}
        updateTimeIndicator={this.props.updateTimeIndicator}
        lastExtraction={this.props.lastExtraction}
        extractNow={this.props.extractNow}
        showFilter={this.props.showFilter}
        tagsFilter={this.props.tagsFilter}
        actions={this.props.actionsFilter}
        setStar={this.props.setStar}
        removeTag={this.props.removeTag}
        getFullSizeImage={this.props.getFullSizeImage}
        theme={SnapshotsViewTheme}
        addTag={this.props.addTag}
        addToNotebook={this.props.addToNotebook}
        markAsRead={this.props.markAsRead}
        markAsUnRead={this.props.markAsUnRead}
        askForTranslate={this.props.askForTranslate}
        askForTranscript={this.props.askForTranscript}
        exportItem={this.props.exportItem}
        keyword={this.props.keyword}
      />
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const isFetching = state[PRODUCT_TYPES.SNAPSHOTS].get('isFetching');
  const isFirstRequest = state[PRODUCT_TYPES.SNAPSHOTS].get('isFirstRequest');
  const isError = state[PRODUCT_TYPES.SNAPSHOTS].get('error');
  const data = state[PRODUCT_TYPES.SNAPSHOTS].get('productData').toJS();
  const keyword = state[PRODUCT_TYPES.SEARCH].get('keyWord');
  return {
    isFetching,
    isFirstRequest,
    isError,
    data,
    keyword,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // loadSnapshots: (agentId: AgentId) => {dispatch(snapshotsLoadRequest(agentId))},
    setStar: (id: SnapshotID, isFavorite: boolean) => {
      dispatch(productSetFavorite({id: id, isFavorite: isFavorite}, PRODUCT_TYPES.SNAPSHOTS))},
    removeTag: (itemId: SnapshotID, tagId: TagId) => {
      dispatch(productRemoveTag({id: itemId, tagId: tagId}, PRODUCT_TYPES.SNAPSHOTS))},
    addTag: (ids: SnapshotID[], tags: TagData[]) => {dispatch(productAddTag({ids, tags}, PRODUCT_TYPES.SNAPSHOTS))},
    addToNotebook: (ids: SnapshotID[]) => {dispatch(productAddToNotebook({ids}, PRODUCT_TYPES.SNAPSHOTS))},
    markAsRead: (ids: SnapshotID[]) => {dispatch(productMarkAsRead({ids}, PRODUCT_TYPES.SNAPSHOTS))},
    markAsUnRead: (ids: SnapshotID[]) => {dispatch(productMarkAsUnread({ids}, PRODUCT_TYPES.SNAPSHOTS))},
    askForTranslate: (ids: SnapshotID[]) => {dispatch(productAskForTranslate({ids}, PRODUCT_TYPES.SNAPSHOTS))},
    askForTranscript: (ids: SnapshotID[]) => {dispatch(productAskForTranscript({ids}, PRODUCT_TYPES.SNAPSHOTS))},
    exportItem: (ids: SnapshotID[]) => {dispatch(productExportItem({ids}, PRODUCT_TYPES.SNAPSHOTS))},
    requestUpdate: () => {/* TODO: implement the function */ },
    getFullSizeImage: () =>  {/* TODO: implement the function */ },
    showFilter: () => {/* TODO: implement the function */ },
    tagsFilter: () => {/* TODO: implement the function */ },
    actionsFilter: () => {/* TODO: implement the function */ },
    extractNow: () => {/* TODO: implement the function */ },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SnapshotsPage)
