import * as React from 'react'
import * as Calls from '../../types/Calls'
import * as Theme from './Theme'
import styled from 'styled-components'
import * as Helpers from '../../helpers/Formatters'
import * as Prod from '../../types/Product'
import * as Tag from '../../types/Tag'
import ActionToolbar from '../Common/ActionToolbar/index'
const image = require('./images/player_plus.png'); // TODO: to be removed
import { APP_SYMBOLS } from '../../types/AppSymbols'
import SearchMarker from '../Common/SearchMarker/index';
import { SpecialConstants } from '../../types/Enums'

export interface CallDetailsPaneProps extends React.Props<CallDetailsPane> {
  callData: Calls.CallData;

  handlers: {
    setFavorite: (id: Prod.ProductID, isFavorite: boolean) => void;
    addTags: (id: Prod.ProductID, tags: Tag.TagData[]) => void;
    addToNotebook: (id: Prod.ProductID) => void;
    openNotebook: (id: Prod.ProductID) => void;
    askForTranslate: (id: Prod.ProductID) => void;
    getTranscription: (id: Prod.ProductID) => void;
    markAsRead: (id: Prod.ProductID, isRead: boolean) => void;
  },
  parentSize: {
    width: number,
  }
  theme: Theme.ThemeProps
}
export interface CallDetailsPaneState {
}

interface StyledProps {
  showControls?: boolean;
  parentSize?: {
    width: number,
  }
}

const Root = styled.div`
  width: 100%;
  height: 100%;
`;
const Header = styled.header`
  width: 100%;
  background-color: ${prop => prop.theme.detailsPane.headerBgColor};
  overflow: hidden;
  height: ${SpecialConstants.detailsPaneHeaderHeight};
  line-height: ${SpecialConstants.detailsPaneHeaderHeight};
`;
const Caption = styled.h2`
  color: ${prop => prop.theme.genericTextColors.textColor};
  font-size: 1.9rem;
  float: left;
  margin: 0;
  margin-left: 30px;
`;
const Body = styled.div`
  width: 100%;
  background-color: ${prop => prop.theme.detailsPane.bodyBgColor};
  height: calc(100% - 50px);
  overflow: auto;
`;
const FloatRight = styled.div`
  width: 200px;
  height: 100%;
  float: right;
`;
const Controls = styled.div`
  height: 100%;
  float: right;
  margin-right: 20px;
`;

const DetailsPart = styled.div`
  display: ${((props: StyledProps) => props.parentSize.width > 1350 ? 'flex' : 'block' )};
  overflow: hidden;
  margin-left: 20px;
  margin-top: 30px;
  float: left;
  margin-bottom: 20px;
`;

const DetailsContainer = styled.div` 
  float: left;
  // margin-right: 80px;
  width: 220px;
`;
const DetailsLineDiv = styled.div`
  margin-bottom: 10px;
  height: 1.9rem;
`;
const SpanCaption = styled.span`
  color: ${(props) => props.theme.genericTextColors.textColorPale};
  padding-right: 5px;
  float: left;
  width: 70px;
`;

const SpanCaptionLeftSize = styled(SpanCaption)`
  width: 40px;
`;

const SpanText = styled.span` {
  display: inline-block;
  color: ${(props) => props.theme.genericTextColors.textColor};
  max-width: 220px;
  text-overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const PreviewPart = styled.div`
  width: 100%;
  height: calc(100% - 170px);
  position: relative;
  float: left;
`;

const PreviewCard = styled.div`
  background-color: ${(props) => props.theme.detailsPane.previewBgColor};
  left: 20px;
  right: 20px;
  top: 0;
  bottom: 30px;
  position: absolute;
`;

const Img = styled.img`
  width: 100%;
`;

const PreviewWrap = styled.div`
  width: 100%;
  margin: auto;
  // color: ${(props) => props.theme.genericTextColors.textColor};
  // margin-top: 50px;
