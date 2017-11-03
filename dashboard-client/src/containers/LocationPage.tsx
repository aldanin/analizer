import * as React from 'react'
import { connect } from 'react-redux'
import LocationAppViewer from '../components/LocationAppViewer/index';
import { ParamsData } from '../urlHelper';
import { Location } from 'common-interfaces/types/Location';
import { TagData, TagId } from '../types/Tag';
import {
  productAddTag, productMarkAsRead, productMarkAsUnread, productRemoveTag,
  productSetFavorite
} from '../state/actions/ProductActions';
import { PRODUCT_TYPES } from '../types/Product';

import PageStatusNoData from '../components/Common/PageStatus/index';

export interface LocationPageProps extends React.Props<LocationPage> {
  data: Location[];
  loadLocation: (agentId: string) => void;
  removeTag: (id: string, tagId: TagId) => void;
  setStar: (id: string, isFavorite: boolean) => void;
  addTag: (ids: string[], tags: TagData[]) => void;
  markAsRead: (ids: string[]) => void;
  markAsUnread: (ids: string[]) => void;
  requestUpdate: () => void;
  extractNow: () => void;
  isFetching: boolean;
  isFirstRequest: boolean;
  timerIndicator: number;
  updateTimeIndicator: number;
  keyword: string;
  params?: ParamsData;
}
export interface LocationPageState {
}

class LocationPage extends React.Component<LocationPageProps, LocationPageState> {
  static defaultProps: Partial<LocationPageProps> = {
    params: {
      agent_id: 'Tyrion Lannister',
    }
  }
  constructor (props: LocationPageProps) {
    super(props)

    this.state = {
    }
  }

  loadLocationData = () => {
    // this.props.loadLocation(this.props.params.agent_id);
  }

  public componentDidMount() {
    if (!this.props.data) {
      this.loadLocationData();
    }
  }

  render() {
    if ((!this.props.data || !this.props.data.length) && !this.props.isFirstRequest) {
      return (<PageStatusNoData/>);
    }

    return (
      <LocationAppViewer
        requestUpdate={this.props.requestUpdate}
        extractNow={this.props.extractNow}
        isFetching={this.props.isFetching}
        isFirstRequest={this.props.isFirstRequest}
        timerIndicator={this.props.timerIndicator}
        updateTimeIndicator={this.props.updateTimeIndicator}
        data={this.props.data}
        keyword={this.props.keyword}
        removeTag={this.props.removeTag}
        setStar={this.props.setStar}
        addTag={this.props.addTag}
        markAsUnread={this.props.markAsUnread}
        markAsRead={this.props.markAsRead}
        mapComponent={<div>MAP COMPONENT</div>}
      />
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  let data = state[PRODUCT_TYPES.LOCATION].get('productData');

  if (!!data) {
    data = data.toJS();
  }
  return {
    isFetching: state[PRODUCT_TYPES.LOCATION].get('isFetching'),
    isFirstRequest: state[PRODUCT_TYPES.LOCATION].get('isFirstRequest'),
    keyword: state[PRODUCT_TYPES.SEARCH].get('keyWord'),
    timerIndicator: 1,
    updateTimeIndicator: 4000,
    data,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // loadLocation: (agentId: string) => {dispatch(locationLoadRequest(agentId))},
    setStar: (id: string, isFavorite: boolean) => {
      dispatch(productSetFavorite({id, isFavorite}, PRODUCT_TYPES.LOCATION))},
    removeTag: (id: string, tagId: TagId) => {
      dispatch(productRemoveTag({id, tagId}, PRODUCT_TYPES.LOCATION))},
    addTag: (ids: string[], tags: TagData[]) => {dispatch(productAddTag({ids, tags}, PRODUCT_TYPES.LOCATION))},
    markAsRead: (ids: string[]) => {dispatch(productMarkAsRead({ids}, PRODUCT_TYPES.LOCATION))},
    markAsUnread: (ids: string[]) => {dispatch(productMarkAsUnread({ids}, PRODUCT_TYPES.LOCATION))},
    requestUpdate: () => {/* TODO: implement the function */ },
    extractNow: () => {/* TODO: implement the function */ },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LocationPage)
