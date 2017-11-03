import * as React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  background: ${props => props.theme.controlsPanelBackground};
  display: inline-block;
  border-radius: 5px;
  height: 35px;
  line-height: 35px;
  padding: 0 8px;
`
// FIXME: bg color should come from Theme
const Button = styled.div`
  color: ${props => props.theme.controlsPanelTextColor};
  background: white;
  padding: 0 8px;
  display: inline-block;
  cursor: pointer;
  height: 18px;
  line-height: 18px;
  border: none;
  position: relative;

  &:first-child {
    border-radius: 9px 0 0 9px;
  }

  &:last-child {
    border-radius: 0 9px 9px 0;
  }
  &.selected {
    border-radius: 11px;
    padding: 0 10px;
    margin-left: -5px;
    margin-right: -5px;
    border: 2px solid ${props => props.theme.controlsPanelTextColor};
    z-index: 1;
  }
`

export interface ControlsSpeedProps {
  speed: number,
  onClick: (speed: number) => void,
}

const ControlsSpeed: React.SFC<ControlsSpeedProps> = ({ speed, onClick }) => {
  return (
    <Container>
      {[0.5, 1, 2, 4].map(btnSpeed => (
        <Button
          key={btnSpeed}
          selected={speed === btnSpeed}
          onClick={() => onClick(btnSpeed)}
          className={speed === btnSpeed ? 'selected' : ''}
        >
          {btnSpeed}x
        </Button>
      ))}
    </Container>
  )
}

export default ControlsSpeed
