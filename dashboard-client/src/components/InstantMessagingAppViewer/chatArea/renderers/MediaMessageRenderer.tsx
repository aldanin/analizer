import * as React from 'react'
import * as Tags from '../../../../types/Tag'
import TagsWrapper from '../wrappers/TagsWrapper'
import PhotoWrapper from '../wrappers/PhotoWrapper'
import VideoWrapper from '../wrappers/VideoWrapper'
import { ThemeProvider } from 'styled-components'
import { MessageRendererProps } from './common'
import * as Common from './common'
import * as Helpers from '../../../../helpers/Formatters'
import { DateFormats } from '../../../../helpers/enums'

const MediaMessageRenderer: React.SFC<MessageRendererProps> = (props) => {
  const chatMessage = props.chatMessage;
  const attachments = chatMessage.attachments || [];
  const date = Helpers.msToDateString(chatMessage.timestamp, DateFormats.timeOnly);
  const senderIsTarget = chatMessage.from.id !== null && chatMessage.from.id !== undefined;
  const theme = props.theme;

  // const media = attachments[0];

  const borderColor = senderIsTarget ? theme.seperationBorderPale : theme.seperationBorder;

  const mediaRapperList = attachments.map((attachment, index) => {
    let wrapper;

    switch (attachment.type) {
      case 'image':
        wrapper = (
          <PhotoWrapper
            key={index}
            theme={theme}
            date={date}
            attachment={attachment}
          />
        )
        break;
      case 'video':
        wrapper = (
          <VideoWrapper
            key={index}
            theme={theme}
            date={date}
            attachment={attachment}
          />
        )
        break;
      case 'audio':
        break;
      default:
        break;
    }
    return wrapper;
  })

  return (
    <ThemeProvider theme={props.theme}>
      <Common.Container>
        {Common.getHeader(props)}
        <div>
          <Common.MessageText>{Helpers.addSearchMarker(true, props.chatMessage.body)}</Common.MessageText>
        </div>
        <Common.MediaContainerDiv>
          {mediaRapperList}
        </Common.MediaContainerDiv>
        <TagsWrapper
          tags={props.chatMessage.tags}
          removeTag={(tagId: Tags.TagId) => {
            props.removeTag(chatMessage.id, tagId)
          }}
          borderColor={borderColor}
          theme={props.theme}
        />
      </Common.Container>
    </ThemeProvider>
  )
}

export default MediaMessageRenderer
