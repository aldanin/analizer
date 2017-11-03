import * as React from 'react'
import FontIcon from 'material-ui/FontIcon'
import styled from 'styled-components'
import * as Theme from './Theme'
import * as FormatHelpers from '../../../helpers/Formatters'
import { GroupByProps } from './definitions'

export interface GroupingRowProps extends React.Props<GroupingRow> {
  isExpanded?: boolean;
  groupBy: GroupByProps; // Group by field e.g. 'name' and caption e.g. 'Name"
  name: string; // The actual group's name, e.g. 'John doe'
  withMarker?: boolean;
  onClick: (name: string, isExpanded: boolean) => void;
  color?: string;
  fontSize?: number | string;
  style?: any;
  theme?: Theme.ThemeProps;
}

export interface ClickableArrowState {
  isExpanded: boolean;
}

interface GroupingRowStyleProps {
  theme?: Theme.ThemeProps;
  fontColor?: string;
  fontSize?: string;
}

const Wrap = styled.div`
  width: 100%;
  height: 40px;
  line-height: 40px;
  display: inline-block;
  color: ${(props: GroupingRowStyleProps) => props.fontColor};
  cursor: ${(props: GroupingRowStyleProps) => 'pointer'};
  font-size: 1.2rem;
  font-weight: bold;
  border-bottom: solid 1px ${(props: GroupingRowStyleProps) => props.theme.genericTextColors.borderColor}; //#d8d8d8;
`;

const Content = styled.div`
  display: inline-block;
  margin-left: 40px;
`;

const Caption = styled.span`
  color: ${props => props.theme.genericTextColors.textColorPale}
`;

const Name = styled.span`
  font-size: ${(props: GroupingRowStyleProps) => props.fontSize}
`;

class GroupingRow extends React.Component<GroupingRowProps, ClickableArrowState> {
  static defaultProps: Partial<GroupingRowProps> = {
    fontSize: '1.2rem',
    style: {},
    theme: Theme.DEFAULT_THEME,
    isExpanded: false,
    withMarker: null
  }

  constructor(props: GroupingRowProps) {
    super(props)

    this.state = {
      isExpanded: props.isExpanded
    }
  }

  onClick = () => {
    this.props.onClick(this.props.name, this.state.isExpanded);
    this.setState({isExpanded: !this.state.isExpanded})
  }

  getArrow() {
    const menuArrow = this.state.isExpanded ? 'icon_tri_down' : 'icon_tree_tri_closed'

    const top = this.state.isExpanded ? '-1px' : '1px';

    return (
      <FontIcon
        className={`base_icons ${menuArrow}`}
        style={{
          fontSize: '80%',
          marginRight: 5,
          color: this.props.color,
          position: 'relative',
          transition: 'initial',
          top: top,
        }}
      />
    )
  }

  componentWillReceiveProps(nextProps: GroupingRowProps) {
    if (nextProps.isExpanded !== this.props.isExpanded) {
      this.setState({
        isExpanded: nextProps.isExpanded
      })
    }
  }

  render() {
    const caption = `${this.props.groupBy.caption}:`;
    const fontSize = this.props.style && this.props.style.fontSize ? this.props.style.fontSize : '1.2rem';

    return (
      <Wrap
        fontColor={this.props.color || this.props.theme.genericTextColors.textColor}
        fontSize={'1.2rem'}
        theme={this.props.theme}
      >
        <Content onClick={() => this.onClick()}>
          {this.getArrow()}
          <Caption>{caption}</Caption>&nbsp;&nbsp;
          <Name fontSize={fontSize}>{FormatHelpers.addSearchMarker(this.props.withMarker, this.props.name)}</Name>
        </Content>
      </Wrap>
    )
  }
}

export default GroupingRow
