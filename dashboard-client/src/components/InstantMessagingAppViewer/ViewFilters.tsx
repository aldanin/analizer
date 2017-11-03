import * as React from 'react'
import { ToolbarGroup } from 'material-ui/Toolbar';
import LCheckbox from '../Common/LabeledCheckbox/LabeledCheckbox'
import { APP_SYMBOLS } from '../../types/AppSymbols'
import * as Theme from './Theme'
import { withTheme } from 'styled-components';

export interface ContactsFiltersProps {
  handlers: {
    onBooleanFilterChange: (key: string, state: boolean) => void;
  },
  theme?: Theme.ThemeProps
}

const ContactsFilters: React.SFC<ContactsFiltersProps> = (props) => {

  const styles: any = {
    LCheckbox: {
      marginRight: 24,
    },
    line: {
      display: 'table-cell',
      position: 'relative',
    },
    displaySpan: {
      fontSize: 14,
      color: props.theme.genericTextColors.textColorPale,
      marginRight: 24,
      marginLeft: 32,
      paddingBottom: 3
    }
  };

  const appSymbolsTheme = props.theme.appSymbols;

  return (
    <ToolbarGroup>
      <span style={styles.displaySpan}>Display:</span>
      <LCheckbox
        caption={APP_SYMBOLS.whatsapp.caption}
        iconName="whatsapp"
        labelColor={appSymbolsTheme.colors.whatsapp}
        style={styles.LCheckbox}
        filter={APP_SYMBOLS.whatsapp.key}
        onChange={props.handlers.onBooleanFilterChange}
        theme={props.theme}
      />
      <LCheckbox
        caption={APP_SYMBOLS.skype.caption}
        iconName="skype"
        labelColor={appSymbolsTheme.colors.skype}
        style={styles.LCheckbox}
        filter={APP_SYMBOLS.skype.key}
        onChange={props.handlers.onBooleanFilterChange}
        theme={props.theme}
      />
      <LCheckbox
        caption={APP_SYMBOLS.telegram.caption}
        iconName="telegram"
        labelColor={appSymbolsTheme.colors.telegram}
        style={styles.LCheckbox}
        filter={APP_SYMBOLS.telegram.key}
        onChange={props.handlers.onBooleanFilterChange}
        theme={props.theme}
      />
      <LCheckbox
        caption={APP_SYMBOLS.viber.caption}
        iconName="viber"
        labelColor={appSymbolsTheme.colors.viber}
        style={styles.LCheckbox}
        filter={APP_SYMBOLS.viber.key}
        onChange={props.handlers.onBooleanFilterChange}
        theme={props.theme}
      />
      <LCheckbox
        caption={APP_SYMBOLS.linkedin.caption}
        iconName="linkedin"
        labelColor={appSymbolsTheme.colors.linkedin}
        style={styles.LCheckbox}
        filter={APP_SYMBOLS.linkedin.key}
        onChange={props.handlers.onBooleanFilterChange}
        theme={props.theme}
      />
      <LCheckbox
        caption={APP_SYMBOLS.sms.caption}
        iconName="sms"
        labelColor={appSymbolsTheme.colors.sms}
        style={styles.LCheckbox}
        filter={APP_SYMBOLS.sms.key}
        onChange={props.handlers.onBooleanFilterChange}
        theme={props.theme}
      />
      <LCheckbox
        caption={APP_SYMBOLS.line.caption}
        iconName="notebook"
        labelColor={appSymbolsTheme.colors.line}
        style={styles.LCheckbox}
        filter={APP_SYMBOLS.line.key}
        onChange={props.handlers.onBooleanFilterChange}
        theme={props.theme}
      />
      <LCheckbox
        caption={APP_SYMBOLS.hangouts.caption}
        iconName="notebook"
        labelColor={appSymbolsTheme.colors.hangouts}
        style={styles.LCheckbox}
        filter={APP_SYMBOLS.hangouts.key}
        onChange={props.handlers.onBooleanFilterChange}
        theme={props.theme}
      />
    </ToolbarGroup>
  )
};

export default withTheme(ContactsFilters)
