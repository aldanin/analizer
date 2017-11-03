import * as React from 'react'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import * as Theme from './Theme'

export interface TimespanDropDownProps {
  onChange: (value: number) => void;
  theme: Theme.ThemeProps
}
interface TimespanDropDownState {
  value: number;
}

class TimespanDropDown extends React.Component<TimespanDropDownProps, TimespanDropDownState> {

  constructor(props: TimespanDropDownProps) {
    super(props);
    this.state = {value: 1};
  }

  handleChange = (event, index, value) => {
    this.setState({value});
    this.props.onChange(value);
  };

  render() {

    const style = {
      fontSize: '1.2rem',
      width: 100,
      color: this.props.theme.genericTextColors.textColorPale,
      height: 25
    };

    return (
      <div style={{display: 'inline-block'}}>
        <SelectField
          style={style}
          labelStyle={{
            height: 25,
            lineHeight: '25px',
            color: this.props.theme.genericTextColors.textColorLink,
            padding : 0
          }}
          iconStyle={{height: 25}}
          onChange={this.handleChange}
          underlineStyle={{display: 'none'}}
          value={this.state.value}
        >
          <MenuItem value={1} primaryText="Last month"/>
          <MenuItem value={2} primaryText="Last week"/>
        </SelectField>
      </div>
    )
  }
}

export default TimespanDropDown
