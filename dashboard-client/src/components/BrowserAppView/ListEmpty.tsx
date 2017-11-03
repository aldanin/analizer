import * as React from 'react'
import { EmptyItem, Empty, Space, Url } from './bookmarkStyle';

export interface ListEmptyProps {
  level: number;
}

const ListEmpty: React.SFC<ListEmptyProps> = ({ level }) => {
  return (
    <EmptyItem>
      <Space level={level}/>
      <Url>
        <Empty level={level}>
          Empty files
        </Empty>
      </Url>
    </EmptyItem>
  )
}

export default ListEmpty
