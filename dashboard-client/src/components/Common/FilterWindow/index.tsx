import * as React from 'react';
import * as Theme from '../ThemesGeneric/Filters'
import Popover from 'material-ui/Popover';
import { CSSProperties } from 'react';
import styled, { ThemeProvider } from 'styled-components';

interface ContainerProps {
  pointerPosition?: number
}

const Container = styled.div`
    min-width: 220px;
    max-width: 300px;
    position: relative;
    background-color: white;
    border-radius: 2px;
    // box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 6px, rgba(0, 0, 0, 0.12) 0px 1px 4px;
    margin-top: 10px;
    border: solid 1px #e2e2e2;
  
   &::before{
    left: ${(props: ContainerProps) => props.pointerPosition}
    width: 15px;
    top: -8px;
    height: 15px;
    background-color: inherit;
    position: absolute;
    content: " ";
    transform: rotate(45deg);
    border-top: solid 1px #e2e2e2;
    border-left: solid 1px #e2e2e2;
  }
`;

const Header = styled.div`
  padding: 20px;
  border-bottom: solid 1px ${props => props.theme.genericTextColors.borderColor};
`;

const Inner = styled.div`

`;

export interface FilterWindowProps extends React.Props<FilterWindow> {
  filterBody: JSX.Element;
  filterHeader: JSX.Element;
  pointerPosition?: number;
  iconStyle?: CSSProperties;
  sideToBeOpenHorizontal?: string;
  menuTrigger?: JSX.Element;
  theme?: Theme.ThemeProps;
}

export interface FilterWindowState {
  isWindowOpen: boolean;
  anchorEl: HTMLElement | null;
}

const style = {
  iconMenu: {},
  popover: {
    color: 'transparent',
    boxShadow: 'none',
    marginTop: -12
  }
}

class FilterWindow extends React.Component<FilterWindowProps, FilterWindowState> {
  static defaultProps: Partial<FilterWindowProps> = {
    sideToBeOpenHorizontal: 'left',
    pointerPosition: 10,
    iconStyle: null,
    theme: Theme.DEFAULT_THEME,
  }

  constructor(props: FilterWindowProps) {
    super(props);

    this.state = {
      isWindowOpen: false,
      anchorEl: null,
    };
  }

  handleTouchTap = (event) => {
    // This prevents ghost click.
    event.preventDefault();

    this.setState({
      isWindowOpen: true,
      anchorEl: event.currentTarget,
    });
  };

  handleRequestClose = () => {
    this.setState({
      isWindowOpen: false,
    });
  }

  render() {
    style.iconMenu = {
      color: 'gray',
      cursor: 'pointer',
    }
    return (
      <ThemeProvider theme={this.props.theme}>
        <div onClick={this.handleTouchTap}>
          {this.props.menuTrigger ? this.props.menuTrigger : (
              <span
                className="base_icons icon_menu"
                style={this.props.iconStyle !== null ? this.props.iconStyle : style.iconMenu}
              />)}
          <Popover
            open={this.state.isWindowOpen}
            anchorEl={this.state.anchorEl}
            anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
            targetOrigin={{horizontal: 'left', vertical: 'top'}}
            onRequestClose={this.handleRequestClose}
            style={style.popover}
          >
            <Container
              pointerPosition={this.props.pointerPosition}
            >
              <Header>
                {this.props.filterHeader}
              </Header>
              <Inner>
                {this.props.filterBody}
              </Inner>
            </Container>
          </Popover>
        </div>
      </ThemeProvider>
    );
  }
}

export default FilterWindow
