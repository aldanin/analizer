import * as React from 'react'
import styled from 'styled-components'
import { CardHeader, CardText } from 'material-ui/Card'
import Avatar from 'material-ui/Avatar'
import { PieChart, Pie, Cell } from 'recharts';
import * as ContactsCommon from 'common-interfaces/types/Contacts'
import * as Contacts from '../../types/Contacts'
import * as Helpers from '../../helpers/Formatters'
import * as HelperEnums from '../../helpers/enums'
import ActivityPattern from '../Common/ActivityPattern'
import { colorSchemes } from '../Common/ActivityPattern'
import AppIcon from '../Common/AppIcon'
import * as Theme from './Theme'
import TimespanDropDown from './TimespanDropDown'
import ActionToolbar from '../Common/ActionToolbar/index'
import * as Prod from '../../types/Product'
import * as AppSymbols from '../../types/AppSymbols'
import * as Tag from '../../types/Tag'

export interface ContactDetailsProps {
  contact: ContactsCommon.Contact;

  handlers: {
    onStatisticsTimespanChange: (value: any) => void;
    setFavorite: (itemId: Prod.ProductID, isFavorite: boolean) => void;
    addTags: (itemId: Prod.ProductID, tags: Tag.TagData[]) => void;
    markAsRead: (itemId: Prod.ProductID, isRead: boolean) => void;
    addToNotebook: (itemId: Prod.ProductID) => void,
    askForTranslate: (itemId: Prod.ProductID) => void,
    askForTranscript: (itemId: Prod.ProductID) => void,
    getTranslate: (itemId: Prod.ProductID) => void,
    getTranscript: (itemId: Prod.ProductID) => void,
    openNotebook: () => void,
    exportItem: (itemId: Prod.ProductID) => void,
  },
  width: number,
  theme: Theme.ThemeProps
}

interface StylesProps {
  chartLeft?: number,
  hide?: boolean,
  theme?: Theme.ThemeProps,
  captionWidth?: number,
}

const Root = styled.div`
    height: 100%;
    background-color: ${props => props.theme.detailsPane.bodyBgColor};
  `;
const Body = styled.div`
    height: calc(100% - 4.6rem);
    overflow: auto; 
    padding: 3rem  1.2rem 3rem 3rem;
    padding-top: 0
  `;
const CardTextStyled = styled(CardText)`{
    padding-bottom: 0;
    overflow: hidden;
    font-size: 100% !important;
    padding: 20px 0 15px 0 !important;
    border-bottom: solid 1px ${props => props.theme.genericTextColors.borderColor};
  `;
const CardTextStyled2 = styled(CardTextStyled)`{
    padding-bottom: 20px !important;
  `;
const Controls = styled.div`
    float: right;
    position: relative;
    bottom: 5px;
  `;
const Chart = styled.div`
    // width: 45%;
    float: left;
    position: relative;
    // top: -100px;
    // left: -40px;
  `;
const ChartInnerText = styled.div`
    position: relative;
    left: 100px;
    top: -124px;
    width: 100px;
  `;
const ChartInnerNumber = styled.h2`
    font-size: 35px;
    font-weight: normal;
    margin: 0;
`;
const ChartInnerCaption = styled.h5`
    font-weight: normal;
    font-size: 100%;
    margin: 0;
    margin-left: -22px;
`;

const BodyDivLeftSide = styled.div` {
    float: left;
  `;
const BodyDivRightSide = styled.div` {
    float: left;
    margin-left: 40px;
    margin-top: 10px;
  `;
const DivSpanContainer = styled.div`{
    display: ${(props: StylesProps) => props.hide ? 'none' : 'block'};
    margin-bottom: 1rem;
  `
const SpanCaption = styled.span` {
    color: ${(props: StylesProps) => props.theme.genericTextColors.textColorPale};
    padding-right: 5px;
    float: left;
    width: ${(props: StylesProps) => props.captionWidth || 90}px;
  `;
const SpanCaptionAutoWidth = styled(SpanCaption)` {
    width: auto;
  `;
const SpanText = styled.span` {
    display: inline-block;
    color: ${(props: StylesProps) => props.theme.genericTextColors.textColor};
    text-overflow: ellipsis;
    overflow: hidden;
    width: 180px;
    white-space: nowrap;
  `;
const SpanTextApp = styled(SpanText)` {
    margin-top: -5px;
  `;
const SpanTextUnwrapped = styled.span` {
    display: block;
  `;
const DivCard3StatsForCaption = styled.div`{
    display: inline-block;
    margin-right: 7px;
    padding-bottom: 0;
    vertical-align: top;
    margin-top: 1px;
  `;
const PieChartPartWrap = styled.div` {
    width: 43%;
    height: 326px;
    float: left;
    position: relative;
  `;
const ActivityPatternPartWrap = styled.div` {
    float: right;
    width: 57%;
  `;
