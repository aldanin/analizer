import * as React from 'react'
import * as Theme from '../Theme'
import { PasswordItem } from '../../../types/Accounts'
import styled from 'styled-components'
import * as Helpers from '../Helpers_Formatters'

export interface PrevPasswordProps {
  password: PasswordItem;
  key: number;
  theme: Theme.ThemeProps;
}

const Card2ListRow = styled.div`
  margin-bottom: 8px;
`;
const Card2ListRowLeftColumn = styled.div`
  display: inline-block;
  height: 100%;
  width: 100px;
  margin-right: 30px;
`;
const Card2ListRowRightColumn = styled.div`
  display: inline-block;
  height: 100%;
  width: 140px;
`;
const TextSpan = styled.span`
  margin: 0;
  width: 100%;
  font-size: 1.2rem;
`;

const PrevPassword: React.SFC<PrevPasswordProps> = (props) => {

  return (
    <Card2ListRow>
      <Card2ListRowLeftColumn>
        <TextSpan>{props.password.value}</TextSpan>
      </Card2ListRowLeftColumn>
      <Card2ListRowRightColumn>
        <TextSpan>{Helpers.msToDateString(props.password.lastUsed)}</TextSpan>
      </Card2ListRowRightColumn>
    </Card2ListRow>
  )
}

export default PrevPassword
