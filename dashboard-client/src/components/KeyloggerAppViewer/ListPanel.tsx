import * as React from 'react'
import {
  KeylogData,
  KeylogId,
} from '../../types/Keylog'
import { TagData, TagId } from '../../types/Tag'
import styled from 'styled-components'
import KeystrokeListItem from './KeystrokeListItem'

const Container = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  height: 100%;
  box-sizing: border-box;
`
const HeadersWrapper = styled.div`
  padding: 0 15px 0 10px;
`
const Headers = styled.div`
  height: 3rem;
  line-height: 3rem;
  flex: 0 1 auto;
  border-bottom: 1px solid ${props => props.theme.bordersColor};
  border-top: 1px solid ${props => props.theme.bordersColor};
  padding-left: 38px;
`
interface HeaderProps {
  width: string,
}
const Header = styled.span`
  display: inline-block;
  width: ${(props: HeaderProps) => props.width};
  color: ${props => props.theme.linkColor};
`
const HeaderCenter = styled(Header)`
  text-align: center;
`
const Body = styled.div`
  flex: 1;
  overflow: hidden;
  padding: 0 0 0 1rem;
`
const ListContainer = styled.div`
  height: 100%;
  overflow: auto;
`

export interface ListPanelProps extends React.Props<ListPanel> {
  items: KeylogData[],
  selectedItemId: KeylogId,
  onLineClicked: (id: KeylogId) => void,
  onChecked: (id: KeylogId) => void,
  onUnchecked: (id: KeylogId) => void,

  setFavorite: (id: KeylogId, isFavorite: boolean) => void,
  removeTag: (id: KeylogId, tag: TagId) => void,

  addTag: (ids: KeylogId[], tags: TagData[]) => void,
  addToNotebook: (ids: KeylogId[]) => void,
  openNotebook: () => void,
  getTranslate: () => void,
  markAsRead: (ids: KeylogId[]) => void,
  markAsUnread: (ids: KeylogId[]) => void,
  askForTranslate: (ids: KeylogId[]) => void,
  askForTranscript: (ids: KeylogId[]) => void,
  exportItem: (ids: KeylogId[]) => void,
}
export interface ListPanelState {
}

class ListPanel extends React.Component<ListPanelProps, ListPanelState> {
  constructor (props: ListPanelProps) {
    super(props)

    this.state = {
    }
  }

  render() {
    return (
      <Container>
        <HeadersWrapper>
          <Headers>
            <Header width="25%">
              Date
            </Header>
            <Header width="15%">
              Duration
            </Header>
            <HeaderCenter width="15%">
              Processes
            </HeaderCenter>
            <HeaderCenter width="15%">
              Regex
            </HeaderCenter>
          </Headers>
        </HeadersWrapper>
        <Body>
          <ListContainer>
            {this.props.items.map((item, idx) => (
              <KeystrokeListItem
                key={item.id}
                item={item}

                onChecked={this.props.onChecked}
                onUnchecked={this.props.onUnchecked}
                onLineClicked={this.props.onLineClicked}
                isSelected={this.props.selectedItemId === item.id}

                openNotebook={this.props.openNotebook}
                getTranslate={this.props.getTranslate}

                setFavorite={this.props.setFavorite}
                removeTag={this.props.removeTag}

                addTag={this.props.addTag}
                addToNotebook={this.props.addToNotebook}
                markAsRead={this.props.markAsRead}
                markAsUnread={this.props.markAsUnread}
                askForTranslate={this.props.askForTranslate}
                askForTranscript={this.props.askForTranscript}
                exportItem={this.props.exportItem}
              />
            ))}
          </ListContainer>
        </Body>
      </Container>
    )
  }
}

export default ListPanel
