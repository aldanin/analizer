import * as React from 'react'
import * as Theme from './Theme'
import {DeviceSystem as DeviceSystemData } from '../../types/Summary';
import {
  AppContainer, AppIcon, AppTitle, getTextColor, SensorAndDeviceUnreadContainer, Title,
  ViewContainer
} from './Style';
import { withRouter } from 'react-router';
import { Link } from 'react-router';
import { buildURL, ParamsData, ViewPage } from '../../urlHelper';

export interface DeviceSystemProps {
  data: DeviceSystemData;
  theme?: Theme.ThemeProps;
  params?: ParamsData;
}

const DeviceSystemComponent: React.SFC<DeviceSystemProps> = ({ theme, data, params }) => {
  return (
    <ViewContainer>
      <Title>Device System</Title>
      <AppContainer>
        <AppIcon className="base_icons icon_directory"/>
        <Link to={buildURL({agent_id: params.agent_id, viewPage: ViewPage.DIRECTORY})}>
          <AppTitle>Directory</AppTitle>
        </Link>
        <SensorAndDeviceUnreadContainer
          color={getTextColor(data.directory, theme)}
        >{data.directory}
        </SensorAndDeviceUnreadContainer>
      </AppContainer>
      <AppContainer>
        <AppIcon className="base_icons icon_Cogwheel"/>
        <Link to={buildURL({agent_id: params.agent_id, viewPage: ViewPage.SYSTEM_INFO})}>
          <AppTitle>System Info</AppTitle>
        </Link>
        <SensorAndDeviceUnreadContainer
          color={getTextColor(data.systemInfo, theme)}
        >{data.systemInfo}
        </SensorAndDeviceUnreadContainer>
      </AppContainer>
      <AppContainer>
        <AppIcon className="base_icons icon_accounts"/>
        <Link to={buildURL({agent_id: params.agent_id, viewPage: ViewPage.ACCOUNTS})}>
          <AppTitle>Accounts</AppTitle>
        </Link>
        <SensorAndDeviceUnreadContainer
          color={getTextColor(data.accounts, theme)}
        >{data.accounts}
        </SensorAndDeviceUnreadContainer>
      </AppContainer>
    </ViewContainer>
  )
}

export default withRouter(DeviceSystemComponent)

DeviceSystemComponent.defaultProps = {
  theme: Theme.defaultTheme,
  params: {
    agent_id: 'Game Of Thrones',
  }
}
