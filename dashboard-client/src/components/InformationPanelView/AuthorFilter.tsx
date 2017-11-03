import * as React from 'react';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

export interface AuthorFilterProps {
}

export interface AuthorFilterState {
  value: number;
}

const styles = {
  label: {
    lineHeight: '2.5rem',
    color: '#a5a7a9',
    paddingLeft: '0.5rem',
    borderTop: 'none',
  },
  list: {
    borderTop: 'none',
  }
}

export default class AuthorFilter extends React.Component<AuthorFilterProps, AuthorFilterState> {
  static defaultProps: Partial<AuthorFilterProps> = {
  }

  constructor(props: AuthorFilterProps) {
    super(props);

    this.state = {
      value: 0,
    }
  }

  handleChange = (event, index, value) => {
    this.setState({value});
  };

  render() {
    return (
      <DropDownMenu
        maxHeight={300}
        value={this.state.value}
        onChange={this.handleChange}
        labelStyle={styles.label}
        underlineStyle={styles.list}
        iconButton={<div/>}
      >
        <MenuItem
          value={0}
          key={0}
          primaryText={<div>me</div>}
        />
      </DropDownMenu>
    );
  }
}
