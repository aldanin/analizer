import * as React from 'react'
import styled from 'styled-components'
import { withTheme } from 'styled-components'
import * as Theme from '../Theme'
import * as IM from '../../../types/InstantMessaging'
import * as IMCommon from 'common-interfaces/types/InstantMessaging'
import AppIcon from '../AppIcon'
import ToggleDisplay from 'react-toggle-display';
import Avatar from 'material-ui/Avatar'
import { Topic, GroupInCommon } from '../../../types/InstantMessaging'
import SearchMarker from '../../Common/SearchMarker/index';

export interface PersonDetailsBarProps extends React.Props<PersonDetailsBar> {
  topic: Topic,
  onGroupInCommonSelected: (group: GroupInCommon) => void,
  theme: Theme.ThemeProps
}

export interface PersonDetailsBarState {
  messages: IMCommon.ChatMessage[],
  personBarShown: boolean
}

interface AppSymbolCaptionProps extends React.Props<PersonDetailsBar> {
  appKey: string;
  theme: Theme.ThemeProps;
}

const InfoBarWrap = styled.div`
  position: absolute;
  right: 10px;
  left: 10px;
  z-index: 2;
`;
const ToggleLinkWrap = styled.span`
  position: absolute; 
  z-index: 3;
  right: 45px;
  top: 15px;
  cursor: pointer;
  color: ${prop => prop.theme.genericTextColors.textColorLink};
`;
const ToggleLinkCaption = styled.span` 
  padding-right: 5px;
`;

/////////////// Details part /////////////

const Root = styled.div`
  width: 100%;
  background-color: ${(props) => props.theme.chatArea.bgDetailsBar};
  box-shadow: 3px 2px 10px rgba(169, 166, 166, 0.85);
  border: solid 1px ${(props) => props.theme.chatArea.borderColorDetailsBar};
  border-top: solid 4px green;
`;
const UpperPart = styled.div`
  width: 100%;
  height: 40px;
`;

const LowerPart = styled.div`
  width: 100%;
  height: 100px;   
`;
const AvatarContainer = styled.div`
  width: 100px;
  height: 100%;
  margin-left: 10px;
  float: left;
`;

const LeftContanier = styled.div`
  float: left;
  width: calc(100% - 200px);
`;
const NameContainer = styled.div`
  display: inline-block;
  width: 200px;
  // min-width: 150px;
  // max-width: 550px;
  height: 100%;
  margin-left: 24px;
  color: ${(props) => props.theme.genericTextColors.textColor};
  font-size: 1.8rem;
  padding-top: 15px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;   
  float: left;
  margin-right: 10px;
  cursor: default;
`;
const AppSymbolDiv = styled.div`
  display: inline-block;
  font-size: 1.2rem;
  padding-top: 13px;
  float: left;
`;

const AppSymbolCaption = styled.span`
  color: ${(props: AppSymbolCaptionProps) => props.theme.appSymbols.colors[props.appKey]}
`;

const DetailsContainer = styled.div` {
  float: left;
  margin-left: 10px;
  margin-top: 20px;
  height: 75px;
  overflow: auto;
`;
const DetailsLineDiv = styled.div`{
  margin-bottom: 10px;
`;
const SpanCaption = styled.span` {
  color: ${(props) => props.theme.genericTextColors.textColorPale};
  padding-right: 5px;
  float: left;
  width: 70px;
`;
const SpanCaptionGroups = styled(SpanCaption)` {
  color: ${(props) => props.theme.genericTextColors.textColorPale};
  padding-right: 5px;
  float: left;
  width: 120px;
`;
const SpanText = styled.span` {
  display: inline-block;
  color: ${(props) => props.theme.genericTextColors.textColor};
`;
const LinkSpanText = styled.span` {
  color: ${(props) => props.theme.genericTextColors.textColorLink};
  cursor: pointer;
`;

class PersonDetailsBar extends React.Component<PersonDetailsBarProps, PersonDetailsBarState> {

  constructor(props: PersonDetailsBarProps) {
    super(props)

    this.state = {
      messages: [],
      personBarShown: false
    }
  }

  onGroupSelected = (group) => {
    this.props.onGroupInCommonSelected({
      id: group.id,
      name: group.name,
      topicId: group.topicId
    })
  }

