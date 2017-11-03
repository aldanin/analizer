import * as React from 'react'
import { ToolbarGroup } from 'material-ui/Toolbar';
import LCheckbox from '../Common/LabeledCheckbox/LabeledCheckbox'
import { APP_SYMBOLS } from '../../types/AppSymbols'
import * as Theme from './Theme'
import { withTheme } from 'styled-components';
import DropdownGeneric from '../Common/DropdownGeneric'
import styled from 'styled-components'

export interface CallsFiltersProps {
  onBooleanFilterChange: (key: string, state: boolean) => void;
  selectType: (value: number) => void
  selectSource: (value: number) => void
  theme?: Theme.ThemeProps
}

const CallsFilters: React.SFC<CallsFiltersProps> = (props) => {

  const DisplaySpan = styled.span`
    font-size: 12px;
    color: ${ () => props.theme.genericTextColors.textColorPale};
    margin-right: 24px;
    margin-left: 24px;
    padding-bottom: 3px;
`;

  const styles: any = {
    LCheckbox: {
      marginRight: 24,
    },
    line: {
      display: 'table-cell',
      position: 'relative',
    },
  };

  const appSymbolsTheme = props.theme.appSymbols;

  return (
    <div>
      <ToolbarGroup>
        <DisplaySpan>Display:</DisplaySpan>
        <LCheckbox
          caption={APP_SYMBOLS.whatsapp.caption}
          iconName="whatsapp"
          labelColor={appSymbolsTheme.colors.whatsapp}
          style={styles.LCheckbox}
          filter={APP_SYMBOLS.whatsapp.key}
          onChange={props.onBooleanFilterChange}
          theme={props.theme}
        />
        <LCheckbox
          caption={APP_SYMBOLS.skype.caption}
          iconName="skype"
          labelColor={appSymbolsTheme.colors.skype}
          style={styles.LCheckbox}
          filter={APP_SYMBOLS.skype.key}
          onChange={props.onBooleanFilterChange}
          theme={props.theme}
        />
        <LCheckbox
          caption={APP_SYMBOLS.telegram.caption}
          iconName="telegram"
          labelColor={appSymbolsTheme.colors.telegram}
          style={styles.LCheckbox}
          filter={APP_SYMBOLS.telegram.key}
          onChange={props.onBooleanFilterChange}
          theme={props.theme}
        />
        <LCheckbox
          caption={APP_SYMBOLS.viber.caption}
          iconName="viber"
          labelColor={appSymbolsTheme.colors.viber}
          style={styles.LCheckbox}
          filter={APP_SYMBOLS.viber.key}
          onChange={props.onBooleanFilterChange}
          theme={props.theme}
        />
        <DropdownGeneric
          caption={'Type'}
          values={['type1', 'type2']}
          selectCallback={props.selectType}
          style={{right: -40}}
        />
        <DropdownGeneric
          caption={'Source'}
          values={['source1', 'source2']}
          selectCallback={props.selectSource}
        />
      </ToolbarGroup>
    </div>
  )
};

export default withTheme(CallsFilters)
