import * as React from 'react';
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar';
// import * as moment from 'moment';
import { ViewIcon, Title } from './Style';
import { ThemeProvider } from 'styled-components';
import { ThemeProps, DEFAULT_THEME } from './Theme';

export interface TitleStyle {
  marginLeft: string;
}

export interface AppViewHeaderToolbarProps {
  icon: string, // name of the icon from base icons to show
  title: string; // name of the viewer
  titleStyle: TitleStyle, // margin before icon and title {interface used for styled component}
  lastExtractionTime: number;
  updateTimeIndicator: number;
  requestUpdate: () => void;
  extractNow: () => void;
  theme?: ThemeProps;
}

const AppViewHeaderToolbar: React.SFC<AppViewHeaderToolbarProps> =
  ({
     icon, title, titleStyle, lastExtractionTime, updateTimeIndicator,
     requestUpdate, extractNow, theme
   }: AppViewHeaderToolbarProps) => {
    {
      const viewIcon = 'base_icons ' + icon;

      return (
        <ThemeProvider theme={theme}>
          <Toolbar style={{backgroundColor: theme.backgroundColor}}>

            {/*Left side*/}
            <ToolbarGroup firstChild={true} style={{padding: '1.4rem 1rem 1rem 2.7rem'}}>
              <ViewIcon className={viewIcon} color={theme.iconViewColor}/>
              <Title color={theme.titleColor}>{title}</Title>
            </ToolbarGroup>

            {
              /*
               Right side
               <ToolbarGroup lastChild={true} style={{paddingRight: '1.2rem'}}>
               <Extraction color={theme.textColor}>Last extraction:</Extraction>
               <Indicator color={theme.textColor}>
               {lastExtractionTime === 0 ? 'Fetching...' : (
               moment(lastExtractionTime).fromNow()
               )}
               </Indicator>
               <WatchIcon className="material-icons" color={theme.watchColor} marginLeft={'10px'}>
               watch_later
               </WatchIcon>
               <Indicator color={theme.textColor}>
               Every {updateTimeIndicator === 0 ? 'Fetching...' : (
               moment.duration((updateTimeIndicator), 'seconds').humanize()
               )}
               </Indicator>
               <Update color={theme.linkColor} onClick={() => {requestUpdate()}}>Update</Update>
               <Extract color={theme.linkColor} onClick={() => {extractNow()}}>Extract now</Extract>
               </ToolbarGroup>
               */
            }
          </Toolbar>
        </ThemeProvider>
      );
    }
  }

AppViewHeaderToolbar.defaultProps = {
  theme: DEFAULT_THEME,
}

export default AppViewHeaderToolbar;
