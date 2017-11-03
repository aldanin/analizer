import * as React from 'react'
import * as Theme from './Theme'
import styled, { ThemeProvider } from 'styled-components';
import AuthorFilter from '../InformationPanelView/AuthorFilter';
import TimelinePosts from './TimelinePosts';
import { NotebookData, NotebookPostData } from '../../types/Notebook';
import { groupPostsByDays } from './Logic';

const NotebookView = styled.div`
  width: 100%;
  height: 100%;
`;

const FilterContainer = styled.div`
  display: flex;
  width: 100%;
  height: 4rem;
  background-color: ${prop => prop.theme.filterBgColor};
  color: ${prop => prop.theme.filterAuthorTextColor};
  padding: 1rem;
  box-sizing: border-box;
  font-size: 1.4rem;
`;

const LeftFlexContainer = styled.div`
  display: flex;
  flex: 1;
  justify-content: flex-start;
  width: 70%;
  height: 100%;
`;

const RightFlexContainer = styled.div`
  display: flex;
  flex: 1;
  justify-content: flex-end;
  width: 30%;
  height: 100%;
`;

const FilterIcon = styled.span`
  line-height: 2.5rem;
  margin-right: 0.5rem;
`;

const FilterAuthor = styled.span`
  line-height: 2.5rem;
`;

const NumberOfPosts = styled.span`
  line-height: 2.5rem;
`;

const PostsIcon = styled.span`
  line-height: 2.5rem;
  margin-left: 1rem;
  font-size: 70%;
`;

const IndicatorContainer = styled.div`
  margin-top: 2rem;
  display: flex;
  width: 100%;
  height: 2rem;
  box-sizing: border-box;
  font-size: 1.2rem;
  color: ${prop => prop.theme.indicatorColor};
`;

const SelectedContainer = styled.span`
  margin-right: 1.5rem;
`;

const ClearContainer = styled.span`
  color: ${prop => prop.theme.clearSelectedTextColor};
  font-weight: bold;
`;

const MentionContainer = styled.span`
  position: relative;
  top: -0.2rem;
  color: ${prop => prop.theme.mentionTextColor};
`;

const ShareContainer = styled.span`
  color: ${prop => prop.theme.mentionTextColor};
  margin-left: 0.5rem;
  padding: 0 2rem 0 0;
`;

const NewPostContainer = styled.div`
  margin-top: 1.5rem;
  display: flex;
  width: 100%;
  box-sizing: border-box;
  font-size: 1.2rem;
  color: ${prop => prop.theme.indicatorColor};
  margin-bottom: 3.5rem;
`;

const UserIcon = styled.img`
  width: 4rem;
  height: 4rem;
  padding-right: 0.5rem;
`;

const NewPostInput = styled.input`
  width: 100%;
  margin-right: 2rem;
  padding: 1rem;
  border: 1px solid ${prop => prop.theme.borderColor};
  
  &::placeholder {
    color: ${prop => prop.theme.placeHolderColor};
    font-style: italic;
  }
`;

export interface NotebookProps extends React.Props<Notebook> {
  data: NotebookData,
  theme?: Theme.ThemeProps
}
export interface NotebookState {
}

export class Notebook extends React.Component<NotebookProps, NotebookState> {
  static defaultProps: Partial<NotebookProps> = {
    theme: Theme.defaultTheme
  }

  allPostsInGroupsByDays: NotebookPostData[][];

  constructor (props: NotebookProps) {
    super(props)

    this.allPostsInGroupsByDays = []

    this.state = {
    }
  }

  componentWillMount() {
    this.allPostsInGroupsByDays = groupPostsByDays(this.props.data.posts);
  }

  render() {
    return (
      <ThemeProvider theme={this.props.theme}>
        <NotebookView>
          <FilterContainer>
            <LeftFlexContainer>
              <FilterIcon className="base_icons icon_filter"/>
              <FilterAuthor>Author:</FilterAuthor>
              <AuthorFilter/>
            </LeftFlexContainer>
            <RightFlexContainer>
              <NumberOfPosts>{this.props.data.numberOfPosts} items</NumberOfPosts>
              <PostsIcon className="base_icons icon_arrow_double_down"/>
            </RightFlexContainer>
          </FilterContainer>
          <IndicatorContainer>
            <LeftFlexContainer>
              <SelectedContainer>0 selected</SelectedContainer>
              <ClearContainer>Clear</ClearContainer>
            </LeftFlexContainer>
            <RightFlexContainer>
              <MentionContainer>@</MentionContainer>
              <ShareContainer>Share</ShareContainer>
            </RightFlexContainer>
          </IndicatorContainer>
          <NewPostContainer>
            <UserIcon src={this.props.data.user.avatar}/>
            <NewPostInput placeholder="Add a new item"/>
          </NewPostContainer>
          {this.allPostsInGroupsByDays.map((group, idx) => {
            return <TimelinePosts key={idx} posts={group} timestamp={group[0].timestamp} user={this.props.data.user}/>
          })}
        </NotebookView>
      </ThemeProvider>
    )
  }
}
