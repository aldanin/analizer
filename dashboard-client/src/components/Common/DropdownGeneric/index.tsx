import * as React from 'react';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import { ThemeProps } from './Theme';
import styled, { withTheme } from 'styled-components';
import KnownIcon from '../KnownIcons'
import { AppSymbol } from '../../../types/AppSymbols'
const _ = require('lodash');

export interface DropDownGenericProps {
  values: (string | DropdownValueProps)[]
  caption: string;
  selectCallback: (value: number) => void;
  style?: any;
  theme?: ThemeProps;
}

export interface DropdownValueProps {
  caption: string,
  appSymbol: AppSymbol
}

export interface DropDownGenericState {
  value: number;
}

export const MenuIcon = styled.span`
  padding-right: 10px;
`;

const styles = {
  toolbar: {
    display: 'table',
  },

  show: {
    display: 'table-cell',
    verticalAlign: 'middle',
    fontSize: '1.2rem',
    width: '30%',
  },

  hint: {
    display: 'table-cell',
    position: 'relative',
    left: '-15%',
    fontSize: '1.2rem',
  },

  line: {
    display: 'table-cell',
    position: 'relative',
    left: '-30%',
  },

  arrow: {},

  title: {},

  list: {
    border: 'none',
  },
}

const Root = styled.div`
 display: table;
 position: relative;
  // right: -40px;
  // top: 2px;
  // display: block;
`;

const Caption = styled.span`
  display: table-cell;
  verticalAlign: middle;
  position: relative;
  left: 10px;
  font-size: 1.2rem;
  padding-right: 1.2rem;
  color: ${prop => prop.color};
`;

class TypeDropDown extends React.Component<DropDownGenericProps, DropDownGenericState> {
  static defaultProps: Partial<DropDownGenericProps> = {
    style: {}
  }

  constructor(props: DropDownGenericProps) {
    super(props);
    this.state = {value: 0};
  }

  handleChange = (event, index, value) => {
    this.setState({value});
    this.props.selectCallback(value);
  };

  createMenuItems = () => {
    const menuItems = this.props.values.map((value: string | DropdownValueProps, index: number) => {
      const primaryText = _.isString(value) ? value : (value as DropdownValueProps).caption;
      const appSymbol = _.isString(value) ? null : (value as DropdownValueProps).appSymbol;

      const element = (
        <MenuItem
          value={index}
          key={index}
          primaryText={primaryText}
          leftIcon={appSymbol ? <KnownIcon appSymbol={appSymbol}/> : null}
        />
      )
      return element;
    });

    return menuItems;
  }

  render() {
    styles.arrow = {
      fill: this.props.theme.genericTextColors.textColorLink,
    }
    styles.title = {
      color: this.props.theme.genericTextColors.textColorLink,
    }

    return (
      <Root style={this.props.style}>
        <Caption color={this.props.theme.genericTextColors.textColorPale}>
          {this.props.caption}:
        </Caption>
        <span className="show-drop-down">
           <DropDownMenu
             maxHeight={300}
             value={this.state.value}
             onChange={this.handleChange}
             style={styles.hint}
             iconStyle={styles.arrow}
             labelStyle={styles.title}
             underlineStyle={styles.list}
           >
             {this.createMenuItems()}
           </DropDownMenu>
        </span>
      </Root>
    );
  }
}

export default withTheme(TypeDropDown);
