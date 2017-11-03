import * as React from 'react'
import styled from 'styled-components'
import * as Theme from '../../Theme'
import * as IMCommon from 'common-interfaces/types/InstantMessaging'

export interface VideoWrapperProps {
  theme: Theme.ThemeProps,
  date: string,
  attachment: IMCommon.Attachment,
}

interface DetailsDivProps {
  color: string;
}

const CroppedVideo = styled.video`
  width: 130px;
  height: 130px;
`;
const DetailsDiv = styled.div`
  width: calc(100% - 135px);
  display: inline-block;
  margin-left: 5px;
  color: ${(props: DetailsDivProps) => props.color};
;`
const SizeDiv = styled.div`
  float: left;
;`
const DateDiv = styled.div`
  float: right;
  margin-left: 10px;
;`

const VideoWrapper: React.SFC<VideoWrapperProps> = (props) => {
  const theme = props.theme;
  const attachment = props.attachment;
  const size = props.attachment ? props.attachment.size + 'KB' : '';
  const date = props.date;

  const poster = null

  return (
    <div>
      <CroppedVideo width={130} height={130} controls={true} poster={poster}>
        <source src={attachment.path} type="video/mp4"/>
      </CroppedVideo>

      <DetailsDiv color={theme.genericTextColors.textColorPale}>
        <SizeDiv>{size}</SizeDiv>
        <DateDiv>{date}</DateDiv>
      </DetailsDiv>
    </div>
  )
}

export default VideoWrapper
