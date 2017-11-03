import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { getData } from '../../mockData/Contacts'
import * as Theme from './Theme'
import ContactDetailsPane from './ContactDetailsPane';
import { ContactDetailsProps } from './ContactDetailsPane';
import * as Prod from '../../types/Product'
import * as Tag from '../../types/Tag'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { ThemeProvider } from 'styled-components'

import * as injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

it('renders without crashing', () => {
  const div = document.createElement('div');
  const props: ContactDetailsProps = {
    contact: getData(null, 1, 10, undefined)[0],
    handlers: {
      addTags: (itemId: Prod.ProductID, tags: Tag.TagData[]) => null,
      setFavorite: (itemId: Prod.ProductID, isFavorite: boolean) => null,
      markAsRead: (itemId: Prod.ProductID, isRead: boolean) => null,
      addToNotebook: (itemId: Prod.ProductID) => null,
      askForTranslate: (itemId: Prod.ProductID) => null,
      askForTranscript: (itemId: Prod.ProductID) => null,
      getTranslate: (itemId: Prod.ProductID) => null,
      getTranscript: (itemId: Prod.ProductID) => null,
      openNotebook: () => null,
      exportItem: (itemId: Prod.ProductID) => null,
      onStatisticsTimespanChange: (value: number) => null,
    },
    width: 470,
    theme: Theme.DEFAULT_THEME
  }

  ReactDOM.render(
    <MuiThemeProvider>
      <ThemeProvider theme={Theme.DEFAULT_THEME}>
        <ContactDetailsPane {...props}/>
      </ThemeProvider>
    </MuiThemeProvider>,
    div);
});
