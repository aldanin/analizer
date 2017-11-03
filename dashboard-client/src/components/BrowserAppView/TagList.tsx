import * as React from 'react'
import { TagData, TagId } from '../../types/Tag';
import { ThemeProps } from './Theme';
import styled, { withTheme } from 'styled-components';
import { browserTreeObjectId } from '../../types/Browser';
import TagsList from '../Common/TagsList/index';

const TagsContainer = styled.div`
  position: relative;
  top: 3px;
  font-size: 85%;
`;

export interface TagListProps {
  itemId: browserTreeObjectId;
  tags: TagData[];
  removeTag: (id: browserTreeObjectId, tag: TagId) => void;
  theme?: ThemeProps
}

const TagList: React.SFC<TagListProps> = ({ itemId, tags, removeTag, theme }) => {
  return (
    <TagsContainer>
      <TagsList
        tags={tags}
        callback={(tagId: TagId) => {removeTag(itemId, tagId)}}
        numberOfTagsToShow={2}
      />
    </TagsContainer>
  )
}

export default withTheme(TagList)
