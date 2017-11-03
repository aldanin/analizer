import * as React from 'react'
import styled from 'styled-components';
import { TagData } from '../../../types/Tag';
import { TagThemeProps, DEFAULT_THEME } from './Theme';
import { ThemeProvider } from 'styled-components';

export interface TagItemProps {
  tag: TagData;
  removeTagCallback: Function;
  theme?: TagThemeProps;
}

const Tag = styled.span`
  color: ${prop => prop.theme.textColor};
  background-color: ${prop => prop.theme.backgroundColor};
  border: 1px solid ${prop => prop.theme.borderColor};
  border-radius: 10em;
  margin: 0 0.5em 0.5em 0;
`;

const RightSpace = styled.span`
  padding: 0 0 0 0.3em;
`;

const LeftSpace = styled.span`
  cursor: pointer;
  padding: 0 0.3em 0 0;
`;

const TagItem: React.SFC<TagItemProps> = ({ tag, removeTagCallback, theme }) => {
  return (
    <ThemeProvider theme={theme}>
    <Tag>
      <RightSpace>{tag}</RightSpace>
      <LeftSpace onClick={() => {removeTagCallback(tag)}}> &times; </LeftSpace>
    </Tag>
    </ThemeProvider>
  )
}

TagItem.defaultProps = {
  theme: DEFAULT_THEME,
}

export default TagItem
