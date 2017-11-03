import * as React from 'react'
import { AutoSizer } from 'react-virtualized/dist/commonjs/AutoSizer'
import { InfiniteLoader } from 'react-virtualized/dist/commonjs/InfiniteLoader'
import { List } from 'react-virtualized/dist/commonjs/List'
import * as Immutable from 'immutable'

export interface InfinitePagerProps<T> {
  // Are there more items to load? (This information comes from the most recent API request.)
  hasNextPage: boolean,
  // Are we currently loading a page of items? (This may be an in-flight flag in your Redux store for example.)
  isNextPageLoading: boolean,
  // List of items loaded so far
  list: Immutable.List<T>,
  // Render a single list row, for params see
  // https://github.com/bvaughn/react-virtualized/blob/master/docs/List.md#rowrenderer
  rowRenderer: (data: T, key: string, style: object) => JSX.Element,
  // Render the loading indicator element
  loaderRenderer: (key: string, style: object) => JSX.Element,
  // Callback function (eg. Redux action-creator) responsible for loading the next page of items
  loadNextPage: () => void,
  // Callback function (startIndex, stopIndex) when a slice of items is rendered
  // this allows us to mark some elements as "read" automagically
  onSliceRendered: (startIndex: number, stopIndex: number) => void,
  // Height of the entire list
  listHeight?: number,
  // Height of a single row
  rowHeight?: number,
}

const InfinitePager: React.SFC<InfinitePagerProps<any>> = ({
  hasNextPage,
  isNextPageLoading,
  list,
  rowRenderer,
  loaderRenderer,
  loadNextPage,
  onSliceRendered,
  listHeight,
  rowHeight,
}) => {
  // If there are more items to be loaded then add an extra row to hold a loading indicator.
  const rowCount = hasNextPage
    ? list.size + 1
    : list.size

  // Only load 1 page of items at a time.
  // Pass an empty callback to InfiniteLoader in case it asks us to load more than once.
  const loadMoreRows = isNextPageLoading
  // tslint:disable-next-line:no-empty
    ? () => {}
    : loadNextPage

  // Every row is loaded except for our loading indicator row.
  const isRowLoaded = ({ index }) => !hasNextPage || index < list.size

  // Render a list item or a loading indicator.
  const renderRow = ({ index, key, style }) => (
    isRowLoaded({ index }) ? rowRenderer(list.get(index), key, style) : loaderRenderer(key, style)
  )

  const getListComponent = ({ onRowsRendered, registerChild }) => {
    const myOnRowsRendered = (args) => {
      const { startIndex, stopIndex } = args
      onSliceRendered(startIndex, stopIndex)
      onRowsRendered(args)
    }
    return (
      <AutoSizer disableHeight={true}>
        {({ width }) => (
          <List
            ref={registerChild}
            onRowsRendered={myOnRowsRendered}
            rowRenderer={renderRow}
            height={listHeight}
            rowCount={rowCount}
            rowHeight={rowHeight}
            width={width}
          />
        )}
      </AutoSizer>
    )
  }

  return (
    <InfiniteLoader
      isRowLoaded={isRowLoaded}
      loadMoreRows={loadMoreRows}
      rowCount={rowCount}
      threshold={1}
    >
      {getListComponent}
    </InfiniteLoader>
  )
}

InfinitePager.defaultProps = {
  listHeight: 200,
  rowHeight: 30,
}

export default InfinitePager
