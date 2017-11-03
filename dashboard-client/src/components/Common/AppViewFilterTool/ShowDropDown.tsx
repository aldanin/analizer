import * as React from 'react';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import { ShowFilter, ShowTitle } from './Style';
import { ThemeProps } from './Theme';
import { withTheme } from 'styled-components';

export interface ShowDropDownProps {
  show: (value: number) => void;
  theme?: ThemeProps;
}

export interface ShowDropDownState {
  value: number;
}

const styles = {
  toolbar: {
    display: 'table',
  },

  show: {
    display: 'table-cell',
    verticalAlign: 'middle',
    fontSize: '80%',
    width: '30%',
  },

  hint: {
    display: 'table-cell',
    position: 'relative',
    left: '-15%',
    fontSize: '80%',
  },

  line: {
    display: 'table-cell',
    position: 'relative',
    left: '-30%',
  },

  arrow: {
  },

  title: {
  },

  list: {
    border: 'none',
  },
}

class ShowDropDown extends React.Component<ShowDropDownProps, ShowDropDownState> {

  constructor(props: ShowDropDownProps) {
    super(props);
    this.state = {value: 0};
  }

  handleChange = (event, index, value) => {
    this.setState({value});
    this.props.show(value);
  };

  render() {
    styles.arrow = {
      fill: this.props.theme.arrowColor,
    }
    styles.title = {
      color: this.props.theme.titleInsideDropDownMenuColor,
    }

    return (
      <ShowFilter>
        <ShowTitle color={this.props.theme.titleColor}>Show:</ShowTitle>
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
            <MenuItem value={0} key={0} primaryText={'All'}/>
           </DropDownMenu>
        </span>
      </ShowFilter>
    );
  }
}

export default withTheme(ShowDropDown);
