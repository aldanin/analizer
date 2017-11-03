import * as React from 'react'
import styled from 'styled-components';
import { Location } from 'common-interfaces/types/Location';
import ProductItem from './ProductItem';
import { ProductID } from '../../types/Product';
import { TagData, TagId } from '../../types/Tag';
import SmartScroller from '../Common/SmartScroller'
import { DEFAULT_INNER_PROPS_EXTENSION, DataFetcherPropsExtension } from '../../containers/DataFetcherGeneric'

const DetailsView = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
`;

const TitleLine = styled.div`
  display: flex;
  width: 100%;
  line-height: 3rem;
  border-bottom: 1px solid ${prop => prop.theme.borderColor};
  box-sizing: border-box;
`;

const LocationTitle = styled.div`
  color: ${prop => prop.theme.titleColor};
  font-size: 1.2rem;
  font-weight: bold;
  padding-left: 6rem;
`;

const TimeTitle = styled.div`
  color: ${prop => prop.theme.titleColor};
  font-size: 1.2rem;
  font-weight: bold;
  padding-left: 13rem;
  cursor: pointer;
`;

const TimeFilterIcon = styled.div`
  color: ${prop => prop.theme.titleColor};
  font-size: 1rem;
  line-height: 3.2rem;
  padding-left: 0.5rem;
  cursor: pointer;
`;

const DataContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  overflow-y: auto;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
`;

type ExtendedProps = DetailsProps & DataFetcherPropsExtension;

export interface DetailsProps extends React.Props<Details & DataFetcherPropsExtension> {

  onItemSelected: (id: ProductID) => void;
  onItemUnSelected: (id: ProductID) => void;
  isItemSelected: (id: ProductID) => boolean;
  updateOpenItems: (id: ProductID, isOpen: boolean) => void;
  isOpen: (id: ProductID) => boolean;
  isExpandMode: boolean;
  data: Location[];
  removeTag: (id: string, tagId: TagId) => void;
  setStar: (id: string, isFavorite: boolean) => void;
  addTag: (ids: string[], tags: TagData[]) => void;
  markAsRead: (ids: string[]) => void;
  markAsUnread: (ids: string[]) => void;
  loadMoreData?: (isPrevious: boolean) => void;
  onAutoRequestStateChange?: (isDisabled: boolean) => void;
}

export interface DetailsState {
  groups: Location[][];
}

class Details extends React.Component<ExtendedProps, DetailsState> {
  static defaultProps: Partial<ExtendedProps> = Object.assign(
    {},
    DEFAULT_INNER_PROPS_EXTENSION)

  groupLocations: Location[][];

  constructor(props: DetailsProps) {
    super(props)

    this.groupLocations = [];

    this.state = {
      groups: [],
    }
  }

  componentWillReceiveProps(nextProps: ExtendedProps) {
    this.setState({
      groups: this.getGroupLocations(nextProps.data),
    })
  }

  componentDidMount() {
    this.setState({
      groups: this.getGroupLocations(this.props.data),
    })
  }

  isGroupLocationHasLocation(lng: number, lat: number) {
    let i = this.groupLocations.length;
    while (i--) {
      if (this.groupLocations[i][0].longitude === lng && this.groupLocations[i][0].latitude === lat) {
        return ({
          index: i,
          hasLocation: true,
        })
      }
    }
    return ({
      index: -1,
      hasLocation: false,
    })
  }

  pushLocationSortByTimestamp(item: Location, index: number) {
    let counter = 0;

    while (counter < this.groupLocations[index].length) {
      if (this.groupLocations[index][counter].timestamp > item.timestamp) {
        break;
      } else {
        counter++;
      }
    }
    this.groupLocations[index].splice(counter, 0, item);
  }

  getGroupLocations(locations: Location[]) {
    this.groupLocations = [];
    let counter = 0;

    locations.map(item => {
      let result = this.isGroupLocationHasLocation(item.longitude, item.latitude);
      if (result.hasLocation) {
        this.pushLocationSortByTimestamp(item, result.index);
      } else {
        this.groupLocations[counter] = [];
        this.groupLocations[counter].push(item);
        counter++;
      }
    })
    return this.groupLocations;
  }

  render() {
    return (
      <DetailsView>
        <TitleLine>
          <LocationTitle>Location</LocationTitle>
          <TimeTitle>Time</TimeTitle>
          <TimeFilterIcon className="base_icons icon_tri_down"/>
        </TitleLine>
        <DataContainer>
          <SmartScroller
            onBottomReach={() => this.props.loadMoreData(false)}
            onScrollerStateChange={this.props.onAutoRequestStateChange}
          >
            {this.groupLocations.map((item, idx) => {
              return (
                <ProductItem
                  key={idx}
                  data={item}
                  onItemSelected={this.props.onItemSelected}
                  onItemUnSelected={this.props.onItemUnSelected}
                  isItemSelected={this.props.isItemSelected}
                  isExpandMode={this.props.isExpandMode}
                  updateOpenItems={this.props.updateOpenItems}
                  isOpen={this.props.isOpen}
                  removeTag={this.props.removeTag}
                  setStar={this.props.setStar}
                  addTag={this.props.addTag}
                  markAsUnread={this.props.markAsUnread}
                  markAsRead={this.props.markAsRead}
                />
              )
            })}
          </SmartScroller>
        </DataContainer>
      </DetailsView>
    )
  }
}

export default Details
