import * as React from 'react'
import styled from 'styled-components'
import * as Theme from './Theme'

export interface AgentTooltipProps extends React.Props<AgentTooltip> {
  show: boolean,
  anchorEl: Element,
  content: React.ReactElement<any>,
  theme?: Theme.ThemeProps,
}
export interface AgentTooltipState {
}

const Container = styled.div`
  position: fixed;
  z-index: 99;
  min-width: 400px;
  max-width: 450px;
  background: ${(props) => props.theme.dashboard.tooltip.backgroundColor};
  top: 10%;
  left: 50%;
  margin-bottom: 10px;
  padding: 15px;
  pointer-events: none;
  box-shadow: 0 0 10px rgba(0,0,0,0.5);
  border-radius: 5px;
`

const Content = styled.div`
  display: inline;
`

const Arrow = styled.div`
  position: absolute;
  width: 0;
  height: 0;
  top: 20px;
  left: -15px;
  border-top: solid transparent 15px;
  border-bottom: solid transparent 15px;
  border-right: solid ${props => props.theme.dashboard.tooltip.backgroundColor} 15px;
`

const Gap = styled.div`
  position: absolute;
  width: 20px;
  height: 100%;
  top: 0;
  left: -20px;
`

class AgentTooltip extends React.Component<AgentTooltipProps, AgentTooltipState> {
  container
  arrowEl

  constructor (props: AgentTooltipProps) {
    super(props)
  }

  adjustPosition = () => {
    const bRect = this.container.getBoundingClientRect()
    let { top, left, width, height } = bRect
    if (top < 0) {
      top = 0
    }
    if (top + height > window.innerHeight) {
      top = window.innerHeight - height
    }
    if (left < 0) {
      left = 0
    }
    if (left + width > window.innerWidth) {
      left = window.innerWidth - width
    }
    this.container.style.left = left + 'px'
    this.container.style.top = top + 'px'

    const anchorPos = this.props.anchorEl.getBoundingClientRect()
    this.arrowEl.style.top = (anchorPos.top - top + 20) + 'px'
  }

  componentDidUpdate() {
    if (this.props.show) {
      this.adjustPosition()
    }
  }

  render() {
    const { show } = this.props
    if (!show) {
      return null
    }
    const { content, anchorEl } = this.props
    const anchorPos = anchorEl.getBoundingClientRect()
    // const tipStyle = Object.assign({}, styles.tooltip, {
    // TODO: locate to the left of anchor if needed
    const tipStyle = {
      top: anchorPos.top + 'px',
      left: (anchorPos.right - 10) + 'px'
    }
    const arrowStyle = {
      top: anchorPos.top + 10 + 'px'
    }
    return (
      <Container innerRef={(el) => { this.container = el }} style={tipStyle}>
        <Content>{content}</Content>
        <Arrow innerRef={(el) => { this.arrowEl = el }} style={arrowStyle}/>
        <Gap/>
      </Container>
    )
  }
}

export default AgentTooltip