`;

class CallDetailsPane extends React.Component<CallDetailsPaneProps, CallDetailsPaneState> {
  constructor(props: CallDetailsPaneProps) {
    super(props)

    this.state = {}
  }

  getType = (code: Calls.CallTypes) => {
    let caption;
    switch (code) {
      case Calls.CallTypes.incomming:
        caption = APP_SYMBOLS.incomming.caption;
        break;
      case Calls.CallTypes.outgoing:
        caption = APP_SYMBOLS.outgoing.caption;
        break;
      default:
        caption = APP_SYMBOLS.incomming.caption;
        break;
    }

    return caption;
  }

  getSource = (code: Calls.SourceTypes) => {
    let caption;
    switch (code) {
      case Calls.SourceTypes.video:
        caption = 'Video';
        break;
      case Calls.SourceTypes.audio:
        caption = 'Audio';
        break;
      default:
        caption = '';
    }
    return caption;
  }

  render() {
    const callData = this.props.callData || Calls.defaultCallData;
    const id = callData.id;
    const handlers = this.props.handlers;

    const details = {
      title: 'Phone Call',
      to: callData.fromTo ? callData.fromTo.phoneNumber : '',
      app: callData.appSymbol ? callData.appSymbol.caption : '',
      type: callData.type ? this.getType(callData.type) : '',
      date: callData.date ? Helpers.msToDateString(callData.date) : '',
      duration: Helpers.msSpanToString(callData.duration) || '',
      source: callData.source ? this.getSource(callData.source) : '',
    }

    return (
      <Root>
        <Header theme={this.props.theme}>
          <Caption>{details.title}</Caption>
          <FloatRight>
            <Controls>
              <ActionToolbar
                fontSize={16}
                lineHeight={SpecialConstants.detailsPaneHeaderHeight}
                withMenu={true}
                menuOnItemSelect={{
                  addTagCallback: (tags: Tag.TagData[]) => {handlers.addTags(id, tags)},
                  addToNotebookCallback: () => {handlers.addToNotebook(id)},
                  markAsReadCallback: () => {handlers.markAsRead(id, true)},
                  markAsUnreadCallback: () => {handlers.markAsRead(id, false)},
                  translateCallback: () => {handlers.askForTranslate(id)},
                  transcriptCallback: () => {handlers.getTranscription(id)},
                  exportCallback: () => {/*TODO: implement selected items*/},
                }}
                withFavorite={true}
                isFavorite={callData.isFavorite}
                favoriteOnClick={() => {this.props.handlers.setFavorite(id, !this.props.callData.isFavorite)}}
                withTranslate={false}
                hasTranslate={callData.hasTranslation}
                translateOnClick={() => this.props.handlers.askForTranslate(id)}
                withNotebook={true}
              />
            </Controls>
          </FloatRight>

        </Header>
        <Body>
        <DetailsPart
          parentSize={this.props.parentSize}
        >
          <DetailsContainer>
            <DetailsLineDiv>
              <SpanCaptionLeftSize>To:</SpanCaptionLeftSize>
              <SpanText><SearchMarker>{details.to}</SearchMarker></SpanText>
            </DetailsLineDiv>
            <DetailsLineDiv>
              <SpanCaptionLeftSize>App:</SpanCaptionLeftSize>
              <SpanText><SearchMarker>{details.app}</SearchMarker></SpanText>
            </DetailsLineDiv>
            <DetailsLineDiv>
              <SpanCaptionLeftSize>Type:</SpanCaptionLeftSize>
              <SpanText><SearchMarker>{details.type}</SearchMarker></SpanText>
            </DetailsLineDiv>
          </DetailsContainer>
          <DetailsContainer>
            <DetailsLineDiv>
              <SpanCaption>Date:</SpanCaption>
              <SpanText><SearchMarker>{details.date}</SearchMarker></SpanText>
            </DetailsLineDiv>
            <DetailsLineDiv>
              <SpanCaption>Duration:</SpanCaption>
              <SpanText><SearchMarker>{details.duration}</SearchMarker></SpanText>
            </DetailsLineDiv>
            <DetailsLineDiv>
              <SpanCaption>Source:</SpanCaption>
              <SpanText><SearchMarker>{details.source}</SearchMarker></SpanText>
            </DetailsLineDiv>
          </DetailsContainer>
        </DetailsPart>
        <PreviewPart>
          <PreviewCard>
            <PreviewWrap>
              <Img src={image}/>
            </PreviewWrap>
          </PreviewCard>
        </PreviewPart>
        </Body>
      </Root>
    )
  }
}

export default CallDetailsPane
