import * as React from 'react'
import styled from 'styled-components'
import * as Theme from './Theme'
import { withRouter } from 'react-router'

const Wrapper = styled.div`
  color: ${props => props.theme.textColor};
  background-color: ${props => props.theme.bgColor};
  width: 30px;
  padding: 10px;
  height: 100%;
`
export interface TimelineProps extends React.Props<any> {
  theme?: Theme.ThemeProps
};

export interface TimelineState {
}

class Timeline extends React.Component<TimelineProps, TimelineState> {
  static defaultProps: Partial<TimelineProps> = {
    theme: Theme.defaultTheme
  }

  constructor (props: TimelineProps) {
    super(props)

    this.state = {
    }
  }

  render () {
    return (
      <Wrapper theme={this.props.theme}>
        {/*Timeline: TODO*/}
      </Wrapper>
    )
  }
}

export default withRouter(Timeline)
export { Timeline }
