import * as React from 'react'
import { CheckboxThemeProps, DEFAULT_THEME } from './Theme';
import FontIcon from 'material-ui/FontIcon';
import styled, { ThemeProvider } from 'styled-components';
import * as Helpers from '../../../helpers/General'

const DEFAULT_BOX_SIZE = 14

const Wrapper = styled.div`
    position: relative;
`

interface BoxProps {
  sideLength: string;
}
const Box = styled.div`
  display: inline-block;
  height: ${(prop: BoxProps) => prop.sideLength};
  width: ${(prop: BoxProps) => prop.sideLength};
  border: 1px solid ${prop => prop.theme.borderColor};
  background-color: ${prop => prop.theme.bgColor};
  vertical-align: middle;
  cursor: pointer;
`

interface CheckMarkProps {
  color: string;
  position: PositionProps;
  fontSize: string;
}
const CheckMark = styled.span`
  color: ${(prop: CheckMarkProps) => prop.color};
  display: inline-block;
  position: absolute;
  top: ${(prop: CheckMarkProps) => prop.position.top};
  left: ${(prop: CheckMarkProps) => prop.position.left};
  font-size: ${(prop: CheckMarkProps) => prop.fontSize};
`

interface PositionProps {
  top: string;
  left: string;
}

export interface CheckboxProps extends React.Props<Checkbox> {
  size?: string;
  fontSize?: string,
  positionOfCheckMark?: PositionProps;
  onCheck: (isChecked: boolean) => void;
  isChecked?: boolean;
  setChecked?: boolean // For owner's use
  initialState?: boolean;
  theme?: CheckboxThemeProps;
}

export interface CheckboxState {
  isChecked: boolean;
}

class Checkbox extends React.Component<CheckboxProps, CheckboxState> {
  static defaultProps: Partial<CheckboxProps> = {
    theme: DEFAULT_THEME,
    isChecked: false,
    setChecked: null,
    initialState: false,
    size: DEFAULT_BOX_SIZE + 'px',
    fontSize: null,
    positionOfCheckMark: null,
  }

  innerFontSize: string;
  innerPositionOfCheckMark: PositionProps;

  constructor(props: CheckboxProps) {
    super(props)

    this.state = {
      isChecked: this.props.initialState,
    }
  }

  calcFontSizeAndPositionOfCheckMark() {
    const size = parseInt(this.props.size, 10);
    this.innerFontSize = this.props.fontSize !== null ? this.props.fontSize : size - 1 + 'px';
    this.innerPositionOfCheckMark = this.props.positionOfCheckMark !== null ?
      this.props.positionOfCheckMark : {
        top: '1px',
        left: '0.5px',
      }
  }

  componentWillMount() {
    this.calcFontSizeAndPositionOfCheckMark();

    if (!Helpers.isNullOrUndefined(this.props.setChecked)) {
      this.setState({
        isChecked: this.props.setChecked
      })
    }
  }

  componentWillReceiveProps(nextProps: CheckboxProps) {
    this.calcFontSizeAndPositionOfCheckMark();

    if (!Helpers.isNullOrUndefined(nextProps.setChecked)) {
      this.setState({
        isChecked: nextProps.setChecked
      })
    }
  }

  shouldComponentUpdate(nextProps: CheckboxProps, nextState: CheckboxState) {
    return nextProps != null && nextProps !== undefined;
  }

  render() {
    return (
      <ThemeProvider theme={this.props.theme}>
        <Wrapper>
          <Box
            sideLength={this.props.size}
            onClick={() => {
              this.props.onCheck(!this.state.isChecked);
              this.setState({isChecked: !this.state.isChecked});
            }}
          >
            {this.state.isChecked ? (
                <FontIcon style={{float: 'left'}}>
                  <CheckMark
                    className="material-icons"
                    color={this.props.theme.textColor}
                    position={this.innerPositionOfCheckMark}
                    fontSize={this.innerFontSize}
                  >
                    done
                  </CheckMark>
                </FontIcon>) : null}
          </Box>
        </Wrapper>
      </ThemeProvider>
    )
  }
}

export default Checkbox
