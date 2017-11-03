import * as React from 'react'
import AppViewFiltersTool from '../Common/AppViewFilterTool/index'
import AppViewHeaderToolbar from '../Common/AppViewHeaderTool/index';
import ContactsFilters from './ContactsFilters'
import ContactsContent from './Content'
import * as Contacts from '../../types/Contacts'
import * as ContactsCommon from 'common-interfaces/types/Contacts'
import * as Tag from '../../types/Tag'
import * as Prod from '../../types/Product'
import * as Theme from './Theme'
import styled from 'styled-components'
import { ThemeProvider } from 'styled-components'
import * as Helpers from '../../helpers/Filters'
import KeywordProvider from '../../containers/KeywordPRovider';
import LoadingIndicator from '../Common/LoadingIndicator';

export interface ContactsAppViewerProps extends React.Props<ContactsApp> {
  data: ContactsCommon.Contact[];
  hasNextPage: boolean;
  isFetching: boolean;
  isFirstRequest: boolean;
  timerIndicator: number;
  updateTimeIndicator: number;
  contentHandlers: {
    addTags: (itemIds: Prod.ProductID[], tags: Tag.TagData[]) => void,
    removeTag: (itemId: Prod.ProductID, tagId: Tag.TagId) => void,
    setFavorite: (itemId: Prod.ProductID, isFavorite: boolean) => void,
    markAsRead: (itemId: Prod.ProductID[], isRead: boolean) => void,
    addToNotebook: (itemIds: Prod.ProductID[]) => void,
    askForTranslate: (itemIds: Prod.ProductID[]) => void,
    askForTranscript: (itemIds: Prod.ProductID[]) => void,
    getTranslate: (itemId: Prod.ProductID) => void,
    getTranscript: (itemId: Prod.ProductID) => void,
    openNotebook: () => void,
    exportItem: (itemIds: Prod.ProductID[]) => void,
    onSliceRendered: (startIndex: number, stopIndex: number) => void;
    onFiltersChange: (filters: Contacts.Filters) => void,
  }
  loadNextPage?: () => void;
  filters: Contacts.Filters;
  keyword?: string;
  theme?: Theme.ThemeProps;
}

export interface ContactsAppViewState {
  selectedItems: Prod.ProductID[];
}

const ContactsViewer = styled.div`
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  // font-size: 1.9rem;
`;

class ContactsApp extends React.Component<ContactsAppViewerProps, ContactsAppViewState> {
  static defaultProps: Partial<ContactsAppViewerProps> = {
    theme: Theme.DEFAULT_THEME,
    keyword: '',
    loadNextPage: () => null,
  };

  private lastId: number;
  private pageSize: number;

  constructor(props: ContactsAppViewerProps) {
    super(props);

    this.state = {
      selectedItems: []
    }

    this.lastId = undefined;
    this.pageSize = undefined;
  }

  addMultiTags(tag: Tag.TagData[]) {
    this.props.contentHandlers.addTags(this.state.selectedItems, tag);
  }

  onItemCheck = (itemId: Prod.ProductID, isChecked: boolean) => {
    if (isChecked !== undefined && isChecked !== null) {
      const index = this.state.selectedItems.indexOf(itemId);

      if (isChecked) {
        if (index === -1) {
          this.state.selectedItems.push(itemId);
        }
      } else {
        if (index !== -1) {
          this.state.selectedItems.splice(index, 1);
        }
      }

      this.setState({selectedItems: this.state.selectedItems.slice(0)})
    }
  }

  doShow = () => {
// TODO
  }

  doTags = () => {
// TODO
  }

  doSearch = () => {
// TODO
  }

  requestUpdate = () => {
    // TODO
  }
  extractNow = () => {
    // TODO
  }

  onHeaderClick = (sortBy: string, sortDirection: boolean) => {

    const filters = Helpers.updateSortFilter(this.props.filters, sortBy, sortDirection);

    this.props.contentHandlers.onFiltersChange(filters);
  }

