import * as React from 'react'
import * as Theme from './Theme'
import styled, { withTheme } from 'styled-components';
import { TagData } from '../../types/Tag';

const RowContainer = styled.div`
  display: inline-block;
  position: relative;
  padding: 0 0 0 10px;
  width: 100%;
  
  &:hover {
    backgroundColor: ${(props) => props.theme.rowHoverBgColor};
  }
`;

const RowText = styled.span`
  display: inline-block;
  font-size: 12px;
  line-height: 30px;
  color: ${prop => prop.theme.textColor};
`;

const AddTagContainer = styled.span`
  position: absolute;
  right: 30px;
  display: inline-block;
  font-size: 12px;
  line-height: 30px;
  color: ${prop => prop.theme.textColor};
  cursor: pointer;
`;

export interface RowTagListProps extends React.Props<RowTagList> {
  tag: TagData;
  onTagSelect: (tag: TagData) => void;
  theme?: Theme.ThemeProps;
}
export interface RowTagListState {
  isMouseOn: boolean;
}

class RowTagList extends React.Component<RowTagListProps, RowTagListState> {

  static defaultProps: Partial<RowTagListProps> = {
    theme: Theme.defaultTheme
  }

  constructor (props: RowTagListProps) {
    super(props)

    this.state = {
      isMouseOn: false,
    }
  }

  handleMouseState(isMouseOn: boolean) {
    this.setState({isMouseOn: isMouseOn})
  }

  render() {
    return (
      <RowContainer
        onMouseEnter={() => this.handleMouseState(true)}
        onMouseLeave={() => this.handleMouseState(false)}
      >
        <RowText>
          {this.props.tag}
        </RowText>
        {this.state.isMouseOn ? (
          <AddTagContainer onClick={() => this.props.onTagSelect(this.props.tag)}>
            Add tag
          </AddTagContainer>
        ) : null}
      </RowContainer>
    )
  }
}

export default withTheme(RowTagList)
