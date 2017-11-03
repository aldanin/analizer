import * as React from 'react'
import { PropTypes } from 'prop-types';

export interface KeywordProviderProps {
  keyword: string;
  onSearchResult?: (results: number) => void;
}

export interface KeywordProviderState {
}

class KeywordProvider extends React.Component <KeywordProviderProps, KeywordProviderState> {
  static childContextTypes = {
    keyword: PropTypes.string,
    onSearchResult: PropTypes.func,
  }
  static defaultProps: Partial<KeywordProviderProps> = {
    keyword: '',
    onSearchResult: () => null,
  }

  resultsCounter: number;

  constructor(props: KeywordProviderProps) {
    super(props)

    this.resultsCounter = 0;
  }

  componentWillReceiveProps(nextProps: KeywordProviderProps) {
    if (nextProps.keyword !== this.props.keyword) {
      this.resultsCounter = 0;
      this.props.onSearchResult(0);
    }
  }

  updateCounter = () => {
    this.props.onSearchResult(this.resultsCounter);
  };

  getChildContext() {
    return {
      keyword: this.props.keyword,
      onSearchResult: (results: number) => {
        this.updateCounter();
        this.resultsCounter += results
      },
    }
  }

  render() {
    if (!this.props.children) {
      return null
    }
    return React.Children.only(this.props.children)
  }
}

export default KeywordProvider;
