import * as React from 'react'
import { SkillData } from '../../types/SocialNetworks';
import styled from 'styled-components';
import SearchMarker from '../Common/SearchMarker/index';

const InfoBoard = styled.div`
  display: flex;
  padding: 13px;
  text-indent: 7px;
  border-bottom: 1px solid ${prop => prop.theme.borderColor};
  width: 100%;
`;

const SkillContainer = styled.div`
  color: ${prop => prop.theme.textColor};
  font-size: 70%;
  width: 18%;
`;

const LevelContainer = styled.div`
  color: ${prop => prop.theme.profileTextColor};
  font-size: 70%;
`;

export interface LinkedinSkillProps {
  data: SkillData;
}

const LinkedinSkill: React.SFC<LinkedinSkillProps> = ({ data }) => {
  return (
    <InfoBoard>
      <SkillContainer><SearchMarker>{data.title}</SearchMarker></SkillContainer>
      <LevelContainer><SearchMarker>{data.level}</SearchMarker></LevelContainer>
    </InfoBoard>
  )
}

export default LinkedinSkill
