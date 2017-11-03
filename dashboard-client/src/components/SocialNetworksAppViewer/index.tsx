import * as React from 'react'
import * as Theme from './Theme'
import styled, { ThemeProvider } from 'styled-components';
import AppViewHeaderToolbar from '../Common/AppViewHeaderTool/index';
import AppViewFiltersTool from '../Common/AppViewFilterTool/index';
import TabGeneric from '../Common/TabGeneric/index';
import { TwitterId } from '../../types/SocialNetworks';
import { TagData } from '../../types/Tag';
import TwitterView from '../../containers/TwitterView';
import LinkedinView from '../../containers/LinkedinView';
import KeywordProvider from '../../containers/KeywordPRovider';

const SocialNetworksView = styled.div`
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

export interface ActionMenuFunctions {
  addTagCallback: (ids: TwitterId[], tags: TagData[]) => void,
  addToNotebookCallback: (ids: TwitterId[]) => void,
  markAsReadCallback: (ids: TwitterId[]) => void,
  markAsUnreadCallback: (ids: TwitterId[]) => void,
  translateCallback: (ids: TwitterId[]) => void,
  transcriptCallback: (ids: TwitterId[]) => void,
  exportCallback: (ids: TwitterId[]) => void,
}

export interface SocialNetworksAppViewerProps extends React.Props<SocialNetworksAppViewer> {
  isFetching: boolean;
  requestUpdate: () => void;
  lastExtraction: number;
  updateTimeIndicator: number;
  extractNow: () => void;
  showFilter: () => void;
  tagsFilter: () => void;
  actionsFilter: () => void;
  keyword: string;
  theme?: Theme.ThemeProps;
}

export interface SocialNetworksAppViewerState {
  activeIndex: number;
}

class SocialNetworksAppViewer extends React.Component<SocialNetworksAppViewerProps, SocialNetworksAppViewerState> {

  static defaultProps: Partial<SocialNetworksAppViewerProps> = {
    theme: Theme.defaultTheme
  }

  constructor (props: SocialNetworksAppViewerProps) {
    super(props)

    this.state = {
      activeIndex: 0,
    }
}

  renderSocial() {
    switch (this.state.activeIndex) {
      case 0:
        return this.renderTwitter();

      case 1:
        return this.renderLinkedin();

      default:
        return <div>Error</div>
    }
  }

  renderTwitter() {
    return (<TwitterView/>)
  }

  renderLinkedin() {
    return (<LinkedinView/>)
  }

  render() {
    const socialNetworksTabs = [{
      title: 'Twitter',
      callback: () => {{this.setState({activeIndex: 0})}},
    }, {
      title: 'Linkedin',
      callback: () => {{this.setState({activeIndex: 1})}},
    }];

    return (
      <ThemeProvider theme={this.props.theme}>
        <KeywordProvider keyword={this.props.keyword}>
        <SocialNetworksView>
          <AppViewHeaderToolbar
            icon={'icon_social'}
            title={'Social Networks'}
            titleStyle={{marginLeft: '25px'}}
            lastExtractionTime={this.props.isFetching ? 0 : this.props.lastExtraction}
            updateTimeIndicator={this.props.isFetching ? 0 : this.props.updateTimeIndicator}
            requestUpdate={this.props.requestUpdate}
            extractNow={this.props.extractNow}
          />
          <AppViewFiltersTool
            component={(
              <Tabs>
                <TabGeneric
                  tabs={socialNetworksTabs}
                  initialSelectedIndex={this.state.activeIndex}
                  theme={this.props.theme.tabs}
                />
              </Tabs>)}
            show={this.props.showFilter}
            tags={this.props.tagsFilter}
            actions={{
              addTagCallback: () => {/*TODO: implement for multi selected items*/},
              addToNotebookCallback: () => {/*TODO: implement for multi selected items*/},
              markAsReadCallback: () => {/*TODO: implement for multi selected items*/},
              markAsUnreadCallback: () => {/*TODO: implement for multi selected items*/},
              translateCallback: () => {/*TODO: implement for multi selected items*/},
              transcriptCallback: () => {/*TODO: implement for multi selected items*/},
              exportCallback: () => {/*TODO: implement for multi selected items*/},
            }}
          />
          {this.renderSocial()}
        </SocialNetworksView>
        </KeywordProvider>
      </ThemeProvider>
    )
  }
}

export default SocialNetworksAppViewer
