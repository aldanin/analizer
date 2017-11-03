import * as React from 'react'
import * as ReactDom from 'react-dom'
import ChatBubble from '../../Common/ChatBubble'
import { PointDirection } from '../../Common/ChatBubble'
import styled, { ThemeProvider } from 'styled-components';
import { withTheme } from 'styled-components';
import * as Prod from '../../../types/Product'
import * as Tags from '../../../types/Tag'
import * as Theme from '../Theme'
import * as IMCommon from 'common-interfaces/types/InstantMessaging'
import * as IM from '../../../types/InstantMessaging'
import SimpleMessageRenderer from './renderers/SimpleMessageRenderer'
import MediaMessageRenderer from './renderers/MediaMessageRenderer'
import PersonDetailsBar from './PersonDetailsBar'
import { DateFormats } from '../../../helpers/enums'
import * as Helpers from '../../../helpers/Formatters'
import ReactResizeDetector from 'react-resize-detector'

export interface ChatAreaProps extends React.Props<ChatArea> {
  topic: IM.Topic,
  chatMessagesData: {
    messages: IMCommon.ChatMessage[],
    totalCount: number
  },

  //
  // A way to inform this component it should not render, usually when new topics were loaded into the grid,
  // so the Content component state changed, but this should not affect this component
  //
  suppressRendering: boolean,
  setFavorite: (id: Prod.ProductID, isFavorite: boolean) => void,
  addTags: (itemIds: Prod.ProductID, tags: Tags.TagData[]) => void,
  removeTag: (id: Prod.ProductID, tagId: Tags.TagId) => void,
  markAsRead: (itemIds: Prod.ProductID[], isRead: boolean) => void,
  addToNotebook: (itemId: Prod.ProductID) => void,
  askForTranslate: (itemId: Prod.ProductID) => void,
  askForTranscript: (itemId: Prod.ProductID) => void,
  getTranslate: (itemId: Prod.ProductID) => void,
  getTranscript: (itemId: Prod.ProductID) => void,
  openNotebook: () => void,
  exportItem: (itemId: Prod.ProductID) => void,
  markNotificationsViewed?: (ids: IM.ChatMessageId[]) => void,
  loadChatMessagesPage: (isPreviousPage: boolean) => void,
  onSenderClick: (id: Prod.ProductID) => void,
  onCommonGroupSelected: (id: IM.TopicId) => void,
  fetchedChatMessagesFirstPage: boolean,
  isRefreshing: boolean,
  theme: Theme.ThemeProps
}

export interface ChatPaneState {
  messages: IMCommon.ChatMessage[],
  personBarShown: boolean,
  loadedRowCount: number,
  loadingRowCount: number,
  scrollToIndex: number,
  firstChild: HTMLElement
  contentAreaSize: {
    width: number,
    height: number
  },
  selectedItems: IM.ChatMessageId[];
}

interface BubbleContainetProps {
  width: string,
}

const ChatAreaOuterDiv = styled.div`
  width: calc(100% - 20px);
  height: calc(100% - 20px);
  margin: auto;
  position: relative;
;`

const InnerDiv = styled.div`
  height: 100%;      
;`

const ChatBubblesContainer = styled.div`
  height: 100%;
  overflow: auto; 

  &::-webkit-scrollbar {
    width: 32px;
`;

const BubbleContainer = styled.div`
  width: ${(props: BubbleContainetProps) => props.width};
  height: auto;
  overflow: hidden;
  margin: auto;
`;

const DateWrap = styled.div`
  text-align: center;
`;

const DateOuter = styled.div`
  display: inline-block;
  background-color: #d9f0f9; //${(props) => props.theme.bubbles.dateBGColor};
  color: ${(props) => props.theme.textColor}
  display: inline-block;
  border-radius: 4px;
  border: solid 2px ${(props) => props.theme.bubbles.dateBorderColor};
  margin: 10px;
  
  display: inline-block;
  background-color: ${(props) => props.theme.bubbles.dateBGColor};
  border: solid 1px ${(props) => props.theme.bubbles.dateBorderColor};
  border-bottom-color: ${(props) => props.theme.bubbles.borderBottomColor};
  border-radius: 8px;
`;

const DateElement = styled.div`
  padding: 5px 20px;
`;

class ChatArea extends React.Component<ChatAreaProps, ChatPaneState> {
  private chatAreaDiv;
  private firstChild: HTMLElement;
  private scrollingIntoViewTop: boolean = false;

