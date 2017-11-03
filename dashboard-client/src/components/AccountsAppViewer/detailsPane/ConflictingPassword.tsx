import * as React from 'react'
import * as Theme from '../Theme'
import { ConflictingPassword, PasswordAction } from '../../../types/Accounts'
import styled from 'styled-components'
import * as Helpers from '../Helpers_Formatters'

export interface ConflictingPwProps {
  conflictingPassword: ConflictingPassword;
  key: number;
  onConflictingPasswordClick: (password: ConflictingPassword) => void;
  theme?: Theme.ThemeProps;
}

const Container = styled.div`
  margin-bottom: 8px;
  font-size: 1.2rem;
`;
const LeftDiv = styled.div`
  display: inline-block;
  height: 100%;
  width: 80px;
  margin-right: 30px;
`;
const RightDiv = styled.div`
  display: inline-block;
  height: 100%;
  width: 210px;
`;
const InnerSpan = styled.span`
  margin: 0;
  width: 100%;
  font-size: 1.2rem;
`;
const InnerSpanPW = styled(InnerSpan)`
  color: ${props => props.theme.textColorLink};
  cursor: pointer;
`;
const InnerSpanDate = styled(InnerSpan)`
  color: ${props => props.theme.textColorPale};
`;

const ConflictingPW: React.SFC<ConflictingPwProps> = (props) => {

  const dateText = Helpers.msToDateString(props.conflictingPassword.actionDate);
  let actionText;

  switch (props.conflictingPassword.actionStatus) {
    case PasswordAction.extracted:
      actionText = `Extracted on ${ dateText}`;
      break;
    case PasswordAction.manuallyAdded:
      actionText = `Manually added on ${dateText}`;
      break;
    default:
      actionText = '';
      break;
  }
  //
  // Send the selected password in this conflict up the props chain:
  //
  const onConflictingPasswordClick = (ev) =>
    props.onConflictingPasswordClick(props.conflictingPassword);

  return (
    <Container>
      <LeftDiv>
        <InnerSpanPW onClick={onConflictingPasswordClick}>
          {props.conflictingPassword.value}
        </InnerSpanPW>
      </LeftDiv>
      <RightDiv>
        <InnerSpanDate>{actionText}</InnerSpanDate>
      </RightDiv>
    </Container>
  )
}

export default ConflictingPW
