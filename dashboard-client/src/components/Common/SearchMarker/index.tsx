import * as React from 'react'
import { PropTypes } from 'prop-types';
import styled from 'styled-components';

const SearchResult = styled.span`
  ._marker {
    background-color: lightgoldenrodyellow;
    border-top: 5px solid lightgoldenrodyellow;
    border-bottom: 5px solid lightgoldenrodyellow;
  }
`;
export interface SearchContext {
  keyword: string;
  onSearchResult: (results: number) => void;
}

export interface SearchMarkerProps {
}

export interface SearchMarkerState {
}

class SearchMarker extends React.Component <SearchMarkerProps, SearchMarkerState> {
  static contextTypes = {
    keyword: PropTypes.string,
    onSearchResult: PropTypes.func,
  }

  static instanceCounter = 0

  counter: number[];
  isReported: boolean;

  constructor(props: SearchMarkerProps) {
    super(props)

    this.counter = [];
    this.counter.push(0)
    this.isReported = false;
    this.state = {
    }

  }

  componentWillReceiveProps(nextProps: SearchMarkerProps, nextContext: SearchContext) {
    if (nextContext.keyword !== this.context.keyword) {this.isReported = false}
    this.counter = [0];
  }

  render() {
    const result = renderMarkerString(this.props.children.toString(), this.context.keyword, this.counter)
    {if (this.counter[0] > 0 && !this.isReported) {
      this.context.onSearchResult(this.counter[0])
      this.isReported = true;
    }}
    return <SearchResult>{result.map((item) => {return item})}</SearchResult>
  }
}

export default SearchMarker;

export function renderMarkerString(str: string, keyword: string, counter: number[]): string[] {
  if (keyword === ' ' || keyword === '' || keyword === null || keyword === undefined) {return [str]}
  let keywordLength = keyword.length;

  let lowerCaseStr = str.toLowerCase();
  let lowerCaseKeyword = keyword.toLowerCase();
  let lowerCaseSplitArray = lowerCaseStr.split(lowerCaseKeyword);

  let resultArray = [];
  let strPointer = 0;

  lowerCaseSplitArray.map((item, idx) => {
    let itemLength = item.length;
    resultArray.push(str.substring(strPointer, strPointer + itemLength));
    strPointer += itemLength;
    if (idx < resultArray.length && strPointer < str.length) {
      resultArray.push(
        <span key={idx} className="_marker">
            {str.substring(strPointer, strPointer + keywordLength)}
          </span>
      )
      counter[0] = counter[0] + 1;
      strPointer += keywordLength;
    }
  })
  return resultArray;
}
