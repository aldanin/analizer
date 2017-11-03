import * as React from 'react'
import styled from 'styled-components';

const ViewContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const Map = styled.img`
  width: 100%;
  height: 100%;
`;

export interface RecentLocationsProps extends React.Props<RecentLocations> {
}
export interface RecentLocationsState {
}

class RecentLocations extends React.Component<RecentLocationsProps, RecentLocationsState> {
  constructor (props: RecentLocationsProps) {
    super(props)

    this.state = {
    }
  }

  render() {
    return (
      <ViewContainer>
        <Map src="../../../../img/map.png"/>
      </ViewContainer>
    )
  }
}

export default RecentLocations
