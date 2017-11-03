import * as React from 'react'
import * as Theme from './Theme'
import styled, { ThemeProvider } from 'styled-components';
import UnreadProducts from './UnreadProducts';
// import MostActiveContacts from './MostActiveContacts';
// import RecentLocations from './RecentLocations';
// import LatestImmediateCommands from './LatestImmediateCommands';
import { SummaryData } from '../../types/Summary';
import MostActiveSort from './MostActiveSort';
import LoadingIndicator from '../Common/LoadingIndicator'

const ViewContainer = styled.div`
  display: flex;
  overflow-x: hidden;
  overflow-y: auto;
  width: 100%;
  height: 100%;
`;

const SummaryViewContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  font-size: 1.9rem;
  background-color: ${prop => prop.theme.bgColor};
  overflow: hidden;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
`;

const TitleAndSortingContainer = styled.div`
  display: flex;
  width: 100%;
  min-height: 34px;
`;

const SummaryTitle = styled.span`
  color: ${prop => prop.theme.textColor};
  font-size: 1.7rem;
  padding-bottom: 55px;
  margin-right: 2rem;
  width: 90%;
`;

const SortTitle = styled.span`
  font-size: 1.5rem;
  padding-bottom: 55px;
  color: ${prop => prop.theme.subTitleColor};
`;

const UnreadAndMostActiveContainer = styled.div`
  display: flex;
  width: 100%;
  height: 50%;
  margin-bottom: 20px;
`;

// const LocationsAndCommandsContainer = styled.div`
//   display: flex;
//   flex: 1;
//   width: 100%;
//   height: 35%;
// `;

const UnreadProductsContainer = styled.div`
  display: flex;
  background-color: ${prop => prop.theme.gridBgColor};
  width: 100%;
  height: 100vh;
  margin-right: 20px;
  border: 1px solid ${prop => prop.theme.gridBorderColor};
  border-top: 3px solid ${prop => prop.theme.gridTopBorderColor};
  box-shadow: 0px 3px 18px 0px ${prop => prop.theme.gridShadow};
`;

// const MostActiveContainer = styled.div`
//   display: inline-block;
//   background-color: ${prop => prop.theme.gridBgColor};
//   width: 50%;
//   height: auto;
//   border: 1px solid ${prop => prop.theme.gridBorderColor};
//   border-top: 3px solid ${prop => prop.theme.gridTopBorderColor};
//   box-shadow: 0px 3px 18px 0px ${prop => prop.theme.gridShadow};
// `;
//
// const RecentLocationsContainer = styled.div`
//   display: inline-block;
//   background-color: ${prop => prop.theme.gridBgColor};
//   width: 50%;
//   height: 100%;
//   margin-right: 20px;
//   border: 1px solid ${prop => prop.theme.gridBorderColor};
//   box-shadow: 0px 3px 18px 0px ${prop => prop.theme.gridShadow};
// `;
//
// const LatestImmediateCommandsContainer = styled.div`
//   display: inline-block;
//   background-color: ${prop => prop.theme.gridBgColor};
//   width: 50%;
//   height: 100%;
//   border: 1px solid ${prop => prop.theme.gridBorderColor};
//   border-top: 3px solid ${prop => prop.theme.gridTopBorderColor};
//   box-shadow: 0px 3px 18px 0px ${prop => prop.theme.gridShadow};
// `;

export interface SummaryViewProps extends React.Props<SummaryView> {
  isFetching: boolean;
  data: SummaryData;
  contactFilter: number;
  onSortOptionSelect: (sortFilter: number) => void;
  theme?: Theme.ThemeProps
}
export interface SummaryViewState {
}

class SummaryView extends React.Component<SummaryViewProps, SummaryViewState> {

  static defaultProps: Partial<SummaryViewProps> = {
    theme: Theme.defaultTheme
  }

  constructor (props: SummaryViewProps) {
    super(props)

    this.state = {
    }
  }

  render() {
    if (this.props.isFetching) { return (<LoadingIndicator/>) }
    return (
      <ThemeProvider theme={this.props.theme}>
        <ViewContainer>
          <SummaryViewContainer>
            <TitleAndSortingContainer>
              <SummaryTitle>Summary</SummaryTitle>
              {process.env.REACT_APP_IS_FILTERED_ENABLED ? (
                <SortTitle>In:</SortTitle>
              ) : null}
              {process.env.REACT_APP_IS_FILTERED_ENABLED ? (
                <MostActiveSort
                  contactFilter={this.props.contactFilter}
                  onSortOptionSelect={this.props.onSortOptionSelect}
                />
              ) : null}
            </TitleAndSortingContainer>
            <UnreadAndMostActiveContainer>
              <UnreadProductsContainer>
                <UnreadProducts data={this.props.data}/>
              </UnreadProductsContainer>
              {/*<MostActiveContainer>*/}
                {/*<MostActiveContacts*/}
                  {/*data={this.props.data.mostActiveContacts}*/}
                  {/*contactFilter = {this.props.contactFilter}*/}
                  {/*onSortOptionSelect = {this.props.onSortOptionSelect}*/}
                {/*/>*/}
              {/*</MostActiveContainer>*/}
            </UnreadAndMostActiveContainer>
            {/*<LocationsAndCommandsContainer>*/}
              {/*<RecentLocationsContainer>*/}
                {/*<RecentLocations/>*/}
              {/*</RecentLocationsContainer>*/}
              {/*<LatestImmediateCommandsContainer>*/}
                {/*<LatestImmediateCommands data={this.props.data.latestCommands}/>*/}
              {/*</LatestImmediateCommandsContainer>*/}
            {/*</LocationsAndCommandsContainer>*/}
          </SummaryViewContainer>
        </ViewContainer>
      </ThemeProvider>
    )
  }
}

export default SummaryView
