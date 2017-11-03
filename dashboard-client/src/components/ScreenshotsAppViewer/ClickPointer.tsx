import * as React from 'react'
import styled from 'styled-components'

export interface ClickPointerProps extends React.Props<ClickPointer> {
  top: string,
  left: string,
  text: string,
  className?: string,
}
export interface ClickPointerState {
}

class ClickPointer extends React.Component<ClickPointerProps, ClickPointerState> {
  static defaultProps: Partial<ClickPointerProps> = {
  }

  constructor (props: ClickPointerProps) {
    super(props)

    this.state = {
    }
  }

  render() {
    const {className} = this.props;
    return (
      <div className={className}/>
    )
  }
}

// FIXME: bg and box shadow colors should come from Theme
const StyledDot = styled(ClickPointer)`
  display: block;
  position: absolute;
  transform: translate(-50%, -50%);
  top: ${props => props.top};
  left: ${props => props.left};
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: white;
  box-shadow: 0 0 10px rgba(0,0,0,0.7);
`

export default StyledDot
