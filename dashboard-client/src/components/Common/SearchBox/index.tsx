import * as React from 'react'
import styled from 'styled-components';
import { ThemeProvider } from 'styled-components';
import * as Theme from './Theme';
import FontIcon from 'material-ui/FontIcon'

const Wrapper = styled.div`
  position: relative;
`;

const TextBox = styled.input`
  outline: none;
  border: solid 1px ${props => props.theme.borderColor};
  padding: 5px;
  font-size: 1.2rem;
  width: 100%;
  position: relative;
  right: 5px;
  
  ::-webkit-input-placeholder {
      font-style: italic;
  }
`;

export interface SearchBoxProps extends React.Props<SearchBox> {
  onChange: (text: string) => void;
  placeholder?: string;
  theme?: Theme.ThemeProps;
}

export interface SearchBoxState {
  activeIndex: number;
}

class SearchBox extends React.Component<SearchBoxProps, SearchBoxState> {
  static defaultProps: Partial<SearchBoxProps> = {
    theme: Theme.DEFAULT_THEME,
  }

  constructor(props: SearchBoxProps) {
    super(props)
  }

  onTextChange = (event) => {
    event.preventDefault();

    this.props.onChange(event.target.value);
  };

  render() {
    const iconStyle = {
      position: 'absolute',
      color: this.props.theme.iconColor,
      right: -1,
      top: 5,
      fontSize: '1.8rem'
    };

    return (
      <ThemeProvider theme={this.props.theme}>
        <Wrapper>
          <TextBox type="text" onChange={this.onTextChange} placeholder={this.props.placeholder}/>
          <FontIcon className="base_icons icon_search" style={iconStyle}/>
        </Wrapper>
      </ThemeProvider>
    )
  }
}

SearchBox.defaultProps = {
  placeholder: 'search'
};

export default SearchBox;