  onBooleanFilterChange = (key: string, enabled: boolean) => {
    const filters = Helpers.updateBooleanFilters(this.props.filters, key, enabled);

    this.props.contentHandlers.onFiltersChange(filters);
  }

  loadNextPage = () => {
    this.props.loadNextPage();
  }

  renderMainContent = () => {
    if (this.props.isFirstRequest && this.props.isFetching) {
      return <LoadingIndicator/>
    }

    return (
      <KeywordProvider keyword={this.props.keyword}>
        <ContactsContent
          handlers={{
            onItemCheck: this.onItemCheck,
            setFavorite: this.props.contentHandlers.setFavorite,
            addTags: this.props.contentHandlers.addTags,
            removeTag: this.props.contentHandlers.removeTag,
            markAsRead: this.props.contentHandlers.markAsRead,
            addToNotebook: this.props.contentHandlers.addToNotebook,
            askForTranslate: this.props.contentHandlers.askForTranslate,
            askForTranscript: this.props.contentHandlers.askForTranscript,
            getTranslate: this.props.contentHandlers.getTranslate,
            getTranscript: this.props.contentHandlers.getTranscript,
            openNotebook: this.props.contentHandlers.openNotebook,
            exportItem: this.props.contentHandlers.exportItem,
            onSliceRendered: this.props.contentHandlers.onSliceRendered,
            loadNextPage: this.loadNextPage,
            onHeaderClick: this.onHeaderClick,
          }
          }
          hasNextPage={this.props.hasNextPage}
          isFetching={this.props.isFetching}
          data={this.props.data}
          selectedItems={this.state.selectedItems}

          theme={this.props.theme}
        />
      </KeywordProvider>
    )
  }

  render() {
    return (
      <ThemeProvider theme={this.props.theme}>
        <ContactsViewer>
          <div className="contacts-widget-toolbar" style={{fontSize: '1.9rem'}}>
            <AppViewHeaderToolbar
              icon={'icon_contacts'}
              title={'Contacts'}
              titleStyle={{marginLeft: '25px'}}
              lastExtractionTime={this.props.isFetching ? 0 : this.props.timerIndicator}
              requestUpdate={this.requestUpdate}
              extractNow={this.extractNow}
              updateTimeIndicator={this.props.isFetching ? 0 : this.props.updateTimeIndicator}
              theme={this.props.theme.appViewHeaderTool}
            />
          </div>
          <AppViewFiltersTool
            show={this.doShow}
            tags={this.doTags}
            actions={{
              addTagCallback: (tags: Tag.TagData[]) => {
                this.addMultiTags(tags)
              },
              addToNotebookCallback: () => this.props.contentHandlers.addToNotebook(this.state.selectedItems),
              markAsReadCallback: () =>
                this.props.contentHandlers.markAsRead(this.state.selectedItems, true),
              markAsUnreadCallback: () =>
                this.props.contentHandlers.markAsRead(this.state.selectedItems, false),
              translateCallback: () => this.props.contentHandlers.askForTranslate(this.state.selectedItems),
              transcriptCallback: () => this.props.contentHandlers.askForTranscript(this.state.selectedItems),
              exportCallback: () => this.props.contentHandlers.exportItem(this.state.selectedItems),
            }}
            search={this.doSearch}
            component={
              process.env.REACT_APP_IS_FILTERED_ENABLED
                ? (
                  <ContactsFilters
                    handlers={{onBooleanFilterChange: this.onBooleanFilterChange}}
                    theme={this.props.theme}
                  />
                )
                : <div/>}
            amountOfSelectedItems={this.state.selectedItems.length}
            onClearSelectedItems={() => this.setState({
              selectedItems: [],
            })}
          />
          {this.renderMainContent()}
        </ContactsViewer>
      </ThemeProvider>
    )
  }
}

export default ContactsApp;
