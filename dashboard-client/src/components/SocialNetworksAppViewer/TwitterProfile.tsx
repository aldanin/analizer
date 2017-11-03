import * as React from 'react'
import styled, { withTheme } from 'styled-components';
import Avatar from 'material-ui/Avatar';
import ListItem from 'material-ui/List/ListItem';
import { TwitterData } from '../../types/SocialNetworks';
import { ThemeProps } from './Theme';
import moment = require('moment');
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
  top: 8%;
  margin-bottom: 9%;
`;

const ProfileRow = styled.div`
  display: flex;
  width: 100%;
  height: 20%;
  position: relative;
  left: -18%;
`;

const IconContainer = styled.div`
  color: ${prop => prop.theme.profileTextColor};
  width: 10%;
  font-size: 70%;
  margin-right: 5%;
`;

const InfoContainerUser = styled.div`
  position: relative;
  top: 6%;
  color: ${prop => prop.theme.profileTextColor};
  width: 90%;
  font-size: 60%;
  white-space: nowrap;
  overflow:hidden !important;
  text-overflow: ellipsis;
`;

const InfoContainer = styled.div`
  position: relative;
  color: ${prop => prop.theme.profileTextColor};
  width: 90%;
  font-size: 60%;
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

export interface ProfileProps extends React.Props<TwitterProfile> {
  data: TwitterData;
  theme?: ThemeProps;
}
export interface ProfileState {
}

class TwitterProfile extends React.Component<ProfileProps, ProfileState> {
  constructor (props: ProfileProps) {
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
            <IconContainer><SearchMarker>@</SearchMarker></IconContainer>
            <InfoContainerUser><SearchMarker>{this.props.data.user.nickname}</SearchMarker></InfoContainerUser>
          </ProfileRow>
          <ProfileRow>
            <IconContainer className="material-icons"><SearchMarker>location_on</SearchMarker></IconContainer>
            <InfoContainer>
              <SearchMarker>{this.props.data.location.city}, {this.props.data.location.country}</SearchMarker>
            </InfoContainer>
          </ProfileRow>
          <ProfileRow>
            <IconContainer className="material-icons"><SearchMarker>date_range</SearchMarker></IconContainer>
            <InfoContainer>
              <SearchMarker>Joined, {moment(this.props.data.joinedDate).format('MMM. YYYY')}</SearchMarker>
            </InfoContainer>
          </ProfileRow>
        </ProfileInfoContainer>
      </Profile>
    )
  }
}

export default withTheme(TwitterProfile)
