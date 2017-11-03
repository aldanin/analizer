import * as React from 'react'
import { ColumnDataProps } from '../../../Common/GridGeneric/definitions'
import Avatar from 'material-ui/Avatar';
import styled from 'styled-components'

interface StyleProps {
  color: string,
  backgroundColor: string
}

const DefaultSpan = styled.span`
  color: ${ (props: StyleProps) => props.color};
  background-color: ${(props: StyleProps) => props.backgroundColor};
  user-select: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  border-radius: 50%;
  height: 30px;
  width: 30px;
  font-weight: bold;
`;

const getAvatar = (avatar, theme: any) => {

  let JSX = avatar
    ? (
      <div ><Avatar size={30} src={avatar}/></div>
    )
    : (
      <DefaultSpan
        className={'base_icons icon_contacts'}
        color={theme.defaultAvatar.color}
        backgroundColor={theme.defaultAvatar.backgroundColor}
      />
    )

  return JSX;
};

const AvatarRenderer: React.SFC<ColumnDataProps> = (props) => {

  return getAvatar(props.rowData.avatar, props.additionalTheme);
}

export default AvatarRenderer
