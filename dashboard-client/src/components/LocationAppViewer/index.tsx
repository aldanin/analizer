import * as React from 'react'
import * as Theme from './Theme'
import styled, { ThemeProvider } from 'styled-components';

import config from '../../config';
import KeywordProvider from '../Common/SearchMarker/KeywordProvider';
import AppViewHeaderToolbar from '../Common/AppViewHeaderTool/index';
import AppViewFiltersTool from '../Common/AppViewFilterTool/index';
import { TagData, TagId } from '../../types/Tag';
import FontIcon from 'material-ui/FontIcon';
import Details from './Details';
import { ProductID } from '../../types/Product';
import { Location } from 'common-interfaces/types/Location';
import DataFetcher from '../../containers/DataFetcherGeneric'
import { PRODUCT_TYPES } from '../../types/Product'
import LoadingIndicator from '../Common/LoadingIndicator';

const DetailsWithDataFetcher = DataFetcher(
  Details, PRODUCT_TYPES.LOCATION, 50)

import CcMap from '../Common/CcMap';

const LocationViewer = styled.div`
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  font-size: 1.9rem;
`;

const HeaderContainer = styled.span`
  height: 56px;
  width: 100%;
`;

const FilterContainer = styled.span`
  height: 40px;
  width: 100%;
`;

const CollapseAndExpandContainer = styled.div`
  position: relative;
  left: 1%;
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 50%;
`;

const ToggleCollapseAndExpand = styled.span`
  position: relative;
  top: 11px;
  color: ${prop => prop.theme.linkColor};
  text-decoration: none;
  margin-left: 2%;
  margin-right: 5%;
  font-size: 50%;
  font-weight: bold;
  cursor: pointer;
  white-space: nowrap;
`;

const PipeContainer = styled.span`
  color: ${prop => prop.theme.pipeColor};
  position: relative;
  top: 1px;
`;

const LocationAPP = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const DataContainer = styled.div`
  width: 40%;
  height: 100%;
  overflow: hidden;
  box-sizing: border-box;
`;

const MapContainer = styled.div`
  width: 60%;
  height: 100%;
  overflow: hidden;
  box-sizing: border-box;
  border-left: 1px solid ${prop => prop.theme.borderColor};
`;

const styles = {
  collapseIcon: {},

  expandIcon: {},
};

export interface LocationAppViewerProps extends React.Props<LocationAppViewer> {
  data: Location[];
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
  mapComponent?: JSX.Element;
  keyword?: string;
  theme?: Theme.ThemeProps
}

export interface LocationAppViewerState {
  selectedItems: ProductID[];
  isExpandMode: boolean;
  openItems: ProductID[],
}

class LocationAppViewer extends React.Component<LocationAppViewerProps, LocationAppViewerState> {

  static defaultProps: Partial<LocationAppViewerProps> = {
    theme: Theme.defaultTheme,
    keyword: '',
    mapComponent: <div>Cannot load map</div>
  }

  constructor(props: LocationAppViewerProps) {
    super(props)

    this.state = {
      selectedItems: [],
      isExpandMode: false,
      openItems: [],
    }
  }

  addMultiTags(tag: TagData[]) {
    this.props.addTag(this.state.selectedItems as string[], tag);
  }

  markMultiAsRead() {
    this.props.markAsRead(this.state.selectedItems as string[]);
  }

  markMultiAsUnRead() {
    this.props.markAsUnread(this.state.selectedItems as string[]);
  }

  itemSelected = (id: ProductID) => {
    if (this.state.selectedItems.indexOf(id) > -1) {
      return
    }
    let newArray = this.state.selectedItems.slice(0);
    newArray.push(id);
    this.setState({
      selectedItems: newArray,
    })
  };

  itemUnSelected = (id: ProductID) => {
    const index = this.state.selectedItems.indexOf(id);
    if (index === -1) {
      return
    }
    let newArray = this.state.selectedItems.slice(0);
    newArray.splice(index, 1);
    this.setState({
      selectedItems: newArray,
    })
  };

  isItemSelected = (id: ProductID) => {
    return (this.state.selectedItems.indexOf(id) > -1);
  };

