import * as React from 'react'
import styled, { withTheme } from 'styled-components';
import Checkbox from '../Common/Checkbox/index';
import * as Theme from './Theme'
import TagsList from '../Common/TagsList/index';
import CommentsContainer from './CommentsContainer';
import { NotebookPostData, UserData } from '../../types/Notebook';
import moment = require('moment');

const PostView = styled.div`
  width: 100%;
  height: 100%;
  padding: 2rem;
  text-align: left;
`;

const PostFrame = styled.div`
  width: 100%;
  height: auto;
  border-left: 1px solid ${prop => prop.theme.postBorderColor};
  border-bottom: 1px solid ${prop => prop.theme.postBorderColor};
  padding: 0 1.5rem;
`;

const PostHeader = styled.div`
  display: flex;
  flex: 1;
  width: 100%;
  position: relative;
  left: -2.5rem;
  margin-bottom: 1.5rem;
`;

const LeftHeader = styled.div`
  display: flex;
  flex: 3;
`;

const RightHeader = styled.div`
  display: flex;
  flex: 2;
  justify-content: flex-end;
  padding: 0.5rem 2rem 0 0;
`;

const UserIcon = styled.img`
  width: 4rem;
  height: 4rem;
  padding-right: 1.5rem;
`;

const PostDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: space-around;
`;

const AuthorContainer = styled.div`
  color: ${prop => prop.theme.textColor};
`;

const HourContainer = styled.div`
  color: ${prop => prop.theme.dateTextColor};
`;

const CheckboxContainer = styled.div`
  position: relative;
  top: -0.1rem;
  margin-right: 1rem;
`;

const ActionContainer = styled.span`
  color: ${prop => prop.theme.mentionTextColor};
  white-space: nowrap;
`;

const MentionContainer = styled.span`
  position: relative;
  top: -0.2rem;
  color: ${prop => prop.theme.mentionTextColor};
  margin-right: 0.5rem;
`;

const TagsContainer = styled.div`
  display: flex;
  margin-bottom: 1.5rem;
`;

const AddTagContainer = styled.div`
  margin-left: 1rem;
  position: relative;
  top: 0.6rem;
  color: ${prop => prop.theme.mentionTextColor};
`;

const PostContent = styled.div`
  padding-right: 3rem;
  color: ${prop => prop.theme.textColor};
  margin-bottom: 1rem;
`;

const AddCommentContainer = styled.div`
  display: flex;
  width: 100%;
  height: 6rem;
  position: relative;
  left: -1.5rem;
  padding: 1rem 1rem 1rem 2rem;
  box-sizing: border-box;
  backgroundColor: ${prop => prop.theme.commentBgColor};
  border-bottom: 1px solid ${prop => prop.theme.postBorderColor};
`;

const AddCommentIcon = styled.img`
  width: 4rem;
  height: 4rem;
  padding-right: 0.5rem;
`;

const AddCommentInput = styled.input`
  width: 100%;
  margin-right: 2rem;
  padding: 1rem;
  border: 1px solid ${prop => prop.theme.borderColor};
  
  &::placeholder {
    color: ${prop => prop.theme.placeHolderColor};
    font-style: italic;
  }
`;

export interface PostProps extends React.Props<Post> {
  post: NotebookPostData;
  user: UserData;
  theme?: Theme.ThemeProps;
}
export interface PostState {
}

class Post extends React.Component<PostProps, PostState> {
  static defaultProps: Partial<PostProps> = {
    theme: Theme.defaultTheme
  }

  constructor (props: PostProps) {
    super(props)

    this.state = {
    }
  }

  render() {
    return (
      <PostView>
        <PostFrame>
          <PostHeader>
            <LeftHeader>
            <CheckboxContainer>
              <Checkbox
                onCheck={() => null}
                size={'18px'}
                theme={this.props.theme.checkBoxTheme}
              />
            </CheckboxContainer>
            <UserIcon src={this.props.post.user.avatar}/>
            <PostDetailsContainer>
              <AuthorContainer>{this.props.post.user.name}</AuthorContainer>
              <HourContainer>{moment(this.props.post.timestamp).format('HH:mm')}</HourContainer>
            </PostDetailsContainer>
            </LeftHeader>
            <RightHeader>
              <MentionContainer>@</MentionContainer>
              <ActionContainer className="base_icons icon_menu"/>
            </RightHeader>
          </PostHeader>
          <TagsContainer>
            <TagsList
              callback={() => null}
              tags={this.props.post.tags}
            />
            <AddTagContainer>+add</AddTagContainer>
          </TagsContainer>
          <PostContent>
            {this.props.post.content}
          </PostContent>
          <AddCommentContainer>
            <AddCommentIcon src={this.props.user.avatar}/>
            <AddCommentInput placeholder="Add comment"/>
          </AddCommentContainer>
          <CommentsContainer comments={this.props.post.comments}/>
        </PostFrame>
      </PostView>
    )
  }
}

export default withTheme(Post)
