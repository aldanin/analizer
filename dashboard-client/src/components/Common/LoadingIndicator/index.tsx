import * as React from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import styled from 'styled-components'

const Container = styled.div`
  position: absolute;
  left: 50%;
  margin-left: -50px;
  top: 50%;
  margin-top: -50px;
  z-index: 2;
  // width: 100%;
  // height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

interface LoadingIndicatorProps {
}

const LoadingIndicator: React.SFC<LoadingIndicatorProps> = (props) => {
  return (
    <Container>
      <CircularProgress size={80} thickness={7}/>
    </Container>
  )
}

export default LoadingIndicator
