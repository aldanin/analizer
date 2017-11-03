import * as React from 'react'
import * as Theme from './Theme'
import styled from 'styled-components'
import { ThemeProvider } from 'styled-components'

import DetailsPanel from './DetailsPanel'
import ListPanel from './ListPanel'

import { KeylogData, KeylogId } from '../../types/Keylog'
import { TagId } from '../../types/Tag'

import { StdProductActions } from '../../helpers/StdProductActionsFunctory'

const Container = styled.div`
  box-sizing: border-box;
  display: grid;
  grid-template-areas: "list details";
  grid-gap: 5px;
  grid-template-columns: 3fr 2fr;
  height: 100%;
  overflow: hidden;
`
const ListContainer = styled.div`
  grid-area: list;
  overflow: hidden;
`
const DetailsContainer = styled.div`
  grid-area: details;
  overflow: hidden;
`

export interface KeyloggerAppViewerProps extends React.Props<KeyloggerAppViewer> {
  items: KeylogData[],
  theme?: Theme.ThemeProps,

  setFavorite: (id: KeylogId, isFavorite: boolean) => void,
  removeTag: (itemID: KeylogId, tagId: TagId) => void,
  stdActions: StdProductActions,
}
export interface KeyloggerAppViewerState {
  curIdx: number,
  curId: KeylogId,
}

class KeyloggerAppViewer extends React.Component<KeyloggerAppViewerProps, KeyloggerAppViewerState> {

  static defaultProps: Partial<KeyloggerAppViewerProps> = {
    theme: Theme.defaultTheme
  }

  constructor (props: KeyloggerAppViewerProps) {
    super(props)

    this.state = {
      curId: 0,
      curIdx: 1,
    }
  }

  onLineClick = (id) => {
    const newIdx = this.props.items.findIndex(item => item.id === id)
    this.setState({
      curId: id,
      curIdx: newIdx,
    })
  }

  render() {
    return (
      <ThemeProvider theme={this.props.theme}>
        <Container>
          <ListContainer>
            <ListPanel
              items={this.props.items}
              selectedItemId={this.state.curId}
              onLineClicked={this.onLineClick}
              onChecked={(id) => null}
              onUnchecked={(id) => null}

              openNotebook={() => null}
              getTranslate={() => null}

              setFavorite={this.props.setFavorite}
              removeTag={this.props.removeTag}

              {...this.props.stdActions}

              // addTag={(ids, tags) => null}
              // addToNotebook={(ids) => null}
              // markAsRead={(ids) => null}
              // markAsUnread={(ids) => null}
              // requestTranslation={(ids) => null}
              // requestTranscript={(ids) => null}
              // exportItem={(ids) => null}
            />
          </ListContainer>
          <DetailsContainer>
            <DetailsPanel
              item={this.props.items[this.state.curIdx]}
              setFavorite={this.props.setFavorite}
              removeTag={this.props.removeTag}

              {...this.props.stdActions}

              // addTag={(itemIds, tagIds) => null}
              // addToNotebook={(itemIds) => null}
              // markAsRead={(itemIds) => null}
              // markAsUnread={(itemIds) => null}
              // requestTranslation={(itemIds) => null}
              // requestTranscript={(itemIds) => null}
              // export={(itemIds) => null}
            />
          </DetailsContainer>
        </Container>
      </ThemeProvider>
    )
  }
}

export default KeyloggerAppViewer
