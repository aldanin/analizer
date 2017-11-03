import * as React from 'react';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import styled from 'styled-components'

const Container = styled.div`
  position: absolute;
  left: 50%;
  margin-left: 0;
  top: 50%;
  margin-top: -50px;
  z-index: 2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

interface LoadingIndicatorSmallProps {
}

const LoadingIndicatorSmall: React.SFC<LoadingIndicatorSmallProps> = (props) => {
  return (
    <Container>
      <RefreshIndicator
        size={50}
        left={10}
        top={0}
        status="loading"
      />
    </Container>
  )
}

export default LoadingIndicatorSmall
