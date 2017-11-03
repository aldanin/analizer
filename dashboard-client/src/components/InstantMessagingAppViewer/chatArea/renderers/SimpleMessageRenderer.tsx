import * as React from 'react'
import { TagId } from '../../../../types/Tag'
import TagsWrapper from '../wrappers/TagsWrapper'
import { ThemeProvider } from 'styled-components';
import { MessageRendererProps } from './common'
import * as Common from './common'
import * as Helpers from '../../../../helpers/Formatters'
import { DateFormats } from '../../../../helpers/enums'

const SimpleMessageRenderer: React.SFC<MessageRendererProps> = (props) => {
  const chatMessage = props.chatMessage;
  const date = Helpers.msToDateString(chatMessage.timestamp, DateFormats.timeOnly);
  const senderIsTarget = chatMessage.from.id !== null && chatMessage.from.id !== undefined;
  const theme = props.theme;

  const borderColor = senderIsTarget ? theme.seperationBorderPale : theme.seperationBorder;

  return (
    <ThemeProvider theme={props.theme}>
      <Common.Container>
        {Common.getHeader(props)}
        <Common.MessageWrap>
          <Common.MessageText>{Helpers.addSearchMarker(true, props.chatMessage.body)}</Common.MessageText>
          <Common.DateText>{date}</Common.DateText>
        </Common.MessageWrap>
        <TagsWrapper
          tags={props.chatMessage.tags}
          removeTag={(tagId: TagId) => {
            props.removeTag(chatMessage.id, tagId)
          }}
          borderColor={borderColor}
          theme={props.theme}
        />
      </Common.Container>
    </ThemeProvider>
  )
}

export default SimpleMessageRenderer
