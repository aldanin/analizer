import * as React from 'react'
import FontIcon from 'material-ui/FontIcon'
import styled from 'styled-components'
import { CellProps } from './definitions'
import * as Theme from './Theme'

export interface HeaderCellProps extends React.Props<HeaderCell> {
  field: string;
  title: string;
  isSelected: boolean;
  width?: number;
  minWidth?: number;
  maxWidth?: number,
  flexShrink?: number;
  flexGrow?: number;
  isClickable?: boolean;
  onClick?: (field: string, isUp: boolean) => void;
  color: string;
  fontSize?: number | string;
  style?: any;
  theme?: Theme.ThemeProps;
}

export interface ClickableArrowState {
  isUp: boolean;
}

const Wrap = styled.div`
  display: inline-block;
  color: ${(props: CellProps) => props.fontColor};
  flex-basis: ${(props: CellProps) => props.width}px;
  min-width: ${(props: CellProps) => props.minWidth}px;
  max-width: ${(props: CellProps) => props.maxWidth ? props.maxWidth + 'px' : 'initial'};
  flex-shrink: ${(props: CellProps) => props.flexShrink || 0};
  flex-grow: ${(props: CellProps) => props.flexGrow || 0};
  cursor: ${(props: CellProps) => props.isClickable ? 'pointer' : 'initial'};
  margin-right: ${(props: CellProps) => props.marginRight};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Caption = styled.span`

`;

class HeaderCell extends React.Component<HeaderCellProps, ClickableArrowState> {
  static defaultProps: Partial<HeaderCellProps> = {
    isClickable: true,
    onClick: () => {
      // No action
    },
    width: 30,
    minWidth: 0,
    maxWidth: null,
    flexShrink: 0,
    flexGrow: 0,
    fontSize: '1.2rem',
    style: {},
    theme: Theme.DEFAULT_THEME
  }

  constructor(props: HeaderCellProps) {
    super(props)

    this.state = {
      isUp: false
    }
  }

  onClick = () => {
    this.props.onClick(this.props.field, this.state.isUp);
    this.setState({isUp: !this.state.isUp})
  }

  getArrow() {
    if (!this.props.isClickable || !this.props.isSelected) {
      return <span/>
    }

    const menuArrow = this.state.isUp ? 'icon_tri_up' : 'icon_tri_down';
    const top = this.state.isUp ? '-1px' : '1px';

    return (
      <FontIcon
        className={`base_icons ${menuArrow}`}
        style={{
          fontSize: '80%',
          marginLeft: 5,
          color: this.props.color,
          position: 'relative',
          transition: 'initial',
          top: top,
        }}
      />
    )
  }

  render() {
    const width = this.props.width;
    const marginRight = this.props.style && this.props.style.marginRight ? this.props.style.marginRight : '20px';

    return (
      <Wrap
        onClick={() => this.onClick()}
        isClickable={this.props.isClickable}
        fontColor={this.props.color || this.props.theme.genericTextColors.textColorLink}
        fontSize={'1.2rem'}
        width={width}
        minWidth={this.props.minWidth}
        maxWidth={this.props.maxWidth}
        marginRight={marginRight}
        flexShrink={this.props.flexShrink}
        flexGrow={this.props.flexGrow}
      >
        <Caption>{this.props.title}</Caption>
        {this.getArrow()}
      </Wrap>
    )
  }
}

export default HeaderCell
