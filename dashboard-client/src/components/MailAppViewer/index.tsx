import * as React from 'react'
import * as Theme from './Theme'
import styled, { ThemeProvider } from 'styled-components';
import KeywordProvider from '../Common/SearchMarker/KeywordProvider';
import AppViewHeaderToolbar from '../Common/AppViewHeaderTool/index';
import AppViewFiltersTool from '../Common/AppViewFilterTool/index';
import TabGeneric from '../Common/TabGeneric/index';
import MailContacts from './MailContacts';
import { AccountMailData } from '../../types/Mail';
import { TagData, TagId } from '../../types/Tag';
import LoadingIndicator from '../Common/LoadingIndicator';

const MailAppView = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  font-size: 1.9rem;
  width: 100%;
  height: 100%;
`;

const Tabs = styled.div`
  margin-left: 25px;
  font-size: 80%;
`;

export interface MailAppViewerProps extends React.Props<MailAppViewer> {
  isFetching: boolean;
  requestUpdate: () => void;
  lastExtraction: number;
  updateTimeIndicator: number;
  extractNow: () => void;
  showFilter: () => void;
  tagsFilter: () => void;
  keyword: string;
  data: AccountMailData[];
  setStar: (id: string, isFavorite: boolean) => void;
  removeTag: (id: string, tagId: TagId) => void;
  mailAddTag: (ids: string[], tags: TagData[]) => void;
  markAsRead: (ids: string[]) => void;
  markAsUnread: (ids: string[]) => void;
  updateAccount: (accountId: string) => void;
  theme?: Theme.ThemeProps
}
export interface MailAppViewerState {
  activeIndex: number;
  accountIndex: number;
  mailIndex: number;
  selectedItems: string[];
}

class MailAppViewer extends React.Component<MailAppViewerProps, MailAppViewerState> {

  static defaultProps: Partial<MailAppViewerProps> = {
    theme: Theme.defaultTheme
  }

  constructor (props: MailAppViewerProps) {
    super(props)

    this.state = {
      activeIndex: 1,
      accountIndex: 0,
      mailIndex: 0,
      selectedItems: [],
    }
  }

  itemSelected = (id: string) => {
    if (this.state.selectedItems.indexOf(id) > -1) {return}
    let newArray = this.state.selectedItems.slice(0);
    newArray.push(id);
    this.setState({
      selectedItems: newArray,
    })
  };

  itemUnSelected = (id: string) => {
    const index = this.state.selectedItems.indexOf(id);
    if (index === -1) {return}
    let newArray = this.state.selectedItems.slice(0);
    newArray.splice(index, 1);
    this.setState({
      selectedItems: newArray,
    })
  }

  isItemSelected = (id: string) => {
    return (this.state.selectedItems.indexOf(id) > -1);
  }

  changeLabelChosen(id: string) {
    this.props.updateAccount(id);
    for (let i = 0; i < this.props.data.length; i++) {
      if (id === this.props.data[i].id) {
        this.setState({
          accountIndex: i,
          mailIndex: 0,
        });
        break;
      }
    }
  }

  changeMailChosen(id: string) {
    for (let i = 0; i < this.props.data[this.state.accountIndex].inbox.length; i++) {
      if (id === this.props.data[this.state.accountIndex].inbox[i].id) {
        this.setState({
          mailIndex: i,
        });
        break;
      }
    }
  }

  addMultiTags(tags: TagData[]) {
    this.props.mailAddTag(this.state.selectedItems, tags);
  }

  markMultiAsRead() {
    this.props.markAsRead(this.state.selectedItems);
  }

  markMultiAsUnRead() {
    this.props.markAsUnread(this.state.selectedItems);
  }

  renderCurrentTab() {
    switch (this.state.activeIndex) {
      case 0:
        return this.renderFolders();

      case 1:
        return this.renderContacts();

      default:
        return <div>Error</div>
    }
  }

  renderFolders() {
    return <div style={{padding: '5rem 0rem 0rem 20rem'}}>TBD</div>
  }

  renderContacts() {
    return (
      <MailContacts
        data={this.props.data}
        accountIndex={this.state.accountIndex}
        mailIndex={this.state.mailIndex}
        onLabelClick={(id: string) => {this.changeLabelChosen(id)}}
        onMailClick={(id: string) => {this.changeMailChosen(id)}}
        mailAddTag={this.props.mailAddTag}
        markAsRead={this.props.markAsRead}
        markAsUnread={this.props.markAsUnread}
        setStar={(id: string, isFavorite: boolean) => {
          this.props.setStar(id, isFavorite)
        }}
        removeTag={(id: string, tagId: TagId) => {
          this.props.removeTag(id, tagId)
        }}
        itemSelected={this.itemSelected}
        itemUnSelected={this.itemUnSelected}
        isItemSelected={this.isItemSelected}
      />
    )
  }

  render() {
    const MailTabs = [{
      title: 'Folders',
      callback: () => {{this.setState({activeIndex: 0})}},
    }, {
      title: 'Contacts',
      callback: () => {{this.setState({activeIndex: 1})}},
    }];

    const component = (
      <Tabs>
        <TabGeneric
          tabs={MailTabs}
          initialSelectedIndex={this.state.activeIndex}
          theme={this.props.theme.tabs}
        />
      </Tabs>)

    if (this.props.isFetching) {
      return <LoadingIndicator/>
    }

    return (
      <ThemeProvider theme={this.props.theme}>
        <KeywordProvider keyword={this.props.keyword}>
          <MailAppView>
            <AppViewHeaderToolbar
              icon={'icon_mail'}
              title={'Mail'}
              titleStyle={{marginLeft: '25px'}}
              lastExtractionTime={this.props.isFetching ? 0 : this.props.lastExtraction}
              updateTimeIndicator={this.props.isFetching ? 0 : this.props.updateTimeIndicator}
              requestUpdate={this.props.requestUpdate}
              extractNow={this.props.extractNow}
            />
            <AppViewFiltersTool
              amountOfSelectedItems={this.state.selectedItems.length}
              onClearSelectedItems={() => this.setState({
                selectedItems: [],
              })}
              component={false ? component : null}
              show={this.props.showFilter}
              tags={this.props.tagsFilter}
              actions={{
                addTagCallback: (tags: TagData[]) => {this.addMultiTags(tags)},
                addToNotebookCallback: () => {/*TODO: implement for multi selected items*/},
                markAsReadCallback: () => {this.markMultiAsRead()},
                markAsUnreadCallback: () => {this.markMultiAsUnRead()},
                translateCallback: () => {/*TODO: implement for multi selected items*/},
                transcriptCallback: () => {/*TODO: implement for multi selected items*/},
                exportCallback: () => {/*TODO: implement for multi selected items*/},
              }}
            />
            {this.renderCurrentTab()}
          </MailAppView>
        </KeywordProvider>
      </ThemeProvider>
    )
  }
}

export default MailAppViewer
