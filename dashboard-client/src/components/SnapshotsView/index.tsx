import * as React from 'react'
import * as Theme from './Theme'
import styled from 'styled-components'
import AppViewHeaderTool from '../Common/AppViewHeaderTool'
import AppViewFilterTool from '../Common/AppViewFilterTool'
import Card from './Card'
import { ThemeProvider } from 'styled-components'
import { SnapshotID, SnapshotsData } from '../../types/Snapshots';
import PhotoGrid from '../Common/PhotoGrid/index';
import StarIcon from '../Common/StarIcon/StarIcon';
import FontIcon from 'material-ui/FontIcon'
import { TagData, TagId } from '../../types/Tag';
import TagsList from '../Common/TagsList/index';
import ActionMenu from '../Common/ActionMenu/index';
import KeywordProvider from '../../containers/KeywordPRovider';
import LoadingIndicator from '../Common/LoadingIndicator';
import DataFetcher from '../../containers/DataFetcherGeneric'
import { PRODUCT_TYPES } from '../../types/Product'

const PhotoGridWithDataFetcher = DataFetcher(
  PhotoGrid, PRODUCT_TYPES.SNAPSHOTS, 10)

const SnapshotView = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 1.9rem;
  overflow: hidden;
  width: 100%;
  height: 100%;
`;

// const NoItems = styled.div`
//   padding: 2rem;
// `;

const Content = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
`;

const Grid = styled.span`
  position: relative;
  display: flex;
  justify-content: flex-start;
  width: 55%;
  height: 100%;
`;

const CardSpan = styled.span`
  display: inline-block;
  justify-content: flex-end;
  width: 45%;
  height: 100%;
`;

interface HeaderToolProps {
  width: string;
  left: string;
}

const HeaderTool = styled.div`
  display: flex;
  flex-wrap: no-wrap;
  background-color: ${props => (props.theme.photoGrid.titleBgColor)};
  width: ${(prop: HeaderToolProps) => prop.width};
  position: absolute;
  top: 15px;
  left: ${(prop: HeaderToolProps) => prop.left};
  height: 30px;
  z-index: 99;
`;

const RightTool = styled.span`
  display: flex;
  justify-content: flex-end;
  width: 20%;
  height: 100%;
`;

const LeftTool = styled.span`
  display: flex;
  justify-content: flex-start;
  width: 80%;
  height: 100%;
`;

const CheckboxSpan = styled.span`
  width: 34%;
  height: 100%;
`;

const Title = styled.span`
  position: relative;
  width: 66%;
  height: 100%;
  color: ${prop => prop.theme.photoGrid.titleColor};
  font-weight: bold;
  font-size: 70%;
`;

const StarSpan = styled.span`
  position: absolute;
  top: 4px;
  height: 100%;
  position: relative;
  margin-right: 24px;
  z-index: 999;
`;

const ActionSpan = styled.span`
  position: absolute;
  top: 7px;
  right: 2px;
  font-size: 60%;
  color: ${prop => prop.theme.gridActionIconColor};
  height: 100%;
  z-index: 999;
  cursor: pointer;
`;

const TagsSpan = styled.span`
  position: relative;
  top: 4px;
  margin-right: 10%;
  font-size: 55%;
  height: 100%;
  white-space: nowrap;
  z-index: 999;
`;

const SnapShotsStarSpan = styled.span`
  position: absolute;
  top: 19px;
  right: 35px;
`;

const TransportAction = styled.span`
  display: block;
  position: absolute;
  top: 20px;
  right: 9px;
  width: 18px;
  height: 20px;
  z-index: 9999;
