import * as React from 'react'
import { KeylogData, KeylogId, Context } from '../../types/Keylog'
import { TagData, TagId } from '../../types/Tag'
import * as moment from 'moment'
import styled, { withTheme } from 'styled-components'
import ActionToolbar from '../Common/ActionToolbar/'
import * as Helpers from './helpers'
import TabGeneric from '../Common/TabGeneric/'
import * as Theme from './Theme'

const Container = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  height: 100%;
  background: ${props => props.theme.detailsPaneBg};
`
const TopBar = styled.div`
  height: 4.6rem;
  background: ${props => props.theme.detailsPaneHeaderBg};
  flex: 0 1 auto;
  padding: 0 1.2rem 0 3rem;
`
const Body = styled.div`
  flex: 1;
  padding: 3rem;
  display: flex;
  flex-direction: column;
`
const ItemWrapper = styled.div`
`
const ItemLabel = styled.div`
  color: ${props => props.theme.lightTextColor};
  display: inline-block;
  padding-right: 2.4rem;
`
const ItemText = styled.div`
  color: ${props => props.theme.darkTextColor};
  display: inline-block;
`
const TopArea = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  grid-template-rows: auto auto;
  grid-gap: 1em;
  padding-bottom: 30px;
  border-bottom: 1px solid ${props => props.theme.bordersColor};
`
const TabsArea = styled.div`
  padding: 30px 0;
`
const MainArea = styled.div`
  overflow: auto;
  border: 1px solid ${props => props.theme.bordersColor};
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.2);
  background: ${props => props.theme.detailsPaneContentBg};
  flex: 1;
`
const ContentContainer = styled.div`
  padding: 30px;
`
const ContextContainer = styled.section`
  margin-bottom: 30px;

  &:last-child {
    margin-bottom: 0;
  }
`
const ContextTitle = styled.h3`
  margin-top: 0;
`
const ContextContent = styled.p`
`

const MODE_FULL = 0, MODE_FINAL = 1

export interface DetailsPanelProps extends React.Props<DetailsPanel> {
  item: KeylogData,
  removeTag: (id: KeylogId, tagId: TagId) => void,
  setFavorite: (id: KeylogId, isFavorite: boolean) => void,
  addTag: (ids: KeylogId[], tags: TagData[]) => void,
  addToNotebook: (ids: KeylogId[]) => void,
  markAsRead: (ids: KeylogId[]) => void,
  markAsUnread: (ids: KeylogId[]) => void,
  askForTranslate: (ids: KeylogId[]) => void,
  askForTranscript: (ids: KeylogId[]) => void,
  exportItem: (ids: KeylogId[]) => void,
  theme?: Theme.ThemeProps,
}
export interface DetailsPanelState {
  menuIsHidden: boolean,
  displayMode: number,
}

class DetailsPanel extends React.Component<DetailsPanelProps, DetailsPanelState> {
  tabsDetails = [{
      title: 'Full',
      callback: () => this.onTabSelected(MODE_FULL),
    }, {
      title: 'Final',
      callback: () => this.onTabSelected(MODE_FINAL),
    },
  ]

  constructor (props: DetailsPanelProps) {
    super(props)

    this.state = {
      menuIsHidden: true,
      displayMode: MODE_FINAL,
    }
  }

  renderActionToolbar = () => {
    const { item } = this.props
    return (
      <ActionToolbar
        lineHeight={'45px'}
        fontSize={16}
        withMenu={true}
        menuIsHidden={false}
        menuOnItemSelect={{
          addTagCallback: (tags) => {this.props.addTag([item.id], tags)},
          addToNotebookCallback: () => {this.props.addToNotebook([item.id])},
          markAsReadCallback: () => {this.props.markAsRead([item.id])},
          markAsUnreadCallback: () => {this.props.markAsUnread([item.id])},
          translateCallback: () => {this.props.askForTranslate([item.id])},
          transcriptCallback: () => {this.props.askForTranscript([item.id])},
          exportCallback: () => {this.props.exportItem([item.id])},
        }}
        withFavorite={true}
        isFavorite={item.isFavorite}
        favoriteOnClick={() => {this.props.setFavorite(item.id, !item.isFavorite)}}
        withNotebook={false}
        notebookHasNotes={item.hasNotes}
        withTranslate={false}
        hasTranslate={item.hasTranslation}
        withTags={false}
        tags={item.tags}
        tagOnRemove={(tagId: TagId) => {this.props.removeTag(item.id, tagId)}}
      />
    )
  }

  renderContext = (context: Context) => (
    <ContextContainer key={context.startOffset}>
      <ContextTitle>
        {context.process}
      </ContextTitle>
      <ContextContent>
        {context.content}
      </ContextContent>
    </ContextContainer>
  )

  onTabSelected = (idx) => {
    this.setState({
      displayMode: idx,
    })
  }

  render() {
    const { item } = this.props
    if (item === null || item === undefined) {
      return null
    }
    return (
      <Container>
        <TopBar>
          {
            this.renderActionToolbar()
          }
        </TopBar>
        <Body>
          <TopArea>
            <ItemWrapper>
              <ItemLabel>Date:</ItemLabel>
              <ItemText>
                {moment(item.timeStart).format('DD/MM/YYYY HH:mm')}
              </ItemText>
            </ItemWrapper>
            <ItemWrapper>
              <ItemLabel>Regex:</ItemLabel>
              <ItemText>-</ItemText>
            </ItemWrapper>
            <ItemWrapper>
              <ItemLabel>Duration:</ItemLabel>
              <ItemText>{Helpers.getDurationStr(item.durationMs)}</ItemText>
            </ItemWrapper>
            <ItemWrapper>
              <ItemLabel>Processes:</ItemLabel>
              <ItemText>{item.contexts.length}</ItemText>
            </ItemWrapper>
          </TopArea>
          <TabsArea>
            <ItemLabel>Mode:</ItemLabel>&nbsp;
            <TabGeneric
              tabs={this.tabsDetails}
              initialSelectedIndex={0}
              theme={this.props.theme.tabs}
            />
          </TabsArea>
          <MainArea>
            <ContentContainer>
              {item.contexts.map(context => this.renderContext(context))}
            </ContentContainer>
          </MainArea>
        </Body>
      </Container>
    )
  }
}

export default withTheme(DetailsPanel)
