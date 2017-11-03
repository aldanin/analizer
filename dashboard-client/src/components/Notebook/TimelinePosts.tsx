import * as React from 'react'
import styled from 'styled-components';
import Post from './Post';
import { NotebookPostData, UserData } from '../../types/Notebook';
import moment = require('moment');

const TimeLineView = styled.div`
  display: block;
  width: 100%;
  height: auto;
  text-align: center;
  font-size: 1.3rem;
  color: ${prop => prop.theme.dateTextColor};
  margin-bottom: 5rem;
`;

const HeaderBorder = styled.div`
  border-top: 1px solid ${prop => prop.theme.borderColor};
  position: relative;
  left: -1rem;
  width: 350px;
`;

const DateContainer = styled.div`
  background-color: white;
  position: relative;
  display: inline-block;
  top: -0.8rem;
  width: auto;
  padding: 0 0.5rem;
`;

export interface TimeLinePostsProps extends React.Props<TimeLinePosts> {
  posts: NotebookPostData[],
  user: UserData;
  timestamp: number,
}
export interface TimeLinePostsState {
}

class TimeLinePosts extends React.Component<TimeLinePostsProps, TimeLinePostsState> {
  constructor (props: TimeLinePostsProps) {
    super(props)

    this.state = {
    }
  }

  render() {
    return (
      <TimeLineView>
        <HeaderBorder/>
        <DateContainer>{moment(this.props.timestamp).calendar(null, {
            sameDay: '[Today]',
            nextDay: '[Tomorrow]',
            lastDay: '[Yesterday]',
            lastWeek: '[Last] dddd'
          })}
        </DateContainer>
        {this.props.posts.map((post, idx) => {
          return <Post key={idx} post={post} user={this.props.user}/>
        })}
      </TimeLineView>
    )
  }
}

export default TimeLinePosts
