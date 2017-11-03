import * as React from 'react'
import FontIcon from 'material-ui/FontIcon'
import * as Agent from '../../types/Agent'

export interface AgentIconProps {
  device: Agent.AgentDeviceType,
  os: Agent.AgentDeviceOs,
  height: string,
}

const AgentIcon: React.SFC<AgentIconProps> = ({ device, os, height }) => {
  const deviceLc = device.toLowerCase()
  const osLc = os.toLowerCase()

  let icon = 'material-icons help_outline'
  if (deviceLc === Agent.AGENT_DEVICE_PHONE.toLowerCase()) {
    if (osLc === Agent.AGENT_OS_ANDROID.toLowerCase()) {
      icon = 'base_icons icon_android'
    } else if (osLc === Agent.AGENT_OS_IOS.toLowerCase()) {
      icon = 'base_icons icon_iphone'
    }
  } else if (deviceLc === Agent.AGENT_DEVICE_DESKTOP.toLowerCase()) {
    if (osLc === Agent.AGENT_OS_WINDOWS.toLowerCase()) {
      icon = 'base_icons icon_windows'
    } else if (osLc === Agent.AGENT_OS_MACOS.toLowerCase()) {
      icon = 'base_icons icon_ios'
    }
  } else if (deviceLc === Agent.AGENT_DEVICE_CLOUD.toLowerCase()) {
    icon = 'base_icons icon_cloud'
  }

  return (
    <FontIcon className={icon} style={{fontSize: height, color: 'inherit'}}/>
  )
}

export default AgentIcon
