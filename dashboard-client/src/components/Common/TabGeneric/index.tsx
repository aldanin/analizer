import * as React from 'react'
import styled from 'styled-components';
import { ThemeProvider } from 'styled-components';
import { TabsThemeProps, DEFAULT_THEME } from './Theme';

const BORDER_WIDTH = '0.2rem';
const HEIGHT = '2.2rem';
const HALF_HEIGHT = '1.1rem';

const Wrapper = styled.div`
  padding: ${BORDER_WIDTH} 0.5em;
  display: inline-block;
`
const Container = styled.div`
  background: ${prop => prop.theme.disActiveBgColor};
  color: ${prop => prop.theme.disActiveTextColor};
  display: inline-block;
  border-radius: ${HALF_HEIGHT};
  height: ${HEIGHT};
  line-height: ${HEIGHT};
  white-space: nowrap;
  font-size: 1.2rem;
  font-weight: bold;
`
const Button = styled.div`
  padding: 0 1em;
  display: inline-block;
  cursor: pointer;
  position: relative;

  &.selected {
    border-radius: 1em;
    margin-left: -5px;
    margin-right: -5px;
    margin-top: -${BORDER_WIDTH};
    background-color: ${prop => prop.theme.activeBgColor};
    color: ${prop => prop.theme.activeTextColor};
    border: ${BORDER_WIDTH} solid ${prop => prop.theme.activeBorderColor};
    z-index: 1;
    box-shadow: ${prop => prop.theme.shadow};
  }
`

export interface TabDetail {
  title: string;
  callback: Function;
}

export interface TabGenericProps extends React.Props<TabGeneric> {
  tabs: TabDetail[];
  initialSelectedIndex: number;
  selectedIndex?: number;
  theme?: TabsThemeProps;
}

export interface TabGenericState {
  activeIndex: number;
}

class TabGeneric extends React.Component<TabGenericProps, TabGenericState> {
  static defaultProps: Partial<TabGenericProps> = {
    theme: DEFAULT_THEME,
  }

  constructor (props: TabGenericProps) {
    super(props)

    this.state = {
      activeIndex: this.props.initialSelectedIndex,
    }
  }

  componentWillReceiveProps(nextProps: TabGenericProps) {
    if (nextProps.selectedIndex && nextProps.selectedIndex !== this.state.activeIndex) {
      const newActiveTab = nextProps.selectedIndex
      if (newActiveTab !== this.state.activeIndex) {
        if (newActiveTab !== undefined && newActiveTab >= 0 && newActiveTab < this.props.tabs.length) {
          this.setState({activeIndex: nextProps.selectedIndex})
        }
      }
    }
  }

  onClick = (ev, idx) => {
    ev.preventDefault();
    this.setState({activeIndex: idx});
    this.props.tabs[idx].callback();
  }

  getTabs() {
    return this.props.tabs.map((tab, idx) => (
        <Button
          key={tab.title}
          onClick={(ev) => this.onClick(ev, idx)}
          className={this.state.activeIndex === idx ? 'selected' : ''}
        >
          {tab.title}
        </Button>
      )
    )
  }

  render() {
    return (
      <ThemeProvider theme={this.props.theme}>
        <Wrapper>
          <Container>
            {this.getTabs()}
          </Container>
        </Wrapper>
      </ThemeProvider>
    )
  }
}

export default TabGeneric