const CardTextCharts = styled.div` {
    overflow: hidden;
    font-size: 100%;
  `;
const ChatChart = styled(Chart)` {
    position: relative;
    top: -100px;
    left: ${(props: StylesProps) => props.chartLeft}px;
  `;

const ActivityPatternWrap = styled.div`
    margin-top: 1.2rem;
`;

const DefaultAvatarSpan = styled.span`
  color: ${props => props.theme.defaultAvatar.color};
  background-color: ${props => props.theme.defaultAvatar.backgroundColor};
  user-select: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 5rem;
  border-radius: 50%;
  height: 85px;
  width: 85px;
`;

const MUIStylesFunc = (theme: Theme.ThemeProps) => {
  return {
    card: {
      position: 'relative',
      height: '100%',
      width: '100%',
      margin: 'auto',
      backgroundColor: theme.detailsPane.bodyBgColor,
    },
    cardHeader1: {
      backgroundColor: theme.detailsPane.headerBgColor,
      padding: '12px 1.2rem 12px 3rem',
      color: theme.genericTextColors.textColor,
      display: 'block',
      height: '4.6rem'
    },
    cardHeaderText: {
      color: theme.genericTextColors.textColor,
      fontSize: '1.6rem',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      maxWidth: 300,
      display: 'inline-block',
      overflow: 'hidden'
    },
    tag: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    paragraph1Avatar: {
      width: 85,
      height: 85
    },
    star: {
      fontSize: 14,
      position: 'relative',
      left: '3%',
    },
  }
};

const getInsightsPart = (props: ContactDetailsProps) => {
  //
  // A 'placeholder' for when insights will be available, we assign a mock one for compilation purposes:
  //
  const contact = Object.assign(props.contact, {
    insights: null
  });

  if (!contact.insights) {
    return (
      <div/>
    )
  }

  const colors = [
    props.theme.detailsPane.pieOtherPart,
    props.theme.detailsPane.pieFilledPart
  ];

  const statistics = [{
    name: 'Group A', value: contact.insights.statistics
      ? contact.insights.statistics.ingoing
      : 1
  }, {
    name: 'Group B', value: contact.insights.statistics
      ? contact.insights.statistics.outgoing
      : 0
  },
  ];

  const totalChats = contact.insights.statistics
    ? contact.insights.statistics.ingoing + contact.insights.statistics.outgoing
    : undefined;

  const activityPatternWidth = props.width >= 470 ? 240 : 200;
  const chartLeft = props.width >= 470 ? -40 : -50;

  return (
    <div>
      <CardHeader
        style={{padding: '1.6rem 1.6rem 1.6rem 0'}}
        title={'Insights'}
      />
      <CardTextCharts>
        <PieChartPartWrap>
          <DivSpanContainer>
            <DivCard3StatsForCaption>Statistics for:</DivCard3StatsForCaption>
            <TimespanDropDown theme={props.theme} onChange={props.handlers.onStatisticsTimespanChange}/>
          </DivSpanContainer>
          <ChatChart
            chartLeft={chartLeft}
          >
            <PieChart width={200} height={300}>
              <Pie
                data={statistics}
                isAnimationActive={false}
                cx={120}
                cy={200}
                innerRadius={55}
                outerRadius={70}
                paddingAngle={2}
              >
                {
                  statistics.map((entry, index) => <Cell key={index} fill={colors[index % colors.length]}/>)}
              </Pie>
            </PieChart>
            <ChartInnerText>
              <ChartInnerNumber>
                {totalChats}
              </ChartInnerNumber>
              <ChartInnerCaption>
                communications
              </ChartInnerCaption>
            </ChartInnerText>
          </ChatChart>
        </PieChartPartWrap>
        <ActivityPatternPartWrap>
          <div>Activity Pattern:</div>
          <ActivityPatternWrap>
            <ActivityPattern
              isFixedWidth={false}
              width={activityPatternWidth}
              activityTable={contact.insights.activityPattern}
              colorScheme={colorSchemes.BLUE}
            />
          </ActivityPatternWrap>
        </ActivityPatternPartWrap>
      </CardTextCharts>
    </div>
  )
}

const getAddressPart = (props: ContactDetailsProps) => {
  const contact = props.contact;

  const JSX = contact.address
    ? (
      <DivSpanContainer>
        <SpanCaption>Address:</SpanCaption>
        <SpanText>
          <SpanTextUnwrapped>{Helpers.addSearchMarker(true, contact.address.street)}</SpanTextUnwrapped>
          <SpanTextUnwrapped>{Helpers.addSearchMarker(true, contact.address.city)}</SpanTextUnwrapped>
          <SpanTextUnwrapped>{Helpers.addSearchMarker(true, contact.address.country)}</SpanTextUnwrapped>
        </SpanText>
      </DivSpanContainer>
    )
    : <DivSpanContainer/>;

  return JSX;
}

