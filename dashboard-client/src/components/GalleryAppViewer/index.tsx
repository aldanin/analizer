import * as React from 'react';
import GalleryContent from './Content';
import Component = React.Component;
import { PhotoData } from '../../types/Photo';
import AppViewFiltersTool from '../Common/AppViewFilterTool/index';
import AppViewHeaderToolbar from '../Common/AppViewHeaderTool/index';
import { ThemeProvider } from 'styled-components';
import styled from 'styled-components';
import { ThemeProps, DEFAULT_THEME } from './Theme';
import GallerySortDropDown from './SortDropDown';
import { TagData, TagId } from '../../types/Tag';
import KeywordProvider from '../../containers/KeywordPRovider';
import { ProductID } from 'common-interfaces/types/Product';
import LoadingIndicator from '../Common/LoadingIndicator';

const GalleryViewer = styled.div`
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  font-size: 1.9rem;
`;

const Header = styled.span`
  height: 56px;
  width: 100%;
`;

const Filter = styled.span`
  height: 40px;
  width: 100%;
`;

const Content = styled.span`
  position: relative;
  top: 2px;
  height: 84%;
  width: 100%;
`;

export interface GalleryProps {
  photos: PhotoData[];
  timerIndicator: number;
  updateTimeIndicator: number;
  filter: string;
  setStar: (id: ProductID, isFavorite: boolean) => void;
  addTag: (photoId: ProductID[], tag: TagData[]) => void;
  setUnRead: (photoId: ProductID[]) => void;
  setRead: (photoId: ProductID[]) => void;
  addToNotebook: (photoId: ProductID[]) => void;
  askForTranslate: (photoId: ProductID[]) => void;
  askForTranscript: (photoId: ProductID[]) => void;
  exportItem: (photoId: ProductID[]) => void;
  removeTag: (photoId: ProductID, tagId: TagId) => void;
  selectItem: (photoId: ProductID) => void;
  sort: (filter: string) => void;
  imageOption: (photoId: number, optionIndex: number) => void;
  show: () => void;
  tags: () => void;
  requestGalleryUpdate: () => void;
  getFullSizeImage: () => void;
  extractNow: () => void;
  isFetching: boolean;
  isFirstRequest: boolean;
  keyword?: string;
  theme?: ThemeProps;
}

export interface GalleryState {
  selectedItems: ProductID[];
}

class GalleryApp extends Component<GalleryProps, GalleryState> {
  static defaultProps: Partial<GalleryProps> = {
    theme: DEFAULT_THEME,
    keyword: '',
  }

  constructor(props: GalleryProps) {
    super(props);
    this.state = {
      selectedItems: [],
    };
  }

  addMultiTags(tag: TagData[]) {
    this.props.addTag(this.state.selectedItems, tag);
  }

  addMultiNotebooks() {
    this.props.addToNotebook(this.state.selectedItems);
  }

  markMultiAsRead() {
    this.props.setRead(this.state.selectedItems);
  }

  markMultiAsUnRead() {
    this.props.setUnRead(this.state.selectedItems);
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

  itemSelected = (photoId: ProductID) => {
    if (this.state.selectedItems.indexOf(photoId) > -1) {
      return
    }
    let index = this.props.photos.findIndex(item => item.id === photoId);
    if (!this.props.photos[index].isRead) {
      this.props.setRead([photoId]);
    }
    let newArray = this.state.selectedItems.slice(0);
    newArray.push(photoId);
    this.setState({
      selectedItems: newArray,
    })
  }

  itemUnSelected = (photoId: ProductID) => {
    const index = this.state.selectedItems.indexOf(photoId);
    if (index === -1) {
      return
    }
    let newArray = this.state.selectedItems.slice(0);
    newArray.splice(index, 1);
    this.setState({
      selectedItems: newArray,
    })
  }

  isItemSelected = (photoId: ProductID) => {
    return (this.state.selectedItems.indexOf(photoId) > -1);
  }

  renderMainContent = () => {
    if (this.props.isFirstRequest && this.props.isFetching) {
      return <LoadingIndicator/>
    }

    const handlers = {
      setStar: this.props.setStar,
      addTag: this.props.addTag,
      removeTag: this.props.removeTag,
      imageOption: this.props.imageOption,
      setUnRead: this.props.setUnRead,
      setRead: this.props.setRead,
      addToNotebook: this.props.addToNotebook,
      askForTranslate: this.props.askForTranslate,
      askForTranscript: this.props.askForTranscript,
      exportItem: this.props.exportItem,
      getFullSizeImage: this.props.getFullSizeImage,
    }

    return (
      <Content>
        <GalleryContent
          photos={this.props.photos}
          handlers={handlers}
          onItemSelected={this.itemSelected}
          onItemUnSelected={this.itemUnSelected}
          isItemSelected={this.isItemSelected}
          selectItem={this.props.selectItem}
          onChangeImage={(id: ProductID) => {
            let index = this.props.photos.findIndex(item => item.id === id);
            if (!this.props.photos[index].isRead) {
              this.props.setRead([id]);
            }
          }}
        />
      </Content>
    )
  }

  render() {
    const component = (
      <GallerySortDropDown sort={this.props.sort} filter={this.props.filter} theme={this.props.theme}/> )

    return (
      <ThemeProvider theme={this.props.theme}>
        <KeywordProvider keyword={this.props.keyword}>
          <GalleryViewer>
            <Header>
              <AppViewHeaderToolbar
                icon={'icon_gallery'}
                title={'Gallery'}
                titleStyle={{marginLeft: '25px'}}
                lastExtractionTime={this.props.isFetching ? 0 : this.props.timerIndicator}
                requestUpdate={this.props.requestGalleryUpdate}
                extractNow={this.props.extractNow}
                updateTimeIndicator={this.props.isFetching ? 0 : this.props.updateTimeIndicator}
                theme={this.props.theme.defaultColors.appViewHeaderTool}
              />
            </Header>
            <Filter>
              <AppViewFiltersTool
                component={process.env.REACT_APP_IS_FILTERED_ENABLED ? component : (<div/>)}
                show={this.props.show}
                tags={this.props.tags}
                actions={{
                  addTagCallback: (tags: TagData[]) => {
                    this.addMultiTags(tags)
                  },
                  addToNotebookCallback: () => {
                    this.addMultiNotebooks()
                  },
                  markAsReadCallback: () => {
                    this.markMultiAsRead()
                  },
                  markAsUnreadCallback: () => {
                    this.markMultiAsUnRead()
                  },
                  translateCallback: () => {
                    this.askMultiTranslate()
                  },
                  transcriptCallback: () => {
                    this.askMultiTranscript()
                  },
                  exportCallback: () => {
                    this.exportMultiItems()
                  },
                }}
                theme={this.props.theme.defaultColors.appViewFilterTool}
                amountOfSelectedItems={this.state.selectedItems.length}
                onClearSelectedItems={() => this.setState({
                  selectedItems: [],
                })}
              />
            </Filter>
            {this.renderMainContent()}
          </GalleryViewer>
        </KeywordProvider>
      </ThemeProvider>)
  }
}

export default GalleryApp;
