import * as React from 'react';
import styled from 'styled-components';

import WarningIcon from 'material-ui/svg-icons/alert/warning';

const Container = styled.div`
  padding-top: 50px;
  text-align: center;
  font-size: 26px;
  color: #d2d2d2;
`;

const PageStatusNoData: React.SFC<{}> = () => {
  return (
    <Container>
      <WarningIcon style={{color: '#d2d2d2', width: '150px', height: '150px'}}/>
      <h1>Data is not available for this viewer.</h1>
    </Container>
  );
};

export default PageStatusNoData;
