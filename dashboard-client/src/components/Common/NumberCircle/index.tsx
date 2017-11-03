import * as React from 'react'
import styled from 'styled-components'
import * as Theme from './Theme'

export interface NumberCircleProps {
  theme: Theme.ThemeProps
}

const RoundDiv = styled.div`
  border-radius: 50%;
  width: 11px;
  height: 11px;
  padding: 3px;
  background-color:  ${(prop: NumberCircleProps) => prop.theme.bgColor};
  color: ${(prop: NumberCircleProps) => prop.theme.numberColor};
  text-align: center;
  font-size: 11px;
  display: flex;
  flex-flow: row wrap;
  font-size: 9px;
  font-size: 9px;
  place-content: center;
;`
const NumberCircle: React.SFC<NumberCircleProps> = (props) => {

  return (
    <RoundDiv theme={props.theme}>
      {props.children}
    </RoundDiv>
  )
}

NumberCircle.defaultProps = {
  theme: Theme.defaultTheme
};

export default NumberCircle
