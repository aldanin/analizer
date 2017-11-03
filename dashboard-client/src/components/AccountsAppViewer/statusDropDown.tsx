import * as React from 'react';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

export interface StatusDropDownProps {
  status?: Function;
}

export interface StatusDropDownState {
  value: number;
}

const styles = {
  toolbar: {
    display: 'table',
  },
  status: {
    display: 'table-cell',
    verticalAlign: 'middle',
    fontSize: '80%',
    width: '30%',
    marginLeft: '24px'
  },
  line: {
    display: 'table-cell',
    position: 'relative',
  },
  hint: {
    display: 'table-cell',
    position: 'relative',
    fontSize: '80%',
  },
}

export default class StatusDropDown extends React.Component<StatusDropDownProps, StatusDropDownState> {

  constructor(props: StatusDropDownProps) {
    super(props);
    this.state = {value: 0};
  }

  handleChange = (event, index, value) => {
    this.setState({value});
    this.props.status(value);
  };

  render() {
    return (
      <div style={styles.toolbar}>
        <span style={styles.status}>Status:</span>
        <span className="tag-drop-down">
          <DropDownMenu maxHeight={300} value={this.state.value} onChange={this.handleChange} style={styles.hint}>
            <MenuItem value={0} key={0} primaryText={'All'}/>
          </DropDownMenu>
        </span>

      </div>
    );
  }
}
