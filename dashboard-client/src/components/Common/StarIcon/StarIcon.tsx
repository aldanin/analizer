import * as React from 'react'
import SvgIcon from 'material-ui/SvgIcon';
import { DEFAULT_THEME, ThemeProps } from './Theme';

export interface StarSvgProps extends React.Props<any> {
  isFull: boolean;
  callback: () => void;
  height?: string;
  width?: string;
  strokeWidth?: string;
  className?: string;
  theme?: ThemeProps;
}

const StarIcon: React.SFC<StarSvgProps> = ({ height, width, strokeWidth, isFull, callback, theme, className }) => {

  const style = {
    fill: isFull ? theme.fullStarFillColor : theme.emptyStarFillColor,
    stroke: isFull ? theme.fullStarStrokeColor : theme.emptyStarStrokeColor,
    strokeWidth,
    height,
    width,
    cursor: 'pointer',
  };

  return (
    /* tslint:disable:max-line-length*/
    <SvgIcon
      className={className}
      onClick={() => {callback()}}
      style={style}
      viewBox="0 0 48 48"
    >
      <path
        d="M37.9,48c-0.3,0-0.7-0.1-0.9-0.3L24,37.5L11,47.6c-0.5,0.4-1.2,0.4-1.8,0c-0.5-0.4-0.8-1.1-0.6-1.7l5-16.1  L0.6,20.1C0,19.7-0.2,19.1,0,18.4c0.2-0.6,0.8-1,1.4-1h16.1l5-16.5c0.4-1.3,2.5-1.3,2.9,0l5,16.5h16.1c0.6,0,1.2,0.4,1.4,1  c0.2,0.6,0,1.3-0.5,1.7l-13.1,9.7l5,16.2c0.2,0.6,0,1.3-0.6,1.7C38.5,47.9,38.2,48,37.9,48z"
      />
    </SvgIcon>
    /* tslint:enable:max-line-length */
  )
}

StarIcon.defaultProps = {
  strokeWidth: '3px',
  height: '18px',
  width: '18px',
  theme: DEFAULT_THEME,
  className: '',
}

export default StarIcon
