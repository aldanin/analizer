import * as React from 'react'
import * as Theme from './Theme'
import {Sensors as SensorsData } from '../../types/Summary';
import {
  AppContainer, AppIcon, AppTitle, getTextColor, SensorAndDeviceUnreadContainer, Title,
  ViewContainer
} from './Style';
import { withRouter } from 'react-router';
import { Link } from 'react-router';
import { buildURL, ParamsData, ViewPage } from '../../urlHelper';

export interface SensorsProps {
  data: SensorsData;
  theme?: Theme.ThemeProps;
  params?: ParamsData;
}

const SensorsComponent: React.SFC<SensorsProps> = ({ theme, data, params }) => {
  return (
    <ViewContainer>
      <Title>Sensors</Title>
      {/*<AppContainer>*/}
        {/*<AppIcon className="base_icons icon_pointer"/>*/}
        {/*<Link to = {buildURL({agent_id: params.agent_id, viewPage: ViewPage.ACTIVITY})}>*/}
          {/*<AppTitle>Activity</AppTitle>*/}
        {/*</Link>*/}
        {/*<SensorAndDeviceUnreadContainer*/}
          {/*color = {getTextColor(data.activity, theme)}*/}
        {/*>{data.activity}*/}
        {/*</SensorAndDeviceUnreadContainer>*/}
      {/*</AppContainer>*/}
      <AppContainer>
        <AppIcon className="base_icons icon_snapshots"/>
        <Link to={buildURL({agent_id: params.agent_id, viewPage: ViewPage.SNAPSHOTS})}>
          <AppTitle>Snapshots</AppTitle>
        </Link>
        <SensorAndDeviceUnreadContainer
          color={getTextColor(data.snapshots, theme)}
        >{data.snapshots}
        </SensorAndDeviceUnreadContainer>
      </AppContainer>
      {/*<AppContainer>*/}
        {/*<AppIcon className="base_icons icon_environmental_audio"/>*/}
        {/*<Link to = {buildURL({agent_id: params.agent_id, viewPage: ViewPage.ENVIRONMENTAL_AUDIO})}>*/}
          {/*<AppTitle>Environmental Audio</AppTitle>*/}
        {/*</Link>*/}
        {/*<SensorAndDeviceUnreadContainer*/}
          {/*color = {getTextColor(data.envAudio, theme)}*/}
        {/*>{data.envAudio}*/}
        {/*</SensorAndDeviceUnreadContainer>*/}
      {/*</AppContainer>*/}
      <AppContainer>
        <AppIcon className="base_icons icon_location"/>
        <Link to={buildURL({agent_id: params.agent_id, viewPage: ViewPage.LOCATIONS})}>
          <AppTitle>Locations</AppTitle>
        </Link>
        <SensorAndDeviceUnreadContainer
          color={getTextColor(data.locations, theme)}
        >{data.locations}
        </SensorAndDeviceUnreadContainer>
      </AppContainer>
    </ViewContainer>
  )
}

export default withRouter(SensorsComponent)

SensorsComponent.defaultProps = {
  theme: Theme.defaultTheme,
  params: {
    agent_id: 'Game Of Thrones',
  }
}
