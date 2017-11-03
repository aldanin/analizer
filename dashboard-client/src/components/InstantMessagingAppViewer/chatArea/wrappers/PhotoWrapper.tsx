import * as React from 'react'
import styled from 'styled-components'
import * as Theme from '../../Theme'
import * as IMCommon from 'common-interfaces/types/InstantMessaging'

export interface PhotoWrapperProps {
  theme: Theme.ThemeProps,
  date: string,
  attachment: IMCommon.Attachment,
}

const PhotoWrapper: React.SFC<PhotoWrapperProps> = (props) => {
  const theme = props.theme;
  const attachment = props.attachment;
  const size = props.attachment ? props.attachment.size + 'KB' : '';
  const date = props.date;

  const CroppedImage = styled.img` 
    object-fit: cover;
    width: 130px;
    height: 130px;
  `;
  const DetailsDiv = styled.div`
    width: calc(100% - 135px);
    display: inline-block;
    margin-left: 5px;
    color: ${theme.genericTextColors.textColorPale};
  ;`
  const SizeDiv = styled.div`
    float: left;
  ;`
  const DateDiv = styled.div`
    float: right; 
    margin-left: 10px;
  ;`

  return (
    <div>
      <CroppedImage src={attachment.path}/>
      <DetailsDiv>
        <SizeDiv>{size}</SizeDiv>
        <DateDiv>{date}</DateDiv>
      </DetailsDiv>
    </div>
  )
}

export default PhotoWrapper
