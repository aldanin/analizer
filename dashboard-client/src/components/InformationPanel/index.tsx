import * as React from 'react'
import styled from 'styled-components'
import * as Theme from './Theme'
import InformationView from '../InformationPanelView/index';
import { InformationTheme } from '../../theme/ScTheme';

const TOGGLE_VIEW_TRANSITION_TIME = 0.5;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  color: ${props => props.theme.textColor};
  background-color: ${props => props.theme.bgColor};
  padding: 1rem;
  height: 100%;
  box-sizing: border-box;
  width: 350px;
  font-size: 1.9rem;
  transition: width ${TOGGLE_VIEW_TRANSITION_TIME}s;
  
  &.close {
    width: 40px;
  }
`;

const ViewIconContainer = styled.div`
  text-align: right;
`;

const ViewIcon = styled.span`
  display: inline-block;
  cursor: pointer;
  line-height: 2rem;
`;

export interface InformationPanelProps extends React.Props<any> {
  theme?: Theme.ThemeProps
};

export interface InformationPanelState {
  isExpand: boolean;
  isDraw: boolean;
}

class InformationPanel extends React.Component<InformationPanelProps, InformationPanelState> {
  static defaultProps: Partial<InformationPanelProps> = {
    theme: Theme.defaultTheme
  }

  constructor (props: InformationPanelProps) {
    super(props)

    this.state = {
      isExpand: false,
      isDraw: false,
    }
  }

  toggleView = (isExpand: boolean) => {
    this.setState({isDraw: isExpand})
    if (isExpand) {
      window.setTimeout(() => {this.setState({isExpand: isExpand})}, TOGGLE_VIEW_TRANSITION_TIME * 500)
    } else {
      window.setTimeout(() => {this.setState({isExpand: isExpand})}, TOGGLE_VIEW_TRANSITION_TIME * 250)
    }
  }

  render () {
    return (
      <Wrapper className={this.state.isDraw ? '' : 'close'} theme={this.props.theme}>
        <ViewIconContainer>
          <ViewIcon className="base_icons icon_drag" onClick={() => this.toggleView(!this.state.isExpand)}/>
        </ViewIconContainer>
        {this.state.isExpand ? (
          <InformationView
            theme={InformationTheme}
          />) : null}
      </Wrapper>
    )
  }
}

export default InformationPanel
