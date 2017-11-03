import * as React from 'react'
import { CellRendererParams } from 'react-virtualized';
import { TagData, TagId } from '../../../../types/Tag'
import TagsList from '../../../Common/TagsList/index';

const getTags = (accountId: number, tags: TagData[], removeTag: Function) => {
  const tagElements = (
   <TagsList
     tags={tags}
     numberOfTagsToShow={2}
     callback={(tagId: TagId) => {removeTag(accountId, tagId)}}
   />
  );
  return tagElements;
};

const TagsRenderer: React.SFC<CellRendererParams> = (props) => {
  const renderer = ({
    columnData,
    cellData,
    rowData,
    dataKey,
    rowIndex
  }: CellRendererParams): any => {
    const {removeTag} = columnData;

    return cellData
      ? getTags(rowData.id, rowData.tags, removeTag)
      : null;
  };

  return (
    renderer(props)
  )
};

export default TagsRenderer
