import * as React from 'react'
import { TagData, TagId } from '../../../../types/Tag'
import styled from 'styled-components'
import * as Theme from '../../Theme'
import TagsList from '../../../Common/TagsList/index';

export interface TagsWrapperProps {
  tags: TagData[],
  removeTag: (tagId: TagId) => void;
  borderColor?: string;
  theme: Theme.ThemeProps;
}

const TagsWrapper: React.SFC<TagsWrapperProps> = (props) => {

  const TagFooter = styled.div`
    border-top: solid 1px ${props.borderColor || props.theme.seperationBorderPale};
    overflow: hidden;
    margin-top: 10px;
`;

  const TagsDiv = styled.div`
    float: left;
    overflow: hidden;
    padding: 5px 0;
`;

  const element = props.tags && props.tags.length > 0
    ? (
      <TagFooter>
        <TagsDiv>
          <TagsList
            tags={props.tags}
            callback={(tagId: TagId) => {
              props.removeTag(tagId)
            }}
          />
        </TagsDiv>
      </TagFooter>
    )
    : <div/>

  return element
}

export default TagsWrapper
