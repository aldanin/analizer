import * as React from 'react'
import styled from 'styled-components';
import TagsList from '../Common/TagsList/index';
import { NotebookCommentData } from '../../types/Notebook';
import moment = require('moment');

const CommentView = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const CommentHeader = styled.div`
  display: flex;
  flex: 1;
  width: 100%;
  margin-bottom: 1rem;
`;

const UserIcon = styled.img`
  width: 4rem;
  height: 4rem;
  padding-right: 1.5rem;
`;

const CommentDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: space-around;
  margin-bottom: 1rem;
`;

const AuthorContainer = styled.div`
  color: ${prop => prop.theme.textColor};
`;

const HourContainer = styled.div`
  color: ${prop => prop.theme.dateTextColor};
`;

const CommentContent = styled.div`
  color: ${prop => prop.theme.textColor};
  margin-bottom: 1rem;
  padding-right: 3rem;
`;

const TagContainer = styled.div`
  padding-right: 3rem;
`;

export interface CommentProps {
  comment: NotebookCommentData;
}

const Comment: React.SFC<CommentProps> = ({ comment }) => {
  return (
    <CommentView>
      <CommentHeader>
        <UserIcon src={comment.user.avatar}/>
        <CommentDetailsContainer>
          <AuthorContainer>{comment.user.name}</AuthorContainer>
          <HourContainer>
            {moment(comment.timestamp).calendar(null, {
            sameDay: '[Today]',
            nextDay: '[Tomorrow]',
            lastDay: '[Yesterday]',
            lastWeek: '[Last] dddd'
            })}
            {moment(comment.timestamp).format(' [at] HH:mm')}
          </HourContainer>
        </CommentDetailsContainer>
      </CommentHeader>
      <CommentContent>
        {comment.content}
      </CommentContent>
      <TagContainer>
        <TagsList
          callback={() => null}
          tags={comment.tags}
          numberOfTagsToShow={100}
        />
      </TagContainer>
    </CommentView>
  )
}

export default Comment