  constructor(props: ChatAreaProps) {
    super(props)

    this.state = {
      messages: [],
      personBarShown: true,
      loadedRowCount: 0,
      loadingRowCount: 0,
      scrollToIndex: 500,
      firstChild: null,
      contentAreaSize: {
        width: 1551,
        height: null
      },
      selectedItems: [],
    }
  }

  onGroupInCommonSelected = (group: IM.GroupInCommon) => {
    this.props.onCommonGroupSelected(group.topicId)
  }

  createBubbleProps = (message: IMCommon.ChatMessage,
                       currentSenderId: Prod.ProductID) => {
    const float = message.direction === 'outgoing'
      ? 'left'
      : 'right';
    let bubbleType;

    if (!currentSenderId || message.isFirstOnDate || message.from.id !== currentSenderId) {
      bubbleType = message.direction === 'outgoing'
        ? PointDirection.left
        : PointDirection.right;
    } else {
      bubbleType = PointDirection.center
    }

    const bgColor = message.direction === 'outgoing'
      ? this.props.theme.bubbles.targetMessageBGColor
      : this.props.theme.bubbles.contactMessageBGColor;
    const borderColor = message.direction === 'outgoing'
      ? this.props.theme.bubbles.targetMessageBorderColor
      : this.props.theme.bubbles.contactMessageBorderColor;

    return {
      bubbleType: bubbleType,
      float: float,
      bgColor: bgColor,
      borderColor: borderColor
    }
  }

  renderChatMessage = (message: IMCommon.ChatMessage,
                       currentSenderId: Prod.ProductID,
                       theme: Theme.ThemeProps,
                       key: any,
                       isLast: boolean) => {
    const bubbleProps = this.createBubbleProps(message, currentSenderId);

    const mediaWindow = message.attachments
      ? (
        <MediaMessageRenderer
          chatMessage={message}
          setFavorite={this.props.setFavorite}
          removeTag={this.props.removeTag}
          addTags={this.props.addTags}
          addToNotebook={this.props.addToNotebook}
          markAsRead={(id: Prod.ProductID, isRead: boolean) => this.props.markAsRead([id], isRead)}
          askForTranslate={this.props.askForTranslate}
          askForTranscript={this.props.askForTranscript}
          openNotebook={this.props.openNotebook}
          getTranslate={this.props.getTranslate}
          getTranscript={this.props.getTranscript}
          exportItem={this.props.exportItem}
          onSenderClick={this.props.onSenderClick}
          theme={theme}
        />
      )
      : (
        <SimpleMessageRenderer
          chatMessage={message}
          setFavorite={this.props.setFavorite}
          removeTag={this.props.removeTag}
          addTags={this.props.addTags}
          addToNotebook={this.props.addToNotebook}
          markAsRead={(id: Prod.ProductID, isRead: boolean) => this.props.markAsRead([id], isRead)}
          askForTranslate={this.props.askForTranslate}
          askForTranscript={this.props.askForTranscript}
          openNotebook={this.props.openNotebook}
          getTranslate={this.props.getTranslate}
          getTranscript={this.props.getTranscript}
          exportItem={this.props.exportItem}
          onSenderClick={this.props.onSenderClick}
          theme={theme}
        />
      );

    const datePart = message.isFirstOnDate
      ? (
        <DateWrap>
          <DateOuter>
            <DateElement>
              {Helpers.msToDateString(message.timestamp, DateFormats.dateOnlyWithShortNames)}
            </DateElement>
          </DateOuter>

        </DateWrap>
      )
      : <div/>

    return (
      <BubbleContainer
        ref={isLast ? 'isLast' : ''}
        key={key}
        width={this.state.contentAreaSize.width > 520 ? 'calc(100% - 200px)' : '100%'}
      >
        {datePart}
        <ChatBubble
          pointDirection={bubbleProps.bubbleType}
          style={{float: bubbleProps.float}}
          backgroundColor={bubbleProps.bgColor}
          borderColor={bubbleProps.borderColor}
        >
          {mediaWindow}
        </ChatBubble>
      </BubbleContainer>
    )
  }

  ensureActiveItemVisible = () => {
    var itemComponent = this.refs.isLast;

    if (itemComponent) {
      var domNode = ReactDom.findDOMNode(itemComponent);
      this.scrollElementIntoViewIfNeeded(domNode);
    }
  }

