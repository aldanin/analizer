import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import CallsDetailsPane, { CallDetailsPaneProps } from './CallsDetailsPane';
import * as Calls from '../../types/Calls'
import * as Prod from '../../types/Product'
import * as Tag from '../../types/Tag'
import * as Theme from './Theme'

it('renders without crashing', () => {
  const div = document.createElement('div');
  const props: CallDetailsPaneProps = {
    callData: Calls.defaultCallData,

    handlers: {
      setFavorite: (fileId: Prod.ProductID, isFavorite: boolean) => null,
      addTags: (itemId: Prod.ProductID, tags: Tag.TagData[]) => null,
      openNotebook: (itemId: Prod.ProductID) => null,
      askForTranslate: (itemId: Prod.ProductID) => null,
      getTranscription: (itemId: Prod.ProductID) => null,
      addToNotebook: (itemId: Prod.ProductID) => null,
      markAsRead: (itemId: Prod.ProductID, isRead: boolean) => null,
    },
    parentSize: {
      width: 1000
    },
    theme: Theme.DEFAULT_THEME
  }

  ReactDOM.render(
    <MuiThemeProvider>
      <ThemeProvider theme={Theme.DEFAULT_THEME}>
        <CallsDetailsPane {...props}/>
      </ThemeProvider>
    </MuiThemeProvider>,
    div);
});
