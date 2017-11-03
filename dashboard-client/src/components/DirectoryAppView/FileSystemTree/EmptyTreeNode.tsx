import * as React from 'react'
import { EmptyItem, Empty, Space, EmptyMessageWrap } from '../DirectoryStyle';

export interface EmptyTreeNodeProps {
  level: number;
}

const EmptyTreeNode: React.SFC<EmptyTreeNodeProps> = ({ level }) => {
  return (
    <EmptyItem>
      <Space level={level} isExpandable={false}/>
      <EmptyMessageWrap>
        <Empty level={level}>
          Empty
        </Empty>
      </EmptyMessageWrap>
    </EmptyItem>
  )
}

export default EmptyTreeNode
