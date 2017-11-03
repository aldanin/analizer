// import * as React from 'react'
import styled from 'styled-components'

// FIXME: bg and border colors should come from Theme
const Cursor = styled.div`
  display: inline-block;
  background: white;
  width: 3px;
  height: 100%;
  position: absolute;
  top: -5px;
  left: 50%;
  z-index: 100;

  &::after {
    bottom: -3px;
    left: 50%;
    border: solid transparent;
    content: " ";
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
    border-color: rgba(255, 255, 255, 0);
    border-bottom-color: #ffffff;
    border-width: 6px;
    margin-left: -6px;
  }

  &::before {
    top: 0;
    left: -5px;
    border: solid transparent;
    content: " ";
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
    border-color: rgba(255, 255, 255, 0);
    border-top-color: #ffffff;
    border-width: 6px;
  }
`

/*export interface CursorProps {
}

const Cursor: React.SFC<CursorProps> = ({ }) => {
  return (
    <div>
      cursor
    </div>
  )
}*/

export default Cursor
