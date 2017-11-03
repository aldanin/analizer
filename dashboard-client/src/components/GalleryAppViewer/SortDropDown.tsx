import * as React from 'react';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import styled, { ThemeProvider } from 'styled-components';
import { DEFAULT_THEME, ThemeProps } from './Theme';

export interface GallerySortDropDownProps {
  sort: Function;
  filter: string;
  theme?: ThemeProps;
}

export interface GallerySortDropDownState {
  value: string;
}

const Title = styled.span`
  color: ${prop => prop.theme.defaultColors.textColor};
  margin-right: 5px;
  font-size: 80%;
`;

const SortDownSpan = styled.span`
  position: relative;
  top: -7px;
  display: flex;
`;

const Bracket = styled.span`
  color: ${prop => prop.theme.filter.sortText};
  font-size: 75%;
`;

const Span = styled.span`
  color: ${prop => prop.theme.filter.sortText};
  position: relative;
  left: 10%;
  display: table-cell;
  vertical-align: middle;
  font-size: 60%;
  text-indent: 3%;
  width: 30%;
`;

const styles = {
  toolbar: {
    display: 'table',
    width: '100%',
  },

  hint: {
    display: 'table-cell',
    position: 'relative',
    left: '-5%',
    fontSize: '80%',
    height: '42px',
  },
}

export default class GallerySortDropDown extends React.Component<GallerySortDropDownProps, GallerySortDropDownState> {
  static defaultProps: Partial<GallerySortDropDownProps> = {
    theme: DEFAULT_THEME,
    filter: 'DateAsc',
  }

  constructor(props: GallerySortDropDownProps) {
    super(props);
    this.state = {value: this.props.filter};
  }

  handleChange = (event, index, value) => {
    this.setState({value});
    this.props.sort(value);
  };

  render() {
    return (
      <ThemeProvider theme={this.props.theme}>
        <div style={styles.toolbar}>
          <Span>Sort by:</Span>
          <span className="gallery-widget-sort-drop-down">
            <SortDownSpan>
              <DropDownMenu
                maxHeight={300}
                value={this.state.value}
                onChange={this.handleChange}
                style={styles.hint}
                iconStyle={{fill: this.props.theme.filter.dropDownArrowColor, right: '4px'}}
              >
                <MenuItem
                  value={'DateAsc'}
                  key={0}
                  primaryText={<div><Title>Date</Title><Bracket>(newer first)</Bracket></div>}
                />
                <MenuItem
                  value={'DateDes'}
                  key={1}
                  primaryText={<div><Title>Date</Title><Bracket>(older first)</Bracket></div>}
                />
                <MenuItem
                  value={'NameAsc'}
                  key={2}
                  primaryText={<div><Title>Name</Title><Bracket>(A-Z)</Bracket></div>}
                />
                <MenuItem
                  value={'NameDes'}
                  key={3}
                  primaryText={<div><Title>Name</Title><Bracket>(Z-A)</Bracket></div>}
                />
                <MenuItem
                  value={'SizeAsc'}
                  key={4}
                  primaryText={<div><Title>Size</Title><Bracket>(larger first)</Bracket></div>}
                />
                <MenuItem
                  value={'SizeDes'}
                  key={5}
                  primaryText={<div><Title>Size</Title><Bracket>(smaller first)</Bracket></div>}
                />
              </DropDownMenu>
            </SortDownSpan>
          </span>
        </div>
      </ThemeProvider>
    );
  }
}
