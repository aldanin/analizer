import * as React from 'react'
import * as AppSymbols from '../../../types/AppSymbols'
// const image = require('./svgimages/amazon.svg');

export interface KnownIconsProps {
  appSymbol: AppSymbols.AppSymbol
  style?: any
}

const KnownIcon: React.SFC<KnownIconsProps> = (props) => {
  // const imagSrc = `./svgimages/${props.appSymbol.icon}.svg`;
  const icon = props.appSymbol.icon || props.appSymbol.key;
  const imagSrc = `../../../../svgimages/${icon}.svg`;
  return (
    <img src={imagSrc} style={props.style}/>
  )
}

KnownIcon.defaultProps = {style: {width: '1.8rem'}};

export default KnownIcon;
