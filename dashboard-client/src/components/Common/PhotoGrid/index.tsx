import * as React from 'react'
import { PhotoData } from '../../../types/Photo';
import SinglePhoto from './SinglePhoto';
import styled from 'styled-components';
import { ThemeProvider } from 'styled-components';
import { PhotoGridCommonTheme } from '../../../theme/ScTheme';
import { DEFAULT_THEME, PhotoGridThemeProps } from './Theme';
import { SnapshotID, SnapshotsData } from '../../../types/Snapshots';
import { Product, ProductID } from 'common-interfaces/types/Product';
import SmartScroller from '../../Common/SmartScroller'
import { DEFAULT_INNER_PROPS_EXTENSION, DataFetcherPropsExtension } from '../../../containers/DataFetcherGeneric'

const Grid = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-wrap: wrap;
  width: 100%;
  height: 100%;
  //overflow-y: auto;
  flex: 3;
`;

export type PhotoGridID = ProductID | SnapshotID;

type ExtendedProps = PhotoGridProps & DataFetcherPropsExtension;

export interface PhotoGridProps extends React.Props<PhotoGrid & DataFetcherPropsExtension> {
  photos: PhotoData[] | SnapshotsData[];
  isSinglePhoto: boolean;
  isCheckboxVisible: boolean;
  width: string;
  height: string;
  headerTool: (id: PhotoGridID, title: string, isFavorite: boolean, isChecked: boolean) => JSX.Element;
  selectedItem: (id: PhotoGridID) => void;
  starSpan: JSX.Element;
  actionMenu?: (id: PhotoGridID) => void;
  onItemSelected: (photoId: PhotoGridID) => void;
  onItemUnSelected: (photoId: PhotoGridID) => void;
  isItemSelected?: (photoId: ProductID) => boolean;
  theme?: PhotoGridThemeProps;
}

export interface PhotoGridState {
}

class PhotoGrid extends React.Component<ExtendedProps, PhotoGridState> {
  static defaultProps: Partial<ExtendedProps> = Object.assign(
    {
      theme: DEFAULT_THEME,
      actionMenu: () => {
        return null
      },
      isItemSelected: () => false,
    },
    DEFAULT_INNER_PROPS_EXTENSION)

  constructor(props: PhotoGridProps) {
    super(props);

    this.state = {}
  }

  renderGallerySinglePhoto() {
    return (this.props.photos as PhotoData[]).map((photo, idx) => (
      <SinglePhoto
        key={idx}
        id={photo.id}
        name={photo.name + '.' + photo.type.toLocaleLowerCase()}
        url={photo.url}
        url2={''}
        isVertical={false}
        date={photo.date}
        isFavorite={photo.isFavorite}
        tags={[]}
        actions={<div/>}
        height={this.props.height}
        width={this.props.width}
        highlight={!(photo as Product).isRead}
        headerTool={this.props.headerTool}
        isCheckboxVisible={this.props.isCheckboxVisible}
        selectedItem={this.props.selectedItem}
        starSpan={this.props.starSpan}
        onItemSelected={this.props.onItemSelected}
        onItemUnSelected={this.props.onItemUnSelected}
        isItemSelected={this.props.isItemSelected}
        actionMenu={this.props.actionMenu}
        theme={this.props.theme}
      />)
    )
  }

  renderSnapshotsSinglePhoto() {
    return (this.props.photos as SnapshotsData[]).map((photo, idx) => (
      <SinglePhoto
        key={idx}
        id={photo.id}
        name={''}
        url={photo.frontPhoto}
        url2={''}
        isVertical={photo.isVertical}
        date={photo.time}
        isFavorite={photo.isFavorite}
        tags={[]}
        actions={<div/>}
        height={this.props.height}
        width={this.props.width}
        highlight={!(photo as Product).isRead}
        headerTool={this.props.headerTool}
        isCheckboxVisible={this.props.isCheckboxVisible}
        selectedItem={this.props.selectedItem}
        starSpan={this.props.starSpan}
        onItemSelected={this.props.onItemSelected}
        onItemUnSelected={this.props.onItemUnSelected}
        isItemSelected={this.props.isItemSelected}
        actionMenu={this.props.actionMenu}
        theme={this.props.theme}
      />)
    )
  }

  render() {
    return (
      <ThemeProvider theme={PhotoGridCommonTheme}>
        <SmartScroller
          withTop={false}
          onBottomReach={() => this.props.loadMoreData(false)}
          onScrollerStateChange={this.props.onAutoRequestStateChange}
        >
          <Grid>

            {this.props.isSinglePhoto && this.props.photos.length > 0 ?
              (this.props.photos as SnapshotsData[])[0].backPhoto ? (
                this.renderSnapshotsSinglePhoto()
            ) : (this.renderGallerySinglePhoto()) : (
              this.props.photos as SnapshotsData[]).map((photo, idx) => (
              <SinglePhoto
                key={idx}
                id={photo.id}
                name={''}
                url={photo.frontPhoto}
                url2={photo.backPhoto}
                isVertical={photo.isVertical}
                date={photo.time}
                isFavorite={photo.isFavorite}
                tags={[]}
                actions={<div/>}
                height={this.props.height}
                width={this.props.width}
                highlight={!(photo as Product).isRead}
                headerTool={this.props.headerTool}
                isCheckboxVisible={this.props.isCheckboxVisible}
                selectedItem={this.props.selectedItem}
                starSpan={this.props.starSpan}
                onItemSelected={this.props.onItemSelected}
                onItemUnSelected={this.props.onItemUnSelected}
                isItemSelected={this.props.isItemSelected}
                actionMenu={this.props.actionMenu}
                theme={this.props.theme}
              />)
            )}
          </Grid>
        </SmartScroller>

      </ThemeProvider>
    )
  }
}

export default PhotoGrid
