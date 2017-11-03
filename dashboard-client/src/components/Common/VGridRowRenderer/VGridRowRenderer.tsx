import * as React from 'react'
import * as Theme from './Theme'

export interface VGridRowRendererProps extends React.Props<VGridRowRenderer> {
  className: string,
  columns: any[],
  index: number,
  isScrolling: boolean,
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
  hovered: boolean
}

class VGridRowRenderer extends React.Component<VGridRowRendererProps, RowState> {

  styles;

  constructor(props: VGridRowRendererProps) {
    super(props);

    this.state = {
      hovered: false
    }
  }

  onMouseOver = (ev: any) => {
    this.setState({
      hovered: true
    });
  }

  onMouseOut = (ev: any) => {
    this.setState({
      hovered: false
    });
  }

  onRowClick = (ev: any) => {
    this.setState({
      hovered: true
    });
  }

  onRowDoubleClick = (ev: any) => {
    this.setState({
      hovered: true
    });
  }

  render() {
    const {
      index,
      // isScrolling,
      onRowClick,
      onRowDoubleClick,
      onRowMouseOver,
      onRowMouseOut,
      rowData,
      style
    } = this.props;

    const theme = this.props.theme;

    let backgroundColor = this.state.hovered
      ? theme.bgColorRowHover
      : ( this.props.selected
        ? theme.bgColorRowActive
        : 'inherit');
    let borderLeftColor = this.state.hovered
      ? 'red'
      : ( this.props.selected
        ? 'blue'
        : 'pink');

    this.styles = Object.assign({}, style, {
      backgroundColor: backgroundColor,
      borderLeft: 'solid 2px ' + borderLeftColor,
      outline: 'none',
      overflow: 'inherit'
    });

    const a11yProps: any = {};

    if (
      onRowClick ||
      onRowDoubleClick ||
      onRowMouseOver ||
      onRowMouseOut
    ) {
      a11yProps['aria-label'] = 'row';
      a11yProps.tabIndex = 0;

      if (onRowClick) {
        a11yProps.onClick = (event: Event) => onRowClick({event, index, rowData})
      }
      if (onRowDoubleClick) {
        a11yProps.onDoubleClick = (event: Event) => onRowDoubleClick({event, index, rowData})
      }
      if (onRowMouseOut) {
        a11yProps.onMouseOut = (event: Event) => onRowMouseOut({event, index, rowData})
      }
      if (onRowMouseOver) {
        a11yProps.onMouseOver = (event: Event) => onRowMouseOver({event, index, rowData})
      }
    }

    return (
      <div
        {...a11yProps}
        className={this.props.className}
        key={this.props.key}
        role="row"
        style={this.styles}
        onMouseOver={this.onMouseOver}
        onMouseOut={this.onMouseOut}
      >
        {this.props.columns}
      </div>)
  }
}

export default VGridRowRenderer
