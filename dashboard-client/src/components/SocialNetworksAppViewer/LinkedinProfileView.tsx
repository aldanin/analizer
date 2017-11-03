import * as React from 'react'
import styled from 'styled-components';
import { LinkedinProfile, TwitterId } from '../../types/SocialNetworks';
import LinkedinExperienceComponent from './LinkedinExperience';
import LinkedinEducation from './LinkedinEducation';
import LinkedinSkill from './LinkedinSkill';
import { TagId } from '../../types/Tag';
import { ActionMenuFunctions } from './index';

const ProfileView = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const TitleContainer = styled.div`
  font-size: 85%;
  margin-bottom: 10px;
`;

const Board = styled.div`
  background-color: ${prop => prop.theme.profileBgColor};
  border: 1px solid ${prop => prop.theme.messageBorderColor};
  margin-bottom: 20px;
`;

export interface LinkedinProfileViewProps extends React.Props<LinkedinProfileView> {
  data: LinkedinProfile
  setStar: (path: string[], id: TwitterId, isFavorite: boolean) => void;
  removeTag: (path: string[], id: TwitterId, tagId: TagId) => void;
  linkedinExperienceActionMenu: ActionMenuFunctions;
  linkedinEducationActionMenu: ActionMenuFunctions;
}
export interface LinkedinProfileViewState {
}

class LinkedinProfileView extends React.Component<LinkedinProfileViewProps, LinkedinProfileViewState> {
  constructor (props: LinkedinProfileViewProps) {
    super(props)

    this.state = {
    }
  }

  render() {
    return (
      <ProfileView>
        <TitleContainer>Experience</TitleContainer>
        <Board>
          {this.props.data.experience.map((item, idx) => {
            return (
              <LinkedinExperienceComponent
                key={idx}
                data={item}
                setStar={this.props.setStar}
                removeTag={this.props.removeTag}
                linkedinExperienceActionMenu={this.props.linkedinExperienceActionMenu}
              />)
          })}
        </Board>
        <TitleContainer>Education</TitleContainer>
        <Board>
          {this.props.data.education.map((item, idx) => {
            return (
              <LinkedinEducation
                key={idx}
                data={item}
                setStar={this.props.setStar}
                removeTag={this.props.removeTag}
                linkedinEducationActionMenu={this.props.linkedinEducationActionMenu}
              />)
          })}
        </Board>
        <TitleContainer>Featured Skills & Endorsements</TitleContainer>
        <Board>
          {this.props.data.skills.map((item, idx) => {
            return <LinkedinSkill data={item} key={idx}/>
          })}
        </Board>
      </ProfileView>
    )
  }
}

export default LinkedinProfileView
