import * as React from 'react';
import styled from 'styled-components';

export interface LabledIconProps {
  caption: string;
  labelColor?: string;
  fontSize?: number;
  iconSize?: number;
  style?: any;
  iconName: string;
}

interface StyledImgProps {
  imageSize: number,
  src: string,
}
const StyledImg = styled.img`
  width: ${(props: StyledImgProps) => props.imageSize}px;
`;
const StyledLabel = styled.label`
  display: flex;
  align-items: center;
`;
const ImgWrap = styled.span`
`;
const TextWrap = styled.span`
  padding-left: 0.8em;
`;

const LabledIcon: React.SFC<LabledIconProps> = (props: LabledIconProps) => {

  const fontSize = props.fontSize || 18;
  const imageSize = props.iconSize || fontSize;
  const imagSrc = `../../../../svgimages/${props.iconName}.svg`;

  const style = Object.assign(
    {
      color: props.labelColor,
    },
    props.style);

  return (
    <StyledLabel style={style}>
      {props.iconName
        ?
        (
          <ImgWrap >
            <StyledImg src={imagSrc} imageSize={imageSize}/>
          </ImgWrap>
        )
        : {}
      }
      <TextWrap>{props.caption} </TextWrap>
    </StyledLabel>
  );
};

export default LabledIcon;
