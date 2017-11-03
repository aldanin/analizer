import * as React from 'react';
import * as ReactDOM from 'react-dom';

import SearchMarker, { renderMarkerString } from './';
import { SearchMarkerProps } from './';
import KeywordProvider, { KeywordProviderProps } from './KeywordProvider';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const props: SearchMarkerProps = {
  }
  const keywordProps: KeywordProviderProps = {
    keyword: 'looking for',
    onSearchResult: () => null,
  }

  ReactDOM.render(<KeywordProvider {...keywordProps}><SearchMarker {...props}>x</SearchMarker></KeywordProvider>, div);
})

it('renders successfully with markers', () => {
  const div = document.createElement('div');
  const props: SearchMarkerProps = {
  }
  const keywordProps: KeywordProviderProps = {
    keyword: 'looking for',
    onSearchResult: () => null,
  }

  ReactDOM.render(
    <KeywordProvider {...keywordProps} keyword="ab">
      <SearchMarker {...props}>
        ABfaBgAbab
      </SearchMarker>
    </KeywordProvider>,
    div)

  expect(div.querySelectorAll('._marker').length).toEqual(4)
})

it('it should split the text and push marker string for keyword', () => {
  const str = 'ABfaBgAbab'
  const keyword = 'aB'
  /* tslint:disable:jsx-key */
  const result = [
    '',
    <span className="_marker">AB</span>,
    'f',
    <span className="_marker">aB</span>,
    'g',
    <span className="_marker">Ab</span>,
    '',
    <span className="_marker">ab</span>,
    ''
  ];
  /* tslint:enable:jsx-key */

  expect(renderMarkerString(str, keyword, [0]).toString()).toEqual(result.toString());
})

it('it should handle error when keyword equal to empty string', () => {
  const str = 'ABfaBgAbab'
  const keyword = ''
  const result = 'ABfaBgAbab';

  expect(renderMarkerString(str, keyword, [0]).toString()).toEqual(result.toString());
})

it('it should handle error when keyword equal to space empty string', () => {
  const str = 'ABfaBgAbab'
  const keyword = ' '
  const result = 'ABfaBgAbab';

  expect(renderMarkerString(str, keyword, [0]).toString()).toEqual(result.toString());
})

it('it should handle error when keyword is null', () => {
  const str = 'ABfaBgAbab'
  const keyword = null
  const result = 'ABfaBgAbab';

  expect(renderMarkerString(str, keyword, [0]).toString()).toEqual(result.toString());
})

it('it should handle error when keyword is undefined', () => {
  const str = 'ABfaBgAbab'
  const keyword = undefined;
  const result = 'ABfaBgAbab';

  expect(renderMarkerString(str, keyword, [0]).toString()).toEqual(result.toString());
})
