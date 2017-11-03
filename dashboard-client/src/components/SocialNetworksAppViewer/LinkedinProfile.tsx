import * as React from 'react'
import styled from 'styled-components';
import Avatar from 'material-ui/Avatar';
import ListItem from 'material-ui/List/ListItem';
import { LinkedinData } from '../../types/SocialNetworks';
import SearchMarker from '../Common/SearchMarker/index';

const Profile = styled.div`
  background-color: ${prop => prop.theme.profileBgColor};
  margin-left: 2%;
  width: 96%;
  height: 18%;
  border-bottom: 1px solid ${prop => prop.theme.borderColor};
  display: flex;
  margin-bottom: 2%;
`;

const ProfileImageContainer = styled.div`
  position: relative;
  left: -7%;
  top: 3%;
  width: 50%;
`;

const ProfileInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  height: 100%;
`;

const ProfileNameContainer = styled.div`
  color: ${prop => prop.theme.textColor};
  position: relative;
  left: -18%;
  top: 16px;
  margin-bottom: 15px;
`;

const ProfileRow = styled.div`
  display: flex;
  width: 100%;
  position: relative;
  left: -18%;
  top: 10px;
`;

const InfoContainerUser = styled.div`
  position: relative;
  top: 6%;
  color: ${prop => prop.color};
  width: 90%;
  font-size: 70%;
  white-space: nowrap;
  overflow:hidden !important;
  text-overflow: ellipsis;
`;

const InfoContainer = styled.div`
  position: relative;
  color: ${prop => prop.theme.profileTextColor};
  width: 90%;
  font-size: 70%;
  white-space: nowrap;
  overflow:hidden !important;
  text-overflow: ellipsis;
`;

const style = {
  profilePicture: {
    marginLeft: '5%',
    maxWidth: '70%',
    width: 'auto',
    height: 'auto',
  }
}

export interface LinkedinProfileProps extends React.Props<LinkedinProfile> {
  data: LinkedinData;
}
export interface LinkedinProfileState {
}

class LinkedinProfile extends React.Component<LinkedinProfileProps, LinkedinProfileState> {
  constructor (props: LinkedinProfileProps) {
    super(props)

    this.state = {
    }
  }

  render() {
    return (
      <Profile>
        <ProfileImageContainer>
          <ListItem
            disabled={true}
            leftAvatar={(
              <Avatar
                src={this.props.data.user.avatar}
                style={style.profilePicture}
              />
            )}
          />
        </ProfileImageContainer>
        <ProfileInfoContainer>
          <ProfileNameContainer><SearchMarker>{this.props.data.user.name}</SearchMarker></ProfileNameContainer>
          <ProfileRow>
            <InfoContainerUser><SearchMarker>{this.props.data.headline}</SearchMarker></InfoContainerUser>
          </ProfileRow>
          <ProfileRow>
            <InfoContainer><SearchMarker>{this.props.data.currentPosition}</SearchMarker></InfoContainer>
          </ProfileRow>
        </ProfileInfoContainer>
      </Profile>
    )
  }
}

export default LinkedinProfile
