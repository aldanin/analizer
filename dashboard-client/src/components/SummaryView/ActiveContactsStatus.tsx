import * as React from 'react'
import * as Theme from './Theme'
import styled, { withTheme } from 'styled-components';
import { ActiveContactsBar } from '../../types/Summary';

const StatusBar = styled.div`
  position: relative;
  height: 34px;
  width: 100%;
  line-height: 34px;
`;

interface BarProps {
  width: number;
  shadow: string;
}

interface ProductsBarProps {
  width: number;
}

const BarView = styled.div`
  display: inline-block;
  height: 10px;
  width: 100%;
`;

const Bar = styled.span`
  display: flex;
  width: ${(prop: BarProps) => prop.width}%;
  border: 1px solid transparent;
  border-radius: 10em;
  background-color: ${prop => prop.theme.statusBarLow};
  box-shadow: ${(prop: BarProps) => prop.shadow};
`;

const CallsBar = styled.span`
  width: ${(prop: ProductsBarProps) => prop.width}%;
  height: 10px;
  background-color: ${prop => prop.theme.statusBarHigh};
  border-left: 1px solid ${prop => prop.theme.statusBarHigh};
  border-radius: 10em 0 0 10em;
`;

const IMBar = styled.span`
  width: ${(prop: ProductsBarProps) => prop.width}%;
  height: 10px;
  background-color: ${prop => prop.theme.statusBarMedium};
`;

export interface ActiveContactsStatusProps {
  data: ActiveContactsBar;
  maxWidthIndicator: number;
  isInfoOpen?: boolean;
  theme?: Theme.ThemeProps;
}

// FIXME: colors should come from Theme
const ActiveContactsStatus: React.SFC<ActiveContactsStatusProps> = ({theme, data, maxWidthIndicator, isInfoOpen }) => {
  const currentWidthIndicator = data.calls + data.im + data.mails;
  return (
    <StatusBar>
      <BarView>
        <Bar
          width={(currentWidthIndicator / maxWidthIndicator) * 100}
          shadow={isInfoOpen ? '0 0 0px 2px #fff, 0 0 0px 3px ' + theme.contactStatusBarHoverColor : 'none'}
        >
          <CallsBar width={(data.calls / currentWidthIndicator) * 100}/>
          <IMBar width={(data.im / currentWidthIndicator) * 100}/>
        </Bar>
      </BarView>
    </StatusBar>
  )
}

export default withTheme(ActiveContactsStatus)

ActiveContactsStatus.defaultProps = {
  theme: Theme.defaultTheme,
  isInfoOpen: false,
}
