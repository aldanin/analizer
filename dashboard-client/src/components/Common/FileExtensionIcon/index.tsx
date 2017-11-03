import * as React from 'react'
import AppIcon from '../AppIcon/'
import { APP_SYMBOLS } from '../../../types/AppSymbols'
import * as Theme from './Theme'
import styled from 'styled-components'

export interface FileExtensionIconProps {
  extension: string;
  withCaption?: boolean;
  theme: Theme.ThemeProps
}

const Caption = styled.span`
  font-size: 1.2rem;
  float: right;
  line-height: 1.8rem;
`;

const iconWithCaptionStyle = {
  fontSize: '1.7rem',
  paddingRight: 5,
  marginRight: 0,
  top: 0,
}

const iconWithoutCaptionStyle = {
  fontSize: '1.7rem',
  marginRight: 0,
}

const getIcon = (withCaption: boolean, extension: string, theme: Theme.ThemeProps) => {
  let appSymbol;
  let caption;

  switch (extension) {
    case 'txt':
      appSymbol = APP_SYMBOLS.txt;
      caption = 'Text Document';
      break;
    case 'doc':
      appSymbol = APP_SYMBOLS.word;
      caption = 'Microsoft Word Document';
      break;
    case 'pdf':
      appSymbol = APP_SYMBOLS.pdf;
      caption = 'Adobe PDF Document';

      break;
    case 'wav':
    case 'mp3':
      appSymbol = APP_SYMBOLS.sound;
      caption = `${extension.toUpperCase()} file`;
      break;
    case 'jpg':
    case 'jpeg':
    case 'bmp':
      appSymbol = APP_SYMBOLS.pic;
      caption = `${extension.toUpperCase()} file`;
      break;
    default:
      caption = `${extension.toUpperCase()} file`;
      break;
  }
  return (
    <span style={{display : 'inline-block'}}>
       <AppIcon
         appSymbol={appSymbol}
         theme={theme.appSymbols}
         style={withCaption
          ? iconWithCaptionStyle
          : iconWithoutCaptionStyle}
       />
      {withCaption ? <Caption>{caption}</Caption> : <span/>}
    </span>
  );
};

const FileExtensionIcon: React.SFC<FileExtensionIconProps> = (props) => {
  return props.extension
    ? getIcon(props.withCaption, props.extension, props.theme)
    : <span/>;
};

export default FileExtensionIcon;

FileExtensionIcon.defaultProps = {withCaption: false};
