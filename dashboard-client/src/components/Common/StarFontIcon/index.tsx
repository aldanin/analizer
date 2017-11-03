import * as React from 'react'
import { DEFAULT_THEME, ThemeProps } from './Theme';

export interface StarFontIconProps extends React.Props<any> {
  isFull: boolean;
  callback: () => void;
  lineHeight?: string;
  theme?: ThemeProps;
}

const StarFontIcon: React.SFC<StarFontIconProps> = ({ isFull, callback, theme, lineHeight }) => {

  const style = {
    color: isFull ? theme.fullStarFillColor : theme.emptyStarStrokeColor,
    cursor: 'pointer',
    display: 'inline-block',
    lineHeight: lineHeight,
  };

  return (
    <span
      onClick={() => {callback()}}
      style={style}
      className={isFull ? 'base_icons icon_star_full' : 'base_icons icon_star_empty'}
    />
  )
}

StarFontIcon.defaultProps = {
  theme: DEFAULT_THEME,
  lineHeight: '1.5',
}

export default StarFontIcon
