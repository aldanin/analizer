import * as React from 'react'
import styled from 'styled-components'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import * as moment from 'moment'
import { Moment } from 'moment'
import * as Tooltip from 'rc-tooltip'
import 'rc-tooltip/assets/bootstrap_white.css'

const Container = styled.div`
  background: ${props => props.theme.controlsPanelBackground};
  color: ${props => props.theme.controlsPanelTextColor};
  display: inline-block;
  height: 35px;
  margin-top: 10px;
  line-height: 35px;
  border-radius: 5px;
`
const Text = styled.span`
  margin-right: 10px;
  vertical-align: middle;
  line-height: 30px;
`
const Arrow = styled.span`
  margin-right: 10px;
  vertical-align: middle;
  cursor: pointer;
  font-size: 1.1rem;

  &:first-child{
    margin-left: 10px;
  }
`
const Icon = styled.span`
  margin-right: 10px;
  font-size: 1.8rem;
  vertical-align: middle;
  cursor: pointer;
`
// FIXME: bg color should come from Theme
const TooltipContentContainer = styled.div`
  background-color: white;
`

export interface ControlsTimeProps extends React.Props<ControlsTime> {
  onNextClick: () => void,
  onPrevClick: () => void,
  currentTime: number,
}
export interface ControlsTimeState {
  isDatePickerOpen: boolean,
}

class ControlsTime extends React.Component<ControlsTimeProps, ControlsTimeState> {
  constructor (props: ControlsTimeProps) {
    super(props)

    this.state = {
      isDatePickerOpen: false
    }
  }

  handleDateChange = (date: Moment) => {
    // this.props.changeDate(date.unix());
    this.closeCalendar();
  }

  closeCalendar = () => {
    this.setState({
      isDatePickerOpen: false,
    })
  }

  onVisibleChange = (visible) => {
    this.setState({
      isDatePickerOpen: visible,
    });
  }

  getTooltipContent = () => {
    return (
      <TooltipContentContainer>
        <DatePicker
          selected={moment(this.props.currentTime)}
          onChange={this.handleDateChange}
          onClickOutside={this.closeCalendar}
          withPortal={false}
          inline={true}
        />
      </TooltipContentContainer>
    )
  }

  render() {
    return (
      <Container>
        <Arrow className="base_icons icon_arrow_left" onClick={this.props.onPrevClick}/>
        <Text>12/02/2017 12:09:43</Text>
        <Tooltip
          visible={this.state.isDatePickerOpen}
          onVisibleChange={this.onVisibleChange}
          trigger="click"
          overlay={this.getTooltipContent()}
          placement="top"
          arrowContent={<div className="rc-tooltip-arrow-inner"/>}
        >
          <Icon className="base_icons icon_calendar"/>
        </Tooltip>
        <Arrow className="base_icons icon_arrow_right" onClick={this.props.onNextClick}/>
      </Container>
    )
  }
}

export default ControlsTime
