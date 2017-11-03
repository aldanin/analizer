import * as React from 'react'
import styled from 'styled-components';
import WarningIcon from 'material-ui/svg-icons/alert/warning';

const Container = styled.div`
  padding-top: 50px;
  text-align: center;
  font-size: 26px;
  color: #d2d2d2;
  cursor: pointer;
`;

export interface NotAvailableProps {
}

const NotUnavailable: React.SFC<NotAvailableProps> = ({ }) => {
  return (
    <Container>
      <WarningIcon style={{color: '#d2d2d2', width: '150px', height: '100px'}}/>
      <h1>Not available</h1>
    </Container>
  )
}

export default NotUnavailable
