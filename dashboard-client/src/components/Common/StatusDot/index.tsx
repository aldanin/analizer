import * as React from 'react'

export interface StatusDotProps {
  color: string,
  disabled?: boolean,
  className?: string,
  style?: Object,
}

const StatusDot: React.SFC<StatusDotProps> = ({ color, disabled= false, className= '', style= {} }) => {
  const ownStyle = {
    color: (disabled ? 'gray' : color),
    fontSize: '1.6em',
    // verticalAlign: 'middle',
  }
  return (
    <span style={Object.assign({}, ownStyle, style)} className={className}>
      {disabled ? '\u25cb' : '\u25cf'}
    </span>
  )
}

export default StatusDot
