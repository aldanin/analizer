import * as React from 'react';
import * as ReactDOM from 'react-dom';
import TreeNodeCon from './index';
import { TreeNodeProps } from './index';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import * as injectTapEventPlugin from 'react-tap-event-plugin';
import { DEFAULT_THEME } from './Theme';
import { ThemeProvider } from 'styled-components';
import FontIcon from 'material-ui/FontIcon';
import * as Prod from '../../../types/Product';
import * as Tag from '../../../types/Tag'

injectTapEventPlugin();

it('renders without crashing', () => {
  const div = document.createElement('div');
  const icon = (
    <FontIcon
      className="base_icons icon_folder_opened"
      style={{fontSize: '120%', color: 'green'}}
      onClick={() => null}
    />
  );
  const props: TreeNodeProps = {
    level: 1,
    id: 'ID',
    icon: icon,
    name: 'Title',
    isExpandable: true,
    isSelected: false,
    tags: [],
    handlers: {
      nodeClick: () => null,
      onItemCheck: (isChecked: boolean) => null,
      toggleExpandState: () => null,
      // isOpen: (id: 'test') => {
      //   return true
      // },
      setFavourite: () => null,
      removeTag: (itemId: Prod.ProductID, tagId: Tag.TagId) => null,
      addTags: (itemId: Prod.ProductID, tags: Tag.TagData[]) => null,
      addToNotebook: (itemId: Prod.ProductID) => null,
      openNotebook: (itemId: Prod.ProductID) => null,
      askForTranslate: (itemId: Prod.ProductID) => null,
      askForTranscript: (itemId: Prod.ProductID) => null,
      getTranscription: (itemId: Prod.ProductID) => null,
      markAsRead: (itemId: Prod.ProductID, isRead: boolean) => null,
      exportItem: (itemId: Prod.ProductID) => null,
    },
    theme: DEFAULT_THEME,
    status: {
      isFavorite: false,
      hasTranslation: false,
      isRead: false,
      hasTranscript: false,
    },
    isExpanded: false,
  }

  ReactDOM.render(
    <MuiThemeProvider>
      <ThemeProvider theme={DEFAULT_THEME}>
        <TreeNodeCon {...props}/>
      </ThemeProvider>
    </MuiThemeProvider>,
    div);
});