  scrollElementIntoViewIfNeeded = domNode => {
    if (domNode && domNode.scrollIntoView) {
      this.scrollingIntoViewTop = true;
      domNode.scrollIntoView(false);
    }
  }

  onScroll = (ev) => {
    const scrollTop = this.chatAreaDiv.scrollTop;
    if (scrollTop === 0) {
      if (this.scrollingIntoViewTop) {
        this.scrollingIntoViewTop = false;
        this.chatAreaDiv.scrollTop = 50;
      } else {
        this.firstChild = this.chatAreaDiv.firstChild;
        this.props.loadChatMessagesPage(true);
        if (!this.props.fetchedChatMessagesFirstPage) {
          //
          // At this point, eaching the top scroller position means fetching a descending (previous) page.
          // We want to accommodate this behaviour by lowering the scroller position to an up-scrollable position,
          // for smooth action:
          //
          this.chatAreaDiv.scrollTop = 50;
        }
      }
    }

    if (this.chatAreaDiv.scrollHeight === scrollTop + this.chatAreaDiv.clientHeight) {
      this.firstChild = null;
      this.props.loadChatMessagesPage(false);
    }
  }

  componentWillReceiveProps(nextProps: ChatAreaProps) {
    if (JSON.stringify(
        nextProps.chatMessagesData.messages) !== JSON.stringify(this.props.chatMessagesData.messages)) {
      //
      // Message Data has changed
      // Extract the new messages and mark them as read:
      //
      const newMessages = nextProps.chatMessagesData.messages
        .filter(newMessage => !this.props.chatMessagesData.messages
          .find(oldMessage => oldMessage.id === newMessage.id))

      this.props.markAsRead(newMessages
        .filter(message => !message.isRead)
        .map(message => message.id), true)
    }
  }

  shouldComponentUpdate(nextProps: ChatAreaProps) {
    return !(!!nextProps.suppressRendering);
  }

  componentDidUpdate(prevProps: ChatAreaProps) {
    //
    // When a topic was selected, we then fetch its first chat messages page ( NOT necessarilly page 1 ).
    // After fetching , if we already detched more pages of the previous topic, the scroller may be
    // at the bottom of the view, thus the onScroll 2nd term is sutisfied, thus fetching another page.
    // We want to prevent this behavior, and need the scroller at the almost-top position anyway:
    // NOTE: The scrolltio position (50) is subject to change according to an outside rerquest (e.g. a certain date):
    //
    if (this.props.isRefreshing) {
      if (this.chatAreaDiv) {
        this.chatAreaDiv.scrollTop = 50
      }
    }

    if (
      this.props.chatMessagesData.messages.length &&
      ( prevProps.chatMessagesData.messages.length === 0 ||
        this.props.chatMessagesData.messages[0].id !== prevProps.chatMessagesData.messages[0].id )) {
      this.ensureActiveItemVisible();
    }
  }

  renderMessages = (props: ChatAreaProps) => {
    const {chatMessagesData} = props;
    //
    // Confirming to Whatsapp's ui, a message sequence from thge same source only shows an arrow
    // on the first in that sequence. Here we hold a new sender's id to be passed in for this purpose:
    //
    let currentSenderId = null;
    const components = chatMessagesData.messages.map((message, index, messages) => {
      const isLast = this.props.isRefreshing && index === messages.length - 1;

      const chatBubble = this.renderChatMessage(
        message as IMCommon.ChatMessage,
        currentSenderId,
        this.props.theme,
        message.id,
        isLast);
      currentSenderId = message.from.id;

      return chatBubble;
    })

    return components;
  }

  onContentResize = (width: number, height: number) => {
    this.setState({
      contentAreaSize: {
        width: width,
        height: height
      }
    })
  }

  render() {
    return (
      <ThemeProvider theme={this.props.theme}>
        <ChatAreaOuterDiv>
          <ReactResizeDetector handleWidth={true} handleHeight={true} onResize={this.onContentResize}/>
          <InnerDiv>
            <PersonDetailsBar
              topic={this.props.topic}
              onGroupInCommonSelected={this.onGroupInCommonSelected}
              theme={this.props.theme}
            />
            <ChatBubblesContainer
              innerRef={(thisDiv) => {
                this.chatAreaDiv = thisDiv
              }}
              onScroll={this.onScroll}
            >
              {this.renderMessages(this.props)}
            </ChatBubblesContainer>
          </InnerDiv>
        </ChatAreaOuterDiv>
      </ThemeProvider>
    )
  }
}

export default withTheme(ChatArea)
