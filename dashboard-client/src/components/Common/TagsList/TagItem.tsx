import * as React from 'react'
import styled from 'styled-components';
import { TagData } from '../../../types/Tag';
import { TagThemeProps, DEFAULT_THEME } from './Theme';
import { ThemeProvider } from 'styled-components';

export interface TagItemProps {
  tag: TagData;
  callback: Function;
  theme?: TagThemeProps;
}

const Tag = styled.span`
  color: ${prop => prop.theme.textColor};
  background-color: ${prop => prop.theme.backgroundColor};
  border: 1px solid ${prop => prop.theme.borderColor};
  border-radius: 15px;
  display: inline-block;
  margin: 5px;
`;

const RightSpace = styled.span`
  margin-left: 5px;
`;

const MiddleSpace = styled.span`
  margin-right: 5px;
`;

const LeftSpace = styled.span`
  margin-right: 5px;
  cursor: pointer;
`;

const TagItem: React.SFC<TagItemProps> = ({ tag, callback, theme }) => {
  return (
    <ThemeProvider theme={theme}>
    <Tag>
      <RightSpace>{tag}</RightSpace>
      <MiddleSpace/>
      <LeftSpace onClick={() => {callback(tag)}}> &times; </LeftSpace>
    </Tag>
    </ThemeProvider>
  )
}

TagItem.defaultProps = {
  theme: DEFAULT_THEME,
}

export default TagItem
