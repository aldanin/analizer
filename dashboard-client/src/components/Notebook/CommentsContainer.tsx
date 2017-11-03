import * as React from 'react'
import styled from 'styled-components';
import Comment from './Comment';
import { NotebookCommentData } from '../../types/Notebook';

const CommentsView = styled.div`
  width: 100%;
  height: auto;
  padding: 2rem;
  background-color: ${prop => prop.theme.commentBgColor};
  position: relative;
  left: -1.5rem;
`;

const CommentsIndicator = styled.div`
  color: ${prop => prop.theme.dateTextColor};
  margin-bottom: 1rem;
`;

export interface CommentsContainerProps {
  comments: NotebookCommentData[];
}

const CommentsContainer: React.SFC<CommentsContainerProps> = ({ comments }) => {
  return (
    <CommentsView>
      <CommentsIndicator>{comments.length} comments</CommentsIndicator>
      {comments.map((comment, idx) => {
        return <Comment key={idx} comment={comment}/>
      })}

    </CommentsView>
  )
}

export default CommentsContainer
