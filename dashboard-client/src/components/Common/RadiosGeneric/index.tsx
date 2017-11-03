import * as React from 'react'
import styled from 'styled-components';
import { ThemeProvider } from 'styled-components';
import { RadiosThemeProps, DEFAULT_THEME } from './Theme';

const ActiveSpan = styled.span`
    background-color: ${prop => prop.theme.activeBgColor};
    color: ${prop => prop.theme.activeTextColor};
    border: 1px solid ${prop => prop.theme.activeBorderColor};
    border-radius: 20px;
    height: 90%;
    cursor: pointer;
    white-space: nowrap;
    padding: 0px 5px;
`;

const DisActiveSpan = styled.span`
    margin-right: 0;
    background-color: ${prop => prop.theme.disActiveBgColor};
    color: ${prop => prop.theme.disActiveTextColor};
    border: 1px solid ${prop => prop.theme.disActiveBorderColor};
    border-radius: 20px;
    height: 90%;
    white-space: nowrap;
    cursor: pointer;
    padding: 1px 5px;
`;

const Title = styled.span`
    font-size: 75%;
    font-weight: bold;
    text-align: center;
    position: relative;
    top: -1px;
    margin: 0;  
    white-space: nowrap;
`;

const TitleSpan = styled.span`
    margin-left: 2px;
`;

export interface RadiosDetail {
  title: string;
  icon?: JSX.Element;
  callback: () => void;
}

export interface RadiosGenericProps extends React.Props<RadiosGeneric> {
  radios: RadiosDetail[];
  initialSelectedIndex: number;
  selectedIndex?: number;
  theme?: RadiosThemeProps;
}

export interface RadiosGenericState {
  activeIndex: number;
}

class RadiosGeneric extends React.Component<RadiosGenericProps, RadiosGenericState> {
  static defaultProps: Partial<RadiosGenericProps> = {
    theme: DEFAULT_THEME,
  }

  constructor(props: RadiosGenericProps) {
    super(props)

    this.state = {
      activeIndex: this.props.initialSelectedIndex,
    }
  }

  componentWillReceiveProps(nextProps: RadiosGenericProps) {
    if (nextProps.selectedIndex && nextProps.selectedIndex !== this.state.activeIndex) {
      const newActiveRadio = nextProps.selectedIndex
      if (newActiveRadio !== this.state.activeIndex) {
        if (newActiveRadio !== undefined && newActiveRadio >= 0 && newActiveRadio < this.props.radios.length) {
          this.setState({activeIndex: nextProps.selectedIndex})
        }
      }
    }
  }

  getRadios() {
    return this.props.radios.map((tab, idx) =>
      this.state.activeIndex === idx ? (
          <ActiveSpan key={idx}>
            <Title>
              {this.props.radios[idx].icon || <span/>}
              <TitleSpan> {this.props.radios[idx].title} </TitleSpan>
            </Title>
          </ActiveSpan>) : (
          <DisActiveSpan
            key={idx}
            onClick={() => {this.setState({activeIndex: idx}); this.props.radios[idx].callback()}}
          >
            <Title>
              {this.props.radios[idx].icon || <span/>}
              <TitleSpan> {this.props.radios[idx].title} </TitleSpan>
            </Title>
          </DisActiveSpan>))
  }

  render() {
    return (
      <ThemeProvider theme={this.props.theme}>
        <div>
          {this.getRadios()}
        </div>
      </ThemeProvider>
    )
  }
}

export default RadiosGeneric
