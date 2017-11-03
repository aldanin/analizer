import * as React from 'react';
import * as ReactDOM from 'react-dom';
import FileExtensionIcon from './'
import { FileExtensionIconProps } from './'
import { defaultTheme } from './Theme'

it('renders without crashing', () => {
  const div = document.createElement('div');
  const props: FileExtensionIconProps = {
    extension: 'exe',
    withCaption: false,
    theme: {
      appSymbols: defaultTheme
    }
  }

  ReactDOM.render(<FileExtensionIcon {...props}/>, div);
});
