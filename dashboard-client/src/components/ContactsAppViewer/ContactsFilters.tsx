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

  const lcheckboxTheme = {checkbox: props.theme.checkbox};
  const appSymbolsTheme = props.theme.appSymbols;

  return (
    <ToolbarGroup>
      <span style={styles.displaySpan}>Display:</span>
      <LCheckbox
        caption={APP_SYMBOLS.phone.caption}
        iconName="phone"
        labelColor={appSymbolsTheme.colors.phone}
        style={styles.LCheckbox}
        filter={APP_SYMBOLS.phone.key}
        onChange={props.handlers.onBooleanFilterChange}
        theme={lcheckboxTheme}
      />
      <LCheckbox
        caption={APP_SYMBOLS.whatsapp.caption}
        iconName="whatsapp"
        labelColor={appSymbolsTheme.colors.whatsapp}
        style={styles.LCheckbox}
        filter={APP_SYMBOLS.whatsapp.key}
        onChange={props.handlers.onBooleanFilterChange}
        theme={lcheckboxTheme}
      />
      <LCheckbox
        caption={APP_SYMBOLS.skype.caption}
        iconName="skype"
        labelColor={appSymbolsTheme.colors.skype}
        style={styles.LCheckbox}
        filter={APP_SYMBOLS.skype.key}
        onChange={props.handlers.onBooleanFilterChange}
        theme={lcheckboxTheme}
      />
      <LCheckbox
        caption={APP_SYMBOLS.mail.caption}
        iconName="mail"
        labelColor={appSymbolsTheme.colors.mail}
        style={styles.LCheckbox}
        filter={APP_SYMBOLS.mail.key}
        onChange={props.handlers.onBooleanFilterChange}
        theme={lcheckboxTheme}
      />
      <LCheckbox
        caption={APP_SYMBOLS.facebook.caption}
        iconName="facebook_messenger"
        labelColor={appSymbolsTheme.colors.facebook}
        style={styles.LCheckbox}
        filter={APP_SYMBOLS.facebook_messenger.key}
        onChange={props.handlers.onBooleanFilterChange}
        theme={lcheckboxTheme}
      />
      <LCheckbox
        caption={APP_SYMBOLS.line.caption}
        iconName="notebook"
        labelColor={appSymbolsTheme.colors.line}
        style={styles.LCheckbox}
        filter={APP_SYMBOLS.line.key}
        onChange={props.handlers.onBooleanFilterChange}
        theme={lcheckboxTheme}
      />
      <LCheckbox
        caption={APP_SYMBOLS.hangouts.caption}
        iconName="notebook"
        labelColor={appSymbolsTheme.colors.hangouts}
        style={styles.LCheckbox}
        filter={APP_SYMBOLS.hangouts.key}
        onChange={props.handlers.onBooleanFilterChange}
        theme={lcheckboxTheme}
      />
    </ToolbarGroup>
  )
};

export default withTheme(ContactsFilters)
