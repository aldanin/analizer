import * as React from 'react'
import * as Theme from './Theme'

export interface VGridRowRendererProps extends React.Props<VGridRowRenderer> {
  className: string,
  columns: any[],
  index: number,
  isScrolling: boolean,
  isChecked: boolean,
  isRead: boolean;
  key: string,
  selected: boolean,
  onRowClick: (ev: any) => void,
  onRowDoubleClick: (ev: any) => void,
  onRowMouseOver: (ev: any) => void,
  onRowMouseOut: (ev: any) => void,
  rowData: any,
  style: any,
  theme: Theme.ThemeProps
}

interface RowState {
  hovered: boolean,
}

class VGridRowRenderer extends React.Component<VGridRowRendererProps, RowState> {

  styles;

  constructor(props: VGridRowRendererProps) {
    super(props);

    this.state = {
      hovered: false,
    }
  }

  onMouseOver = () => {
    this.setState({
      hovered: true
    });
    this.props.onRowMouseOver({index: this.props.index});
  }

  onMouseOut = () => {
    this.setState({
      hovered: false
    });
    this.props.onRowMouseOut({index: this.props.index});
  }

  onRowClick = () => {
    this.setState({
      hovered: true
    });
    this.props.onRowClick({
      rowData: this.props.rowData,
      index: this.props.index});
  }

  onRowDoubleClick = (ev: any) => {
    this.setState({
      hovered: true
    });
  }

  getRowMarkColor = (props) => {
    return props.isChecked || this.props.selected
      ? props.theme.checkedColor
      : (
        props.rowData.isRead
          ? props.theme.readMarkColor
          : props.theme.unreadMarkColor
      );
  }

  getRowColor = (props) => {
    const theme = props.theme;
    return this.state.hovered
      ? theme.bgColorRowHover
      : ( this.props.selected || this.props.isChecked
        ? theme.bgColorRowActive
        : 'inherit');
  }

  render() {
    const {
      style
    } = this.props;

    this.styles = Object.assign({}, style, {
      backgroundColor: this.getRowColor(this.props),
      borderLeft: 'solid 3px ' + this.getRowMarkColor(this.props),
      outline: 'none',
      overflow: 'inherit'
    });

    const a11yProps: any = {};

    return (
      <div
        {...a11yProps}
        className={this.props.className}
        key={this.props.key}
        role="row"
        style={this.styles}
        onClick={this.onRowClick}
        onMouseOver={this.onMouseOver}
        onMouseOut={this.onMouseOut}
      >
        {this.props.columns}
      </div>)
  }
}

export default VGridRowRenderer
