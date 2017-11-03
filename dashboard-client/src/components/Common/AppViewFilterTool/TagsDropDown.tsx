import * as React from 'react';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import { TagsFilter, TagsTitle } from './Style';
import { ThemeProps } from './Theme';
import { withTheme } from 'styled-components';

export interface TagDropDownProps {
  tags: (value: number) => void;
  theme?: ThemeProps;
}

export interface TagDropDownState {
  value: number;
}

const styles = {
  toolbar: {
    display: 'table',
  },

  hint: {
    display: 'table-cell',
    position: 'relative',
    left: '-15%',
    fontSize: '80%',
  },

  arrow: {
  },

  title: {
  },

  list: {
    border: 'none',
  },

}

class TagDropDown extends React.Component<TagDropDownProps, TagDropDownState> {

  constructor(props: TagDropDownProps) {
    super(props);
    this.state = {value: 0};
  }

  handleChange = (event, index, value) => {
    this.setState({value});
    this.props.tags(value);
  };

  render() {
    styles.arrow = {
      fill: this.props.theme.arrowColor,
    }
    styles.title = {
      color: this.props.theme.titleInsideDropDownMenuColor,
    }

    return (
      <TagsFilter>
        <TagsTitle color={this.props.theme.titleColor}>Tags:</TagsTitle>
        <span className="tag-drop-down">
          <DropDownMenu
            maxHeight={300}
            value={this.state.value}
            onChange={this.handleChange}
            style={styles.hint}
            iconStyle={styles.arrow}
            labelStyle={styles.title}
            listStyle={styles.list}
            underlineStyle={styles.list}
          >
            <MenuItem value={0} key={0} primaryText={'All'}/>
          </DropDownMenu>
        </span>
      </TagsFilter>
    );
  }
}
export default withTheme(TagDropDown);