`;

const styles = {
  actionMenuIcon: {
  },
  transparentActionMenuIcon: {
    top: '-13px',
    left: '2px',
    fontSize: '17px',
    color: 'transparent',
    cursor: 'pointer',
  }
}

export interface SnapshotsViewProps extends React.Props<SnapshotsView> {
  photos: SnapshotsData[];
  isFetching: boolean;
  isFirstRequest: boolean;
  updateRequest: () => void;
  extractNow: () => void;
  lastExtraction: number;
  updateTimeIndicator: number;
  showFilter: () => void;
  tagsFilter: () => void;
  actions: () => void;
  addTag: (ids: SnapshotID[], tags: TagData[]) => void;
  addToNotebook: (ids: SnapshotID[]) => void;
  markAsRead: (ids: SnapshotID[]) => void;
  markAsUnRead: (ids: SnapshotID[]) => void;
  askForTranslate: (ids: SnapshotID[]) => void;
  askForTranscript: (ids: SnapshotID[]) => void;
  exportItem: (ids: SnapshotID[]) => void;
  getFullSizeImage: () => void;
  setStar: (id: SnapshotID, isFavorite: boolean) => void;
  removeTag: (itemID: SnapshotID, tagId: TagId) => void;
  keyword: string;
  theme?: Theme.ThemeProps
}
export interface SnapshotsViewState {
  selectedImage: number;
  selectedItems: SnapshotID[];
}

class SnapshotsView extends React.Component<SnapshotsViewProps, SnapshotsViewState> {

  static defaultProps: Partial<SnapshotsViewProps> = {
    theme: Theme.DEFAULT_THEME
  }

  constructor (props: SnapshotsViewProps) {
    super(props)

    this.state = {
      selectedImage: 0,
      selectedItems: [],
    }
  }

  itemSelected = (photoId: SnapshotID) => {
    if (this.state.selectedItems.indexOf(photoId) > -1) {return}
    let newArray = this.state.selectedItems.slice(0);
    this.setState({
      selectedItems: newArray,
    })
  }

  itemUnSelected = (photoId: SnapshotID) => {
    const index = this.state.selectedItems.indexOf(photoId);
    if (index === -1) {return}
    let newArray = this.state.selectedItems.slice(0);
    newArray.splice(index, 1);
    this.setState({
      selectedItems: newArray,
    })
  }

  isItemSelected = (photoId: SnapshotID) => {
    return (this.state.selectedItems.indexOf(photoId) > -1);
  }

  addMultiTags(tag: TagData[]) {
    this.props.addTag(this.state.selectedItems, tag);
  }

  addMultiNotebooks() {
    this.props.addToNotebook(this.state.selectedItems);
  }

  markMultiAsRead() {
    this.props.markAsRead(this.state.selectedItems);
  }

  markMultiAsUnRead() {
    this.props.markAsUnRead(this.state.selectedItems);
  }

  askMultiTranslate() {
    this.props.askForTranslate(this.state.selectedItems);
  }

  askMultiTranscript() {
    this.props.askForTranscript(this.state.selectedItems);
  }

  exportMultiItems() {
    this.props.exportItem(this.state.selectedItems);
  }

  changeSelectedImage(id: SnapshotID) {
    let photoId = this.props.photos.findIndex(item => item.id === id);
    if (!this.props.photos[photoId].isRead) {
      this.props.markAsRead([id]);
    }
    this.setState({selectedImage: photoId});
  }

  getActionMenu(id: SnapshotID) {
    return (
      <TransportAction>
        <ActionMenu
          iconStyle={styles.transparentActionMenuIcon}
          addTagCallback={(tags: TagData[]) => {this.props.addTag([id], tags)}}
          addToNotebookCallback={() => {this.props.addToNotebook([id])}}
          markAsReadCallback={() => {this.props.markAsRead([id])}}
          markAsUnreadCallback={() => {this.props.markAsUnRead([id])}}
          translateCallback={() => {this.props.askForTranslate([id])}}
          transcriptCallback={() => {this.props.askForTranscript([id])}}
          exportCallback={() => {this.props.exportItem([id])}}
        />
      </TransportAction>
    )
  }

  renderMainContent = () => {
    if (this.props.isFirstRequest && this.props.isFetching) {
      return <LoadingIndicator/>
    }

    return (
      <Content>
        <Grid>
          <PhotoGridWithDataFetcher
            photos={this.props.photos}
            actionMenu={(id: SnapshotID) => this.getActionMenu(id)}
            onItemSelected={this.itemSelected}
            onItemUnSelected={this.itemUnSelected}
            isSinglePhoto={true}
            isCheckboxVisible={true}
            width={'255px'}
            height={'290px'}
            headerTool={(id: SnapshotID, title, isFavorite, isChecked) => {
              return this.renderHeaderTool(id, title, isFavorite, isChecked)}}
            selectedItem={(id: SnapshotID) => {this.changeSelectedImage(id)}}
            starSpan={(
              <SnapShotsStarSpan>
                <StarIcon
                  isFull={true}
                  width={'15px'}
                  height={'15px'}
                  callback={() => null}
                  theme={{
                    fullStarStrokeColor: '#FFFFFF',
                    fullStarFillColor: '#49AAC8',
                    emptyStarStrokeColor: '#C5C8D7',
                    emptyStarFillColor: 'transparent',
                  }}
                />
              </SnapShotsStarSpan>
            )}
            theme={this.props.theme.photoGrid}
            isItemSelected={this.isItemSelected}
          />
        </Grid>
        {this.props.photos.length > 0 ? (
          <CardSpan>
            <Card
              id={this.props.photos[this.state.selectedImage].id}
              frontPhoto={this.props.photos[this.state.selectedImage].frontPhoto}
              backPhoto={this.props.photos[this.state.selectedImage].backPhoto}
              time={this.props.photos[this.state.selectedImage].time}
              latitude={this.props.photos[this.state.selectedImage].latitude}
              longitude={this.props.photos[this.state.selectedImage].longitude}
              lastExtracted={this.props.photos[this.state.selectedImage].lastExtracted}
              isVertical={this.props.photos[this.state.selectedImage].isVertical}
              isFavorite={this.props.photos[this.state.selectedImage].isFavorite}
              tags={this.props.photos[this.state.selectedImage].tags}
              setStar={this.props.setStar}
              removeTag={this.props.removeTag}
              getFullSizeImage={this.props.getFullSizeImage}
              addTag={this.props.addTag}
              addToNotebook={this.props.addToNotebook}
              markAsRead={this.props.markAsRead}
              markAsUnRead={this.props.markAsUnRead}
              askForTranslate={this.props.askForTranslate}
              askForTranscript={this.props.askForTranscript}
              exportItem={this.props.exportItem}
            />
          </CardSpan>
        ) : null }
      </Content>
    )
  }

  render() {
    styles.actionMenuIcon = {
      color: this.props.theme.gridActionIconColor,
      fontSize: '17px',
    }
    return (
      <ThemeProvider theme={this.props.theme}>
        <KeywordProvider keyword={this.props.keyword}>
          <SnapshotView>
            <AppViewHeaderTool
              icon={'icon_snapshots'}
              title={'Snapshots'}
              titleStyle={{marginLeft: '20px'}}
              lastExtractionTime={this.props.isFetching ? 0 : this.props.lastExtraction}
              updateTimeIndicator={this.props.isFetching ? 0 : this.props.updateTimeIndicator}
              extractNow={this.props.extractNow}
              requestUpdate={this.props.updateRequest}
              theme={this.props.theme.appViewHeaderTool}
            />
            <AppViewFilterTool
              component={<div/>}
              show={this.props.showFilter}
              tags={this.props.tagsFilter}
              actions={{
                  addTagCallback: (tags: TagData[]) => {this.addMultiTags(tags)},
                  addToNotebookCallback: () => {this.addMultiNotebooks()},
                  markAsReadCallback: () => {this.markMultiAsRead()},
                  markAsUnreadCallback: () => {this.markMultiAsUnRead()},
                  translateCallback: () => {this.askMultiTranslate()},
                  transcriptCallback: () => {this.askMultiTranscript()},
                  exportCallback: () => {this.exportMultiItems()},
              }}
              theme={this.props.theme.appViewFilterTool}
              amountOfSelectedItems={this.state.selectedItems.length}
              onClearSelectedItems={() => this.setState({
                selectedItems: [],
              })}
            />
            {this.renderMainContent()}
          </SnapshotView>
        </KeywordProvider>
      </ThemeProvider>
    )
  }

  renderHeaderTool(id: SnapshotID, title: string, isFavorite: boolean, isChecked: boolean): JSX.Element {
    let index = this.props.photos.findIndex(item => item.id === id);
    let left = '12px';
    let width = '91.2%';

    return (
      <HeaderTool left={left} width={width}>
        <LeftTool>
          <CheckboxSpan/>
          <Title>{title}</Title>
        </LeftTool>
        <RightTool>
          <TagsSpan>
            <TagsList
              tags={this.props.photos[index].tags}
              callback={(tagId: TagId) => {this.props.removeTag(id, tagId)}}
              theme={this.props.theme.gridTagsTheme}
            />
          </TagsSpan>
          <StarSpan>
            {isFavorite ? (
              <span
                style={{cursor: 'pointer'}}
              >
                <StarIcon
                  isFull={true}
                  width={'15px'}
                  height={'15px'}
                  callback={() => {this.props.setStar(id, false)}}
                  theme={{
                    fullStarStrokeColor: '#FFFFFF',
                    fullStarFillColor: '#49AAC8',
                    emptyStarStrokeColor: '#C5C8D7',
                    emptyStarFillColor: 'transparent',
                  }}
                />
              </span>) : (
              <FontIcon
                onClick={() => {this.props.setStar(id, true)}}
                className="base_icons icon_star_empty"
                style={{
                  color: this.props.theme.photoGrid.starStroke,
                  fontSize: '80%',
                  cursor: 'pointer'}}
              />)}
          </StarSpan>
          <ActionSpan>
            <ActionMenu
              iconStyle={styles.actionMenuIcon}
              addTagCallback={() => {return null}}
              addToNotebookCallback={() => {return null}}
              markAsReadCallback={() => {return null}}
              markAsUnreadCallback={() => {return null}}
              translateCallback={() => {return null}}
              transcriptCallback={() => {return null}}
              exportCallback={() => {return null}}
            />
          </ActionSpan>
        </RightTool>
      </HeaderTool>
    )
  }

}

export default SnapshotsView
