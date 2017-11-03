import * as React from 'react'
import styled, { withTheme } from 'styled-components'
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar'
import ActionToolbar from '../Common/ActionToolbar'
import { StdProductActions } from '../../helpers/StdProductActionsFunctory'
import * as moment from 'moment'
import * as Theme from './Theme'
import { ScreenshotData, ScreenshotId } from '../../types/Screenshot'
import { TagId } from '../../types/Tag'

const Wrapper = styled.span`
  color: ${props => props.theme.infoTextColor};
  background: ${props => props.theme.infobackground};
  z-index: 11;
`
const SubGroupContainer = styled.span`
  padding-left: 2rem;
`
const HighlightText = styled.span`
  color: ${props => props.theme.infoTextHighlight};
`

export interface InfoBarProps extends React.Props<InfoBar> {
  item: ScreenshotData,
  setFavorite: (id: ScreenshotId, isFavorite: boolean) => void,
  removeTag: (id: ScreenshotId, tagId: TagId) => void,
  stdActions: StdProductActions,
  theme?: Theme.ThemeProps,
}
export interface InfoBarState {
}

class InfoBar extends React.Component<InfoBarProps, InfoBarState> {
  static defaultProps: Partial<InfoBarProps> = {
    theme: Theme.defaultTheme
  }

  constructor (props: InfoBarProps) {
    super(props)

    this.state = {
    }
  }

  render() {
    const {item, stdActions} = this.props
    if (! item) {
      return (
        <Wrapper>
          <Toolbar style={{height: '4.6rem'}}/>
        </Wrapper>
      )
    }
    return (
      <Wrapper>
        <Toolbar style={{height: '4.6rem'}}>
          <ToolbarGroup firstChild={true} style={{}}>
            <SubGroupContainer>
              Time: <HighlightText>{moment(item.timeTaken ).format('DD/MM/YYYY HH:mm')}</HighlightText>
            </SubGroupContainer>
            <SubGroupContainer>
              Extracted: {moment(item.timeExtracted).format('DD/MM/YYYY HH:mm')}
            </SubGroupContainer>
          </ToolbarGroup>
          <ToolbarGroup lastChild={true} style={{paddingRight: '1rem'}}>
            <ActionToolbar
              lineHeight={'45px'}
              fontSize={16}
              withMenu={true}
              menuIsHidden={false}
              menuOnItemSelect={{
                addTagCallback: (tags) => {stdActions.addTag([item.id], tags)},
                addToNotebookCallback: () => {stdActions.addToNotebook([item.id])},
                markAsReadCallback: () => {stdActions.markAsRead([item.id])},
                markAsUnreadCallback: () => {stdActions.markAsUnread([item.id])},
                translateCallback: () => {stdActions.askForTranslate([item.id])},
                transcriptCallback: () => {stdActions.askForTranscript([item.id])},
                exportCallback: () => {stdActions.exportItem([item.id])},
              }}
              withFavorite={true}
              isFavorite={item.isFavorite}
              favoriteOnClick={() => {this.props.setFavorite(item.id, !item.isFavorite)}}
              withTags={true}
              tags={item.tags}
              tagOnRemove={(tagId: TagId) => {this.props.removeTag(item.id, tagId)}}
            />
          </ToolbarGroup>
        </Toolbar>
      </Wrapper>
    )
  }
}

export default withTheme(InfoBar)