  updateOpenItems = (id: ProductID, isOpen: boolean) => {
    let newState = this.state.openItems;
    let index = newState.indexOf(id);
    if (isOpen) {
      if (index > -1) {
        return
      }
      newState.push(id);
    } else {
      if (index === -1) {
        return
      }
      newState.splice(index, 1);
    }
    this.setState({openItems: newState});
  };

  isOpen = (id: ProductID) => {
    return (this.state.openItems.indexOf(id) > -1);
  };

  renderCollapseAndExpand() {
    styles.expandIcon = {
      color: this.props.theme.linkColor,
      position: 'relative',
      top: '1.2rem',
      paddingLeft: '3rem',
      paddingRight: '0.5rem',
      fontSize: '45%',
    };

    styles.collapseIcon = {
      color: this.props.theme.linkColor,
      position: 'relative',
      top: '1.1rem',
      paddingLeft: '0.5rem',
      paddingRight: '0.5rem',
      fontSize: '50%',
    }

    return (
      <CollapseAndExpandContainer>
        <FontIcon className="base_icons icon_expand" style={styles.expandIcon}/>
        <ToggleCollapseAndExpand
          onClick={() => {
            this.setState({isExpandMode: true})
          }}
        >
          Expand All
        </ToggleCollapseAndExpand>
        <PipeContainer>|</PipeContainer>
        <FontIcon className="base_icons icon_collapse" style={styles.collapseIcon}/>
        <ToggleCollapseAndExpand
          onClick={() => {
            this.setState({isExpandMode: false})
          }}
        >
          Collapse All
        </ToggleCollapseAndExpand>
      </CollapseAndExpandContainer>
    )
  }

  renderMainContent = () => {
    if (this.props.isFirstRequest && this.props.isFetching) {
      return <LoadingIndicator/>
    }

    return (
      <LocationAPP>
        <DataContainer>
          <DetailsWithDataFetcher
            onItemSelected={this.itemSelected}
            onItemUnSelected={this.itemUnSelected}
            isItemSelected={this.isItemSelected}
            updateOpenItems={this.updateOpenItems}
            isOpen={this.isOpen}
            isExpandMode={this.state.isExpandMode}
            data={this.props.data}
            removeTag={this.props.removeTag}
            setStar={this.props.setStar}
            addTag={this.props.addTag}
            markAsUnread={this.props.markAsUnread}
            markAsRead={this.props.markAsRead}
          />
        </DataContainer>
        <MapContainer>
          <CcMap
            markers={this.props.data}
            selectedMarkers={this.state.selectedItems}
            center={{lat: 0, lng: 0}}
            tilesURI={`${config.webservices.address}/gis/{z}/{x}/{y}.png`}
          />
        </MapContainer>
      </LocationAPP>
    )
  }

  render() {
    return (
      <ThemeProvider theme={this.props.theme}>
        <KeywordProvider keyword={this.props.keyword}>
          <LocationViewer>
            <HeaderContainer>
              <AppViewHeaderToolbar
                icon={'icon_location'}
                title={'Location'}
                titleStyle={{marginLeft: '25px'}}
                lastExtractionTime={this.props.isFetching ? 0 : this.props.timerIndicator}
                requestUpdate={this.props.requestUpdate}
                extractNow={this.props.extractNow}
                updateTimeIndicator={this.props.isFetching ? 0 : this.props.updateTimeIndicator}
              />
            </HeaderContainer>
            <FilterContainer>
              <AppViewFiltersTool
                component={this.renderCollapseAndExpand()}
                show={() => null}
                tags={() => null}
                actions={{
                  addTagCallback: (tags: TagData[]) => this.addMultiTags(tags),
                  addToNotebookCallback: () => null,
                  markAsReadCallback: () => this.markMultiAsRead(),
                  markAsUnreadCallback: () => this.markMultiAsUnRead(),
                  translateCallback: () => null,
                  transcriptCallback: () => null,
                  exportCallback: () => null,
                }}
                amountOfSelectedItems={this.state.selectedItems.length}
                onClearSelectedItems={() => this.setState({
                  selectedItems: [],
                })}
              />
            </FilterContainer>
            {this.renderMainContent()}
          </LocationViewer>
        </KeywordProvider>
      </ThemeProvider>
    )
  }
}

export default LocationAppViewer
