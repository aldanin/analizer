import * as React from 'react'
import * as Theme from './Theme'
import styled, { ThemeProvider } from 'styled-components'

import AppViewHeaderToolbar from '../Common/AppViewHeaderTool/index'
import ViewerToolBar from './components/ViewerToolbar/'
import Screenshots from '../../containers/ScreenshotsAppViewer'
import Keylogger from '../../containers/KeyloggerAppViewer'
import Story from '../../containers/StoryAppViewer'
import { Filters } from '../../types/GenericFilters'

const TOOLBAR_HEIGHT = '9.5rem';

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  padding-top: ${TOOLBAR_HEIGHT};
  box-sizing: border-box;
  position: relative;
`
const ToolbarArea = styled.div`
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
  height: ${TOOLBAR_HEIGHT};
  overflow: hidden;
`
const MainArea = styled.div`
  height: 100%;
`

const TAB_IDX_STORY = 0,
      TAB_IDX_KEYS = 1,
      TAB_IDX_SCREENSHOTS = 2

export interface ActivityAppViewerProps extends React.Props<ActivityAppViewer> {
  // for view
  lastExtractTs: number,
  extractInterval: number,
  requestUpdate: () => void,
  requestExtract: () => void,

  // stories
  storiesLoadInitialData: () => void,

  // keylogger
  keyloggerOnFiltersChanged: (filters: Filters) => void,
  keyloggerLoadInitialData: () => void,

  // for screenshots
  screenshotsOnFiltersChanged: (filters: Filters) => void,
  screenshotLoadInitialData: () => void,

  theme?: Theme.ThemeProps
}
export interface ActivityAppViewerState {
  tabIdx: number,
}

class ActivityAppViewer extends React.Component<ActivityAppViewerProps, ActivityAppViewerState> {

  static defaultProps: Partial<ActivityAppViewerProps> = {
    theme: Theme.defaultTheme
  }

  private toolbarProps

  constructor (props: ActivityAppViewerProps) {
    super(props)

    this.state = {
      tabIdx: 1,
    }

    this.calcExtraProps()
  }

  componentDidMount() {
    this.props.screenshotLoadInitialData()
    this.props.storiesLoadInitialData()
    this.props.keyloggerLoadInitialData()
  }

  componentWillUpdate() {
    this.calcExtraProps()
  }

  calcExtraProps = () => {
    this.toolbarProps = {
      icon: 'icon_pointer',
      title: 'Activity',
      titleStyle: {
        color: 'blue',
        marginLeft: '10px',
      },
      timerIndicator: this.props.lastExtractTs,
      requestUpdate: this.props.requestUpdate,
      extractNow: this.props.requestExtract,
      updateTimeIndicator: this.props.extractInterval,
      theme: this.props.theme.appViewHeaderTool
    }
  }

  onFiltersChanged = (filters) => {
    // assume filters apply to all sub-views at once
    this.props.keyloggerOnFiltersChanged(filters)
    this.props.screenshotsOnFiltersChanged(filters)

    // if each subview has its own filters, we'll need something like this,
    // plus need to restore the filter values from store on tab change

    // switch (this.state.tabIdx) {
    //   case TAB_IDX_STORY:
    //     break
    //   case TAB_IDX_KEYS:
    //     this.props.keyloggerOnFiltersChanged(filters)
    //     break
    //   case TAB_IDX_SCREENSHOTS:
    //     this.props.screenshotsOnFiltersChanged(filters)
    //     break
    //   default:
    //     break
    // }
  }

  renderView = () => {
    switch (this.state.tabIdx) {
      case TAB_IDX_STORY:
        return <Story/>
      case TAB_IDX_KEYS:
        return <Keylogger/>
      case TAB_IDX_SCREENSHOTS:
        return (
          <Screenshots />
        )
      default:
        return null;
    }
  }

  changeTab = (idx) => {
    this.setState({
      tabIdx: idx,
    })
  }

  render() {
    return (
      <ThemeProvider theme={this.props.theme}>
        <Wrapper>
          <ToolbarArea>
            <AppViewHeaderToolbar {...this.toolbarProps}/>
            <ViewerToolBar
              onTabSelected={this.changeTab}
              onFiltersChanged={this.onFiltersChanged}
            />
          </ToolbarArea>
          <MainArea>
            {this.renderView()}
          </MainArea>

        </Wrapper>
      </ThemeProvider>
    )
  }
}

export default ActivityAppViewer
