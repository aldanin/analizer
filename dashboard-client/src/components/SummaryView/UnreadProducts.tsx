import * as React from 'react'
import styled from 'styled-components';
import SensorsComponent from './Sensors';
import UserAppsComponent from './UserApps';
// import DeviceSystemComponent from './DeviceSystem';
import {SummaryData as UnreadProductsData } from '../../types/Summary';
import { withRouter } from 'react-router';

const ViewContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: auto;
  overflow-y: auto;
  overflow: hidden;
  padding-left: 20px;
`;

const Title = styled.span`
  font-size: 14px;
  margin-top: 10px;
`;

const FrameContainer = styled.div`
  display: flex;
  width: 100%;
  min-height: 390px;
  margin-top: 15px;
`;

const UserAppsContainer = styled.div`
  display: inline-block;
  width: 50%;
  height: 390px;
  border-right: 1px solid ${prop => prop.theme.gridBorderColor};
`;

const SensorsAndDevicesContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 390px;
  width: 50%;
`;

const SensorsContainer = styled.div`
  display: inline-block;
  width: 100%;
  height: 215px;
  border-bottom: 1px solid ${prop => prop.theme.gridBorderColor};
`;

const DeviceContainer = styled.div`
  display: inline-block;
  width: 100%;
  height: 175px;
`;

export interface UnreadProductsProps {
  data: UnreadProductsData;
}

const UnreadProducts: React.SFC<UnreadProductsProps> = ({ data }) => {
  return (
    <ViewContainer>
      <Title>Unread Products</Title>
      <FrameContainer>
        <UserAppsContainer>
          <UserAppsComponent data={data.userApps}/>
        </UserAppsContainer>
        <SensorsAndDevicesContainer>
          <SensorsContainer>
            <SensorsComponent data={data.sensors}/>
          </SensorsContainer>
          <DeviceContainer>
            {/*<DeviceSystemComponent data = {data.deviceSystem}/>*/}
          </DeviceContainer>
        </SensorsAndDevicesContainer>
      </FrameContainer>
    </ViewContainer>
  )
}

export default withRouter(UnreadProducts);
