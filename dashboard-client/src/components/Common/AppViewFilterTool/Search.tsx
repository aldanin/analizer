import * as React from 'react';
import { SearchFilter, SearchInput } from './Style';
import * as Theme from './Theme';
import FontIcon from 'material-ui/FontIcon'
import { withTheme } from 'styled-components';

export interface EventKeyBoard {
  key: string;
}

export interface ToolbarSearchProps {
  keyword?: string;
  setKeyword?: (keyword: string) => void;
  resetSearchResult?: () => void;
  resultsCounter?: number;
  theme?: Theme.ThemeProps;
}

export interface ToolbarSearchState {
  value: string;
}

const styles = {
  icon: {
  }
}

class ToolbarSearch extends React.Component<ToolbarSearchProps, ToolbarSearchState> {
  static defaultProps: Partial<ToolbarSearchProps> = {
    theme: Theme.DEFAULT_THEME,
    resultsCounter: -1,
    setKeyword: () => null,
    resetSearchResult: () => null,
    keyword: '',
  }

  constructor(props: ToolbarSearchProps) {
    super(props);
    this.state = {
      value: this.props.keyword,
    }
  }

  handleChange(target: HTMLInputElement) {
    this.setState({value: target.value});
    if (this.props.keyword !== '') {
      this.props.resetSearchResult();
      this.props.setKeyword('');
    }
  }

  handleKeyPressing(event: EventKeyBoard, target: HTMLInputElement) {
    if (event.key === 'Enter') {
      this.executeSearch((target) as HTMLInputElement);
    }
  }

  executeSearch(target: HTMLInputElement) {
    target.blur();
    this.props.setKeyword(this.state.value);
  }

  render() {
    styles.icon = {
      color: this.props.theme.searchIconColor,
      borderBottom: '1px solid ' + this.props.theme.searchBorder,
      position: 'relative',
      top: '7px',
      cursor: 'pointer',
      fontSize: '100%',
    }

    return (
      <SearchFilter>
        <SearchInput
          value={this.state.value}
          borderColor={this.props.theme.searchBorder}
          focusColor={this.props.theme.searchFocusColor}
          backgroundColor={this.state.value !== '' && this.state.value !== ' ' && this.state.value !== null
            && this.state.value !== undefined && this.props.resultsCounter === 0 ? 'bisque' : 'transparent'}
          type="text"
          onChange={(event) => {this.handleChange((event.target) as HTMLInputElement)}}
          onKeyPress={(event) => {this.handleKeyPressing(event, (event.target) as HTMLInputElement)}}
        />
        <FontIcon
          className="base_icons icon_search"
          style={styles.icon}
          onClick={(event) => {this.executeSearch((event.target) as HTMLInputElement)}}
        />
      </SearchFilter>
    );
  }

}

export default withTheme(ToolbarSearch);
