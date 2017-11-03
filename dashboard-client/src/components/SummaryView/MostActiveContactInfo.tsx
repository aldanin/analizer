import * as React from 'react'
import styled, { withTheme } from 'styled-components';
import * as Theme from './Theme'
import { ActiveContactsBar } from '../../types/Summary';
import moment = require('moment');
import { withRouter } from 'react-router';
import { Link } from 'react-router';
import { buildURL, ParamsData, ViewPage } from '../../urlHelper';

const InfoView = styled.div`
  width: 415px;
  height: 200px;
`;

const TitleContainer = styled.div`
  position: relative;
  left: -10px;
  top: -8px;
  width: 105%;
  height: 5rem;
  line-height: 5rem;
  background-color: ${prop => prop.theme.infoTitleBgColor};
  color: ${prop => prop.theme.infoTitleTextColor};
  display: flex;
  font-size: 1.7rem;
`;

const AvatarContainer = styled.span`
  display: block;
  padding: 1rem 0 1rem 2rem;
`;

const LatestCommunication = styled.div`
  font-size: 1.7rem;
  padding: 0.5rem 0 1.5rem 2rem;
`;

const AppInfoContainer = styled.div`
  display: flex;
  padding: 0 0 1rem 2rem;
  line-height: 2.5rem;
`;

const IconContainer = styled.span`
  position: relative;
  display: block;
  background-color: ${prop => prop.color};
  width: 2.3rem;
  height: 2.3rem;
  text-align: center;
  line-height: 2.3rem;
  border-radius: 10rem;
  margin-right: 1rem;
`;

const Icon = styled.span`
  display: inline-block;
  font-size: 1.5rem;
  vertical-align: middle;
  color: ${prop => prop.color};
`;

const AppInfoText = styled.span`
  white-space: nowrap;
  overflow:hidden !important;
  text-overflow: ellipsis;
  font-size: 1.2rem;
  margin-right: 1.5rem;
  color: ${prop => prop.theme.contactInfoTitleColor};
`;

const AppInfoTime = styled.span`
  white-space: nowrap;
  overflow:hidden !important;
  text-overflow: ellipsis;
  font-size: 1.2rem;
  margin-right: 1.5rem;
  color: ${prop => prop.theme.contactInfoTimeColor};
`;

const AppInfoView = styled.span`
  white-space: nowrap;
  overflow:hidden !important;
  text-overflow: ellipsis;
  font-size: 1.2rem;
  margin-right: 2rem;
  font-weight: bold;
  color: ${prop => prop.theme.contactInfoViewColor};
`;

export interface MostActiveContactInfoProps {
  avatar: JSX.Element;
  contactName: string;
  data: ActiveContactsBar;
  theme?: Theme.ThemeProps;
  params?: ParamsData;
}

const MostActiveContactInfo: React.SFC<MostActiveContactInfoProps> = ({ avatar, contactName, theme, data, params}) => {
  return (
    <InfoView>
      <TitleContainer>
        <AvatarContainer>
          {avatar}
        </AvatarContainer>
        {contactName}
      </TitleContainer>
      <LatestCommunication>
        Latest Communication: {moment(data.lastCommunication).format('DD/MM/YYYY HH:mm')}
      </LatestCommunication>
      <AppInfoContainer>
        <IconContainer color={theme.statusBarHigh}>
          <Icon className="base_icons icon_calls" color={theme.contactInfoIconColor}/>
        </IconContainer>
        <AppInfoText>{data.calls} Phone Calls</AppInfoText>
        <AppInfoTime>Latest: {moment(data.lastCall).format('DD/MM/YYYY HH:mm')}</AppInfoTime>
        <Link to={buildURL({agent_id: params.agent_id, viewPage: ViewPage.CALLS})}>
          <AppInfoView>View >></AppInfoView>
        </Link>
      </AppInfoContainer>
      <AppInfoContainer>
        <IconContainer color={theme.statusBarMedium}>
          <Icon className="base_icons icon_im" color={theme.contactInfoIconColor}/>
        </IconContainer>
        <AppInfoText>{data.im} Instant Message</AppInfoText>
        <AppInfoTime>Latest: {moment(data.lastIM).format('DD/MM/YYYY HH:mm')}</AppInfoTime>
        <Link to={buildURL({agent_id: params.agent_id, viewPage: ViewPage.INSTANT_MESSAGING})}>
          <AppInfoView>View >></AppInfoView>
        </Link>
      </AppInfoContainer>
      <AppInfoContainer>
        <IconContainer color={theme.statusBarLow}>
          <Icon className="base_icons icon_mail" color={theme.contactInfoIconColor}/>
        </IconContainer>
        <AppInfoText>{data.mails} Mail</AppInfoText>
        <AppInfoTime>Latest: {moment(data.lastMail).format('DD/MM/YYYY HH:mm')}</AppInfoTime>
        <Link to={buildURL({agent_id: params.agent_id, viewPage: ViewPage.MAIL})}>
          <AppInfoView>View >></AppInfoView>
        </Link>
      </AppInfoContainer>
    </InfoView>
  )
}

export default withRouter(withTheme(MostActiveContactInfo))

MostActiveContactInfo.defaultProps = {
  theme: Theme.defaultTheme,
  params: {
    agent_id: 'Game Of Thrones',
  }
}
