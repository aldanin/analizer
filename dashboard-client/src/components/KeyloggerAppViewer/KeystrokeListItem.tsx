import * as React from 'react'
import styled from 'styled-components'
import {
  KeylogData,
  KeylogId,
} from '../../types/Keylog'
import { withTheme } from 'styled-components'
import { ThemeProps } from './Theme'
import moment = require('moment')
import { TagData, TagId } from '../../types/Tag'
import ListItem from '../Common/ListItem/index'
import ActionToolbar from '../Common/ActionToolbar/index'
import * as Helpers from './helpers'

const CellTime = styled.span`
  width: 25%;
  font-size: 80%;
  color: ${(props) => props.theme.darkTextColor};
`
const CellDuration = styled.span`
  width: 15%;
  font-size: 80%;
  color: ${(props) => props.theme.lightTextColor};
`
const CellNumber = styled.span`
  width: 15%;
  font-size: 80%;
  color: ${(props) => props.theme.lightTextColor};
  text-align: center;
`
const Content = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`

export interface KeystrokeItemProps extends React.Props<KeystrokeItem> {
  item: KeylogData,
  onChecked: (id: KeylogId) => void,
  onUnchecked: (id: KeylogId) => void,
  onLineClicked: (id: KeylogId) => void,
  isSelected: boolean,

  openNotebook: () => void,
  getTranslate: () => void,

  setFavorite: (id: KeylogId, isFavorite: boolean) => void,
  removeTag: (id: KeylogId, tag: TagId) => void,

  addTag: (id: KeylogId[], tag: TagData[]) => void,
  addToNotebook: (id: KeylogId[]) => void,
  markAsRead: (id: KeylogId[]) => void,
  markAsUnread: (id: KeylogId[]) => void,
  askForTranslate: (ids: KeylogId[]) => void,
  askForTranscript: (ids: KeylogId[]) => void,
  exportItem: (id: KeylogId[]) => void,
  theme?: ThemeProps;
}

export interface KeystrokeItemState {
  isChecked: boolean;
  isMouseOn: boolean;
  menuIsHide: boolean;
  withFavorite: boolean;
  withNotebook: boolean;
  withTranslate: boolean;
}

class KeystrokeItem extends React.Component<KeystrokeItemProps, KeystrokeItemState> {

  constructor (props: KeystrokeItemProps) {
    super(props);

    this.state = {
      isChecked: false,
      isMouseOn: false,
      menuIsHide: true,
      withFavorite: false,
      withNotebook: false,
      withTranslate: false,
    }
  }

  onMouseEnter = () => {
    this.changeIsMouseOnState(true);
    this.setState({
      menuIsHide: false,
      withFavorite: true,
      withNotebook: true,
      withTranslate: true,
    })
  }

  onMouseLeave = () => {
    this.changeIsMouseOnState(false);
    if (this.state.isChecked) {return}
    this.setState({
      menuIsHide: true,
      withFavorite: false,
      withNotebook: false,
      withTranslate: false,
    })
  }

  changeIsMouseOnState(isOn: boolean) {
    this.setState({isMouseOn: isOn});
  }

  onCheck = () => {
    if (this.state.isChecked) {
      this.props.onUnchecked(this.props.item.id)
    } else {
      this.props.onChecked(this.props.item.id)
    }
    this.setState({
      isChecked: !this.state.isChecked
    })
  }

  onLineClicked = () => {
    this.props.onLineClicked(this.props.item.id)
  }

  getContent(item: KeylogData) {
    return(
      <Content>
        <CellTime onClick={this.onLineClicked}>
          {moment(item.timeStart).format('DD/MM/YYYY  HH:mm')}
        </CellTime>
        <CellDuration onClick={this.onLineClicked}>
          {Helpers.getDurationStr(item.durationMs)}
        </CellDuration>

        <CellNumber onClick={this.onLineClicked}>{item.contexts.length}</CellNumber>
        <CellNumber onClick={this.onLineClicked}>{0}</CellNumber>
      </Content>
    )
  }

  render() {
    const {item} = this.props
    return (
      <ListItem
        lineHeight={'4.6rem'}
        isNewItem={! item.isRead}
        onCheck={this.onCheck}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
        isChecked={this.state.isChecked}
        isSelected={this.props.isSelected}
        isMouseOn={this.state.isMouseOn}
        content={this.getContent(item)}
        actionToolbar={
          <ActionToolbar
            lineHeight={'4.6rem'}
            withMenu={true}
            menuIsHidden={this.state.menuIsHide}
            menuOnItemSelect={{
              addTagCallback: (tags: TagData[]) => {this.props.addTag([item.id], tags)},
              addToNotebookCallback: () => {this.props.addToNotebook([item.id])},
              markAsReadCallback: () => {this.props.markAsRead([item.id])},
              markAsUnreadCallback: () => {this.props.markAsUnread([item.id])},
              translateCallback: () => {this.props.askForTranslate([item.id])},
              transcriptCallback: () => {this.props.askForTranscript([item.id])},
              exportCallback: () => {this.props.exportItem([item.id])},
            }}
            withFavorite={item.isFavorite || this.state.withFavorite}
            isFavorite={item.isFavorite}
            favoriteOnClick={() => {this.props.setFavorite(item.id, !item.isFavorite)}}
            withNotebook={item.hasNotes || this.state.withNotebook}
            notebookHasNotes={item.hasNotes}
            withTranslate={item.hasTranslation || this.state.withTranslate}
            hasTranslate={item.hasTranslation}
            withTags={true}
            tags={item.tags}
            tagOnRemove={(tagId: TagId) => {this.props.removeTag(item.id, tagId)}}
          />
        }
      />
    )
  }
}

export default withTheme(KeystrokeItem)