const getDivSpanContainer = (caption: string, value: string, theme: Theme.ThemeProps, captionWidth?: number) => {
  return value
    ? (
      <DivSpanContainer>
        <SpanCaption captionWidth={captionWidth}>{caption}:</SpanCaption>
        <SpanText
          theme={theme}
          title={value}
        >
          {Helpers.addSearchMarker(true, value)}
        </SpanText>
      </DivSpanContainer>
    )
    : (
      <div/>
    )
}

const getAvatar = (avatar: string, theme: Theme.ThemeProps) => {
  return avatar
    ? (
      <Avatar style={MUIStylesFunc(theme).paragraph1Avatar} src={avatar}/>
    )
    : (
      <DefaultAvatarSpan
        className={'base_icons icon_contacts'}
      />
    )
}

const getLastOnLine = (lastOnline: string) => {
  return lastOnline
    ? (
      <DivSpanContainer>
        <SpanCaptionAutoWidth>Last Appeared in extraction from &nbsp;
          {Helpers.addSearchMarker(true, lastOnline)}
        </SpanCaptionAutoWidth>
      </DivSpanContainer>
    )
    : (
      <div/>
    )
}

const ContactDetailsPane: React.SFC<ContactDetailsProps> = (props) => {

  const handlers = props.handlers;

  const contact = props.contact;
  const appSymbol = AppSymbols.APP_SYMBOLS[contact.app];

  const muiStyles = MUIStylesFunc(props.theme);
  const upperPartValueWidth = props.width >= 470 ? 90 : 40;

  return (
    <Root>
      <CardHeader
        title={Helpers.addSearchMarker(true, contact.name)}
        style={muiStyles.cardHeader1}
        titleStyle={muiStyles.cardHeaderText}
      >
        <Controls>
          <ActionToolbar
            fontSize={16}
            lineHeight={'30px'}
            withMenu={true}
            menuOnItemSelect={{
              addTagCallback: (tags: Tag.TagData[]) => {
                handlers.addTags(contact.id, tags)
              },
              addToNotebookCallback: () => {
                handlers.addToNotebook(contact.id)
              },
              markAsReadCallback: () => {
                handlers.markAsRead(contact.id, true)
              },
              markAsUnreadCallback: () => {
                handlers.markAsRead(contact.id, false)
              },
              translateCallback: () => {
                handlers.askForTranslate(contact.id)
              },
              transcriptCallback: () => {
                handlers.askForTranscript(contact.id)
              },
              exportCallback: () => {
                handlers.exportItem(contact.id)
              },
            }}
            withFavorite={true}
            isFavorite={contact.isFavorite}
            favoriteOnClick={() => {
              props.handlers.setFavorite(contact.id, !props.contact.isFavorite)
            }}
            withTranslate={false}
            hasTranslate={false}
            translateOnClick={() => {/* not implemented */
            }}
          />
        </Controls>
      </CardHeader>
      <Body>
      <CardTextStyled>
        <BodyDivLeftSide>
          {getAvatar(contact.avatar, props.theme)}
        </BodyDivLeftSide>
        <BodyDivRightSide>
          {getDivSpanContainer('Home', contact.phoneHome, props.theme, upperPartValueWidth)}
          {getDivSpanContainer('Status', contact.details, props.theme, upperPartValueWidth)}
          {getDivSpanContainer('Work', contact.phoneWork, props.theme, upperPartValueWidth)}
          {getDivSpanContainer('Email', contact.email, props.theme, upperPartValueWidth)}
          {getAddressPart(props)}
          {getDivSpanContainer(
            'Birthday',
            Helpers.msToDateString(contact.birthday, HelperEnums.DateFormats.dateOnly),
            props.theme)}
        </BodyDivRightSide>
      </CardTextStyled>
      <CardTextStyled2>
        <BodyDivLeftSide>
          <DivSpanContainer>
            <SpanCaption>App:</SpanCaption>
            <SpanTextApp><AppIcon appSymbol={appSymbol} theme={props.theme.appSymbols}/></SpanTextApp>
          </DivSpanContainer>
          {getDivSpanContainer('Added', Helpers.msToDateString(contact.dateAdded), props.theme)}
          {getDivSpanContainer('Modified', Helpers.msToDateString(contact.dateModified), props.theme)}
          {getDivSpanContainer('Extraction Time', Helpers.msToDateString(contact.lastChat), props.theme)}
          {getLastOnLine(Helpers.msToDateString(contact.lastOnline))}
        </BodyDivLeftSide>
      </CardTextStyled2>

      {getInsightsPart(props)}

      </Body>
    </Root>
  )
};

export default ContactDetailsPane
ContactDetailsPane.defaultProps = {contact: Contacts.DEFAULT_CONTACT};
