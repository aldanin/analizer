import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import DirectoryDetailsPane from './DirectoryDetailsPane';
import { DirectoryDetailsPaneProps } from './DirectoryDetailsPane';
import * as Dir from '../../types/Directory'
import * as Prod from '../../types/Product'
import * as Tag from '../../types/Tag'
import * as Theme from './Theme'

it('renders without crashing', () => {
  const div = document.createElement('div');
  const props: DirectoryDetailsPaneProps = {
    directory: Dir.defaultFileItem,

    handlers: {
      setFavourite: (directoryId: Dir.DirectoryId, isFavorite: boolean) => null,
      addTags: (itemIds: Prod.ProductID[], tags: Tag.TagData[]) => null,
      askForTranslate: () => null,
      getTranslate: () => null
    },
    showControls: false,
    parentSize: {
      width: 1000
    },
    theme: Theme.DEFAULT_THEME
  }

  ReactDOM.render(
    <MuiThemeProvider>
      <ThemeProvider theme={Theme.DEFAULT_THEME}>
        <DirectoryDetailsPane {...props}/>
      </ThemeProvider>
    </MuiThemeProvider>,
    div);
});