  onRender = () => {
    const topic = this.props.topic;
    const theme = this.props.theme;
    const chatEntity = topic.chatEntity;

    const potentialPerson = chatEntity as IMCommon.Participant;
    const conversationDetails = {
      name: topic.name,
      avatar: potentialPerson.avatar,
      phoneMobile: potentialPerson.phoneNumber || '',
      identifier: topic.name || '',
      status: topic.info.status || '',
    }

    const commonGroupComps = topic.info.groupsInCommon.map((group: IM.ChatGroup, index: number) => {
      return (
        <DetailsLineDiv key={index}>
          <SpanCaptionGroups>{index === 0 ? 'Groups in common:' : '\xA0'}</SpanCaptionGroups>
          <LinkSpanText
            onClick={() => this.onGroupSelected(group)}
          >
            <SearchMarker>{group.name}</SearchMarker>
          </LinkSpanText>
        </DetailsLineDiv>
      )
    });

    return {
      theme: theme,
      topic: topic,
      conversationDetails: conversationDetails,
      commonGroupComps: commonGroupComps
    }
  }

  render() {
    const params = this.onRender();

    const muiStyles = {
      avatar: {
        display: 'block',
        width: 75,
        height: 75,
        border: 'solid 1px silver',
        margin: 'auto',
        position: 'relative',
        top: 10,
      }
    }

    const iconName = params.topic.appSymbol.icon || params.topic.appSymbol.key;
    const iconColor = this.props.theme.appSymbols.colors[params.topic.appSymbol.key];

    return (
      <div>
        <ToggleLinkWrap
          onClick={() => {
            this.setState({personBarShown: !this.state.personBarShown})
          }}
          theme={this.props.theme}
        >
          <ToggleDisplay show={this.state.personBarShown}>
            <ToggleLinkCaption>Hide Info</ToggleLinkCaption>
            <AppIcon iconKey={'arrow_double_up'} theme={params.theme} size={10}/>
          </ToggleDisplay>
          <ToggleDisplay hide={this.state.personBarShown}>
            <ToggleLinkCaption>Show Info</ToggleLinkCaption>
            <AppIcon iconKey={'arrow_double_down'} theme={params.theme} size={10}/>
          </ToggleDisplay>
        </ToggleLinkWrap>
        <InfoBarWrap>
          <ToggleDisplay show={this.state.personBarShown}>
            <Root>
              <UpperPart>
                <LeftContanier>
                  <NameContainer title={params.conversationDetails.name}>
                    <SearchMarker>{params.conversationDetails.name}</SearchMarker>
                  </NameContainer>
                  <AppSymbolDiv>
                    <AppIcon iconKey={iconName} theme={params.theme} color={iconColor}/>
                    <AppSymbolCaption
                      appKey={params.topic.appSymbol.key}
                      theme={params.theme}
                    >
                      <SearchMarker>{params.topic.appSymbol.caption}</SearchMarker>
                    </AppSymbolCaption>
                  </AppSymbolDiv>
                </LeftContanier>
              </UpperPart>
              <LowerPart>
                <AvatarContainer>
                  <Avatar style={muiStyles.avatar} src={params.conversationDetails.avatar}/>
                </AvatarContainer>
                <DetailsContainer>
                  <DetailsLineDiv>
                    <SpanCaption>Phone:</SpanCaption>
                    <SpanText><SearchMarker>{params.conversationDetails.phoneMobile}</SearchMarker></SpanText>
                  </DetailsLineDiv>
                  <DetailsLineDiv>
                    <SpanCaption>Name:</SpanCaption>
                    <SpanText><SearchMarker>{params.conversationDetails.name}</SearchMarker></SpanText>
                  </DetailsLineDiv>
                  <DetailsLineDiv>
                    <SpanCaption>Status:</SpanCaption>
                    <SpanText><SearchMarker>{params.conversationDetails.status}</SearchMarker></SpanText>
                  </DetailsLineDiv>
                </DetailsContainer>
                <DetailsContainer>
                  {params.commonGroupComps}
                </DetailsContainer>
              </LowerPart>
            </Root>
          </ToggleDisplay>
        </InfoBarWrap>
      </div>
    )
  }
}

export default withTheme(PersonDetailsBar)
