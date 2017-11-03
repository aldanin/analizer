import * as React from 'react'
import * as Theme from './Theme'
import styled from 'styled-components';
// import Notebook from '../../containers/Notebook'

const InformationFrame = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  font-size: 1.9rem;
`;

const InformationContainer = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding: 1rem;
  width: 100%;
  height: 100%;
`;

// FIXME: bg color should be come from Theme
const TabsContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 4.5rem;
  background-color: #5b6176;
`;

interface InformationTabProps {
  bgColor: string;
  border: string;
}

const TabView = styled.div`
  display: table;
  flex-direction: row;
  width: 33%;
  height: 100%;
  background-color: ${(prop: InformationTabProps) => prop.bgColor};
  border-top: 5px solid ${(prop: InformationTabProps) => prop.border};
  font-size: 1.1rem;
  text-align: center;
`;

const TabContainer = styled.span`
  display: table-cell;
  vertical-align: middle;
  width: 100%;
  height: 100%;
  text-align: center;
  cursor: pointer;
`;

const TabIcon = styled.span`
  margin: 0 0.5rem 0 0;
`;

const TabTitle = styled.span`
`;

const InformationScreenContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: white;
  flex: 1;
  padding: 1rem;
  box-sizing: border-box;
  overflow: hidden;
  overflow-y: auto;
`;

export interface InformationPanelViewProps extends React.Props<InformationPanelView> {
  theme?: Theme.ThemeProps
}
export interface InformationPanelViewState {
  activeIndex: number;
}

class InformationPanelView extends React.Component<InformationPanelViewProps, InformationPanelViewState> {

  static defaultProps: Partial<InformationPanelViewProps> = {
    theme: Theme.defaultTheme
  }

  constructor (props: InformationPanelViewProps) {
    super(props)

    this.state = {
      activeIndex: 0,
    }
  }

  tabSelected(index: number) {
    this.setState({activeIndex: index})
  }

  renderContent() {
    switch (this.state.activeIndex) {
      case 0: return this.renderNotebook();
      case 1: return this.rendereAgent();
      case 2: return this.renderProduct();
      default: return null;
    }
  }

  renderNotebook() {
    return <div>Notebook</div>
  }

  rendereAgent() {
    return <div>Agent Info</div>
  }

  renderProduct() {
    return <div>Product Info</div>
  }

  render() {
    return (
      <InformationFrame>
        <InformationContainer>
          <TabsContainer>
            <TabView
              onClick={() => this.tabSelected(0)}
              bgColor={this.state.activeIndex === 0 ? this.props.theme.activeTab : 'transparent'}
              border={this.state.activeIndex === 0 ? this.props.theme.activeBorder : 'transparent'}
            >
              <TabContainer>
                <TabIcon className="base_icons icon_notebook"/>
                <TabTitle>Notebook</TabTitle>
              </TabContainer>
            </TabView>
            <TabView
              onClick={() => this.tabSelected(1)}
              bgColor={this.state.activeIndex === 1 ? this.props.theme.activeTab : 'transparent'}
              border={this.state.activeIndex === 1 ? this.props.theme.activeBorder : 'transparent'}
            >
              <TabContainer>
                <TabIcon className="base_icons icon_agent_info"/>
                <TabTitle>Agent Info</TabTitle>
              </TabContainer>
            </TabView>
            <TabView
              onClick={() => this.tabSelected(2)}
              bgColor={this.state.activeIndex === 2 ? this.props.theme.activeTab : 'transparent'}
              border={this.state.activeIndex === 2 ? this.props.theme.activeBorder : 'transparent'}
            >
              <TabContainer>
                <TabIcon className="base_icons icon_info"/>
                <TabTitle>Product Info</TabTitle>
              </TabContainer>
            </TabView>
          </TabsContainer>
          <InformationScreenContainer>
            {this.renderContent()}
          </InformationScreenContainer>
        </InformationContainer>
      </InformationFrame>
    )
  }
}

export default InformationPanelView
