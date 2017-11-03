import * as React from 'react'
import * as Theme from './Theme'
import styled from 'styled-components';
import {UserApps as UserAppsData } from '../../types/Summary';
import { AppTitle, getTextColor, Title, UnreadContainer } from './Style';
import { withRouter } from 'react-router';
import { buildURL, ParamsData, ViewPage } from '../../urlHelper';
import { Link } from 'react-router/';

const ViewContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: auto;
  padding: 25px 30px 0 30px;
`;

const AppContainer = styled.div`
  position: relative;
  width: 100%;
  height: auto;
  display: flex;
  margin-bottom: 15px;
  padding-left: 5px;
`;

const AppIcon = styled.span`
  position: relative;
  top: -2px;
  padding-right: 10px;
`;

export interface UserAppsProps {
  data: UserAppsData;
  theme?: Theme.ThemeProps;
  params?: ParamsData;
}

const UserAppsComponent: React.SFC<UserAppsProps> = ({ theme, data, params }) => {
  return (
    <ViewContainer>
      <Title>User Apps</Title>
      {/*<AppContainer>*/}
        {/*<AppIcon className="base_icons icon_calls"/>*/}
        {/*<Link to = {buildURL({agent_id: params.agent_id, viewPage: ViewPage.CALLS})}>*/}
          {/*<AppTitle>Calls</AppTitle>*/}
        {/*</Link>*/}
        {/*<UnreadContainer color = {getTextColor(data.calls, theme)}>{data.calls}</UnreadContainer>*/}
      {/*</AppContainer>*/}
      <AppContainer>
        <AppIcon className="base_icons icon_im"/>
        <Link to={buildURL({agent_id: params.agent_id, viewPage: ViewPage.INSTANT_MESSAGING})}>
          <AppTitle>Instant Messages</AppTitle>
        </Link>
        <UnreadContainer color={getTextColor(data.im, theme)}>{data.im}</UnreadContainer>
      </AppContainer>
      <AppContainer>
        <AppIcon className="base_icons icon_mail"/>
        <Link to={buildURL({agent_id: params.agent_id, viewPage: ViewPage.MAIL})}>
          <AppTitle>Mail</AppTitle>
        </Link>
        <UnreadContainer color={getTextColor(data.mail, theme)}>{data.mail}</UnreadContainer>
      </AppContainer>
      <AppContainer>
        <AppIcon className="base_icons icon_contacts"/>
        <Link to={buildURL({agent_id: params.agent_id, viewPage: ViewPage.CONTACTS})}>
          <AppTitle>Contacts</AppTitle>
        </Link>
        <UnreadContainer color={getTextColor(data.contacts, theme)}>{data.contacts}</UnreadContainer>
      </AppContainer>
      {/*<AppContainer>*/}
        {/*<AppIcon className="base_icons icon_social"/>*/}
        {/*<Link to = {buildURL({agent_id: params.agent_id, viewPage: ViewPage.SOCIAL_NETWORKS})}>*/}
          {/*<AppTitle>Social Networks</AppTitle>*/}
        {/*</Link>*/}
        {/*<UnreadContainer color = {getTextColor(data.socialNetwork, theme)}>{data.socialNetwork}</UnreadContainer>*/}
      {/*</AppContainer>*/}
      <AppContainer>
        <AppIcon className="base_icons icon_browser"/>
        <Link to={buildURL({agent_id: params.agent_id, viewPage: ViewPage.BROWSER})}>
          <AppTitle>Browser</AppTitle>
        </Link>
        <UnreadContainer color={getTextColor(data.browser, theme)}>{data.browser}</UnreadContainer>
      </AppContainer>
      <AppContainer>
        <AppIcon className="base_icons icon_gallery"/>
        <Link to={buildURL({agent_id: params.agent_id, viewPage: ViewPage.GALLERY})}>
          <AppTitle>Gallery</AppTitle>
        </Link>
        <UnreadContainer color={getTextColor(data.gallery, theme)}>{data.gallery}</UnreadContainer>
      </AppContainer>
      {/*<AppContainer>*/}
        {/*<AppIcon className="base_icons icon_calendar"/>*/}
        {/*<Link to = {buildURL({agent_id: params.agent_id, viewPage: ViewPage.CALENDAR})}>*/}
          {/*<AppTitle>Calendar</AppTitle>*/}
        {/*</Link>*/}
        {/*<UnreadContainer color = {getTextColor(data.calendar, theme)}>{data.calendar}</UnreadContainer>*/}
      {/*</AppContainer>*/}
    </ViewContainer>
  )
}

export default withRouter(UserAppsComponent)
UserAppsComponent.defaultProps = {
  theme: Theme.defaultTheme,
  params: {
    agent_id: 'Game Of Thrones',
  }
}
