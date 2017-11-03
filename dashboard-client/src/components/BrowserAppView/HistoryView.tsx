import * as React from 'react'
import { BrowserHistoryItem, browserTreeObjectId } from '../../types/Browser';
import styled from 'styled-components';
import HistoryItem from './HistoryItem';
import { TagData, TagId } from '../../types/Tag';
import SmartScroller from '../Common/SmartScroller'
import { ProductID } from '../../common/types/Product';

const Header = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 100%;
  position: relative;
  height: 22px;
  font-size: 80%;
  border-bottom: 1px solid ${(props) => props.theme.history.borderColor};
  margin: 0;
  padding: 0;
`;

const ArrowPlusTimeContainer = styled.span`
  width: 8%;
  height: 100%;
  margin-left: 5%;
  margin-right: 3%;
  cursor: pointer;
`

const ListContent = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 100%;
  height: calc(100% - 22px);
  flex-direction: column;
  overflow-y: auto;
`;

const Time = styled.span`
  color: ${(props) => props.theme.history.titleColor};
  margin-right: 5px;
`;

const Title = styled.span`
  position: relative;
  margin-left: 1%;
  margin-right: 25%;
  color: ${(props) => props.theme.history.titleColor};
`;

const URL = styled.span`
  margin-right: 28%;
  color: ${(props) => props.theme.history.titleColor};
`;

const Browser = styled.span`
  color: ${(props) => props.theme.history.titleColor};
`;

const Arrow = styled.span`
  font-size: 70%;
  color:  ${(props) => props.theme.history.arrowColor};
  cursor: pointer;
`;

const HistoryViewContainer = styled.div`
  height: 100%;
  width: 100%;
  padding: 1em 0 0 0;
  box-sizing: border-box;
`;

export interface HistoryViewProps extends React.Props<HistoryView> {
  historyData: BrowserHistoryItem[];
  setStar: (id: browserTreeObjectId, isFavorite: boolean) => void;
  historyRemoveTag: (id: browserTreeObjectId, tag: TagId) => void;
  historyOpenNotebook: () => void
  historyGetTranslate: () => void
  historyAddTag: (ids: browserTreeObjectId[], tags: TagData[]) => void;
  historyAddToNotebook: (ids: browserTreeObjectId[]) => void;
  historyMarkAsRead: (ids: browserTreeObjectId[]) => void;
  historyMarkAsUnRead: (ids: browserTreeObjectId[]) => void;
  historyAskForTranslate: (ids: browserTreeObjectId[]) => void;
  historyAskForTranscript: (ids: browserTreeObjectId[]) => void;
  historyExportItem: (ids: browserTreeObjectId[]) => void;
  historyItemSelected: (id: browserTreeObjectId) => void;
  historyItemUnSelected: (id: browserTreeObjectId) => void;
  isItemSelected: (id: browserTreeObjectId) => boolean;
  loadMoreData?: (isPrevious: boolean) => void;
  HistorySelectedItems?: ProductID[];
}

export interface HistoryViewState {
}

class HistoryView extends React.Component<HistoryViewProps, HistoryViewState> {
  static defaultProps: Partial<HistoryViewProps> = {
    loadMoreData: () => null,
    HistorySelectedItems: [],
  }

  constructor(props: HistoryViewProps) {
    super(props);

    this.state = {}
  }

  render() {
    return (
      <HistoryViewContainer>
        <Header>
          <ArrowPlusTimeContainer>
            <Time>Time</Time>
            <Arrow className="base_icons icon_tri_down"/>
          </ArrowPlusTimeContainer>
          <Title>Title</Title>
          <URL>URL</URL>
          <Browser>Browser</Browser>
        </Header>
        <ListContent>
          <SmartScroller
            onBottomReach={() => this.props.loadMoreData(false)}
          >
            {this.props.historyData.map((item, idx) => (
              <HistoryItem
                key={idx}
                id={item.id}
                isRead={item.isRead}
                timestamp={item.time}
                title={item.title}
                cleanUrl={item.url}
                extraUrl={item.extraUrl}
                browser={item.browser}
                tags={item.tags}
                isFavorite={item.isFavorite}
                isNoteBook={item.hasNotes}
                isTranslate={item.hasTranslation}
                setStar={this.props.setStar}
                removeTag={this.props.historyRemoveTag}
                addTag={this.props.historyAddTag}
                addToNotebook={this.props.historyAddToNotebook}
                markAsRead={this.props.historyMarkAsRead}
                markAsUnRead={this.props.historyMarkAsUnRead}
                askForTranslate={this.props.historyAskForTranslate}
                askForTranscript={this.props.historyAskForTranscript}
                exportItem={this.props.historyExportItem}
                openNotebook={this.props.historyOpenNotebook}
                getTranslate={this.props.historyGetTranslate}
                historyItemSelected={this.props.historyItemSelected}
                historyItemUnSelected={this.props.historyItemUnSelected}
                isItemSelected={this.props.isItemSelected}
              />
            ))}
          </SmartScroller>
        </ListContent>
      </HistoryViewContainer>
    )
  }
}

export default HistoryView
