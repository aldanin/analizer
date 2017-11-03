import * as React from 'react'
import styled from 'styled-components'
import * as Tooltip from 'rc-tooltip'
import 'rc-tooltip/assets/bootstrap_white.css'
import * as moment from 'moment'

const TooltipContent = styled.div`
  color: ${props => props.theme.infoTextColor};
`
const HighlightText = styled.span`
  color: ${props => props.theme.infoTextHighlight};
`

export interface ClickDotProps extends React.Props<ClickDot> {
  top: string,
  left: string,
  text: string,
  clickTime: number, // timestamp
  intervalTime: number, // ms
  size?: string,
  className?: string,
}
export interface ClickDotState {
}

class ClickDot extends React.Component<ClickDotProps, ClickDotState> {
  static defaultProps: Partial<ClickDotProps> = {
    size: '40px',
  }

  constructor (props: ClickDotProps) {
    super(props)

    this.state = {
    }
  }

  getTooltipContent = (clickTime, interval) => {
    const duration = moment.duration(interval)
    const hours = ('00' + duration.hours()).slice(-2)
    const minutes = ('00' + duration.minutes()).slice(-2)
    const seconds = ('00' + duration.seconds()).slice(-2)
    return (
      <TooltipContent>
        Mouse Click: <HighlightText>{moment(clickTime).format('DD/MM/YYYY HH:mm')}</HighlightText><br/>
        Time interval from screenshot: <HighlightText>{`${hours}:${minutes}:${seconds}`}</HighlightText>
      </TooltipContent>
    )
  }

  render() {
    const {className} = this.props;
    return (
      <Tooltip
        placement="top"
        overlay={this.getTooltipContent(this.props.clickTime, this.props.intervalTime)}
        arrowContent={<div className="rc-tooltip-arrow-inner"/>}
      >
        <div className={className}/>
      </Tooltip>
    )
  }
}

const StyledDot = styled(ClickDot)`
  color: ${props => props.theme.clickDot.textColor || 'white'};
  font-weight: bold;
  font-size: 1.8rem;
  display: block;
  position: absolute;
  transform: translate(-50%, -50%);
  top: ${props => props.top};
  left: ${props => props.left};
  width: ${props => props.size};
  height: ${props => props.size};
  border-radius: 50%;
  background-color: ${props => props.theme.clickDot.bgColor || 'rgba(0,0,255,0.5)'};
  padding: 15px;
  box-shadow: 0 0 15px rgba(0,0,0,0.7);
  transition: opacity 0.3s;
  opacity: 1;
  &::after {
    content: '${props => props.text}';
    width: 100%;
    height: 100%;
    background-color: ${props => props.theme.clickDot.bgColor || 'rgba(0,0,255,0.2)'};
    display: block;
    text-align: center;
    line-height: ${props => props.size};
    border-radius: 50%;
    box-shadow: 0 0 15px rgba(0,0,0,0.5);
  }
  &:hover {
    opacity: 0.4;
  }
`
StyledDot.defaultProps = {
  size: '40px',
  theme: {
    bgColor: 'rgba(0,0,255,0.8)',
    textColor: 'white',
  }
}

export default StyledDot
