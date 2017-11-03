import * as React from 'react'
import styled from 'styled-components'
import { withTheme } from 'styled-components'
import { Card, CardHeader } from 'material-ui/Card';
import MenuItem from 'material-ui/MenuItem';
import IconMenu from 'material-ui/IconMenu';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconButton from 'material-ui/IconButton';
import { AccountItem, defaultAccountItem, ConflictingPassword } from '../../../types/Accounts';
import ActivityPattern from '../../Common/ActivityPattern'
import { colorSchemes } from '../../Common/ActivityPattern'
import * as Theme from '../Theme'
import ConflictingPW from './ConflictingPassword'
import PrevPassword from './PrevPassword'
import LabledIcon from '../Common/LabeledIcon/index'
import StarIcon from '../../Common/StarIcon/StarIcon';
import { SpecialConstants } from '../../../types/Enums'

export interface AccountsDetailsProps {
  accountItem: AccountItem;

  handlers: {
    setFavorite: Function;
    addTag: Function;
    onConflictingPasswordClick: (accountId: number, password: ConflictingPassword) => void
  },
  theme: Theme.ThemeProps
}

const CardHeader1ChildrenDiv = styled.div`
  float: right;
`;
const CardText1 = styled.div`
  overflow: hidden;
  font-size: 100%;
  background-color: ${props => props.theme.detailsPane.bodyBgColor};
  color: inherit;
`;
const CardText1b = styled(CardText1)`
  padding-bottom: 16px;
`;
const CardTextWrap = styled.div`
  padding: 10px 10px 10px 15px;
`;
const ConflictingPasswords = styled(CardTextWrap)`
  min-height: 70px;
  border: solid 2px ${props => props.theme.genericTextColors.textColorLink};
  margin-bottom: 10px;
  background-color: ${props => props.theme.grid.bgColorRowActive};
`;
const SpanContainer = styled.div`
  margin-bottom: 10px;
`;
const SpanCaption = styled.span`
  color: ${props => props.theme.textColorPale};
  padding-right: 5px;
  float: left;
  width: 90px;
`;
const SpanText = styled.span`
  display: inline-block;
  color:  ${props => props.theme.textColor};
`;
const CardTextTitle = styled.h3`
  margin-bottom: 16px;
  margin-top: 0;
`;
const Card3Wrapper = styled.div`
  overflow: hidden;
  font-size: 100%;
`;
const Card3LeftDiv = styled.div`
  float: left;
  padding: 0 10px;
`;
const Card3RightDiv = styled.div`
  float: right;
`;
const Card2List = styled.div`
  height: 80px;
  overflow: hidden;
`;
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
const Card2TextSpan = styled.span`
  margin: 0;
  width: 100%;
  font-size: 1.2rem;
`;
const H4Styled = styled.h4`
  font-size: 1.2rem;
  margin: 0 0 8px 0; 
`;

const StarIconWrap = styled.span` 
  position: relative;
  bottom: 5px;
`;

const getStylesForMUIComponents = (props) => {

  return {
    card: {
      position: 'relative',
      height: '100%',
      width: '100%',
      margin: 'auto',
      backgroundColor: props.theme.detailsPane.bodyBgColor,
      padding: 10
    },
    cardHeader1: {
      backgroundColor: props.theme.detailsPane.headerBgColor,
      padding: 12,
      color: props.theme.textColor,
      display: 'block',
      height: SpecialConstants.detailsPaneHeaderHeight,
    },
    star: {
      fontSize: 14,
      position: 'relative',
      left: '3%',
    },
  }
};

const AccountsDetailsPane: React.SFC<AccountsDetailsProps> = (props) => {

  const accountItem = props.accountItem;

  const muiStyles = getStylesForMUIComponents(props);

  const conflictingPasswords = props.accountItem && props.accountItem.conflictedPasswords
    ? props.accountItem.conflictedPasswords
    : [];

  const prevPasswords = props.accountItem && props.accountItem.prevPasswords
    ? props.accountItem.prevPasswords
    : [];

  const onConflictingPasswordClick = (password: ConflictingPassword) => {
    props.handlers.onConflictingPasswordClick(accountItem.id, password);
  }

  const cardTitle = accountItem.service
    ? (
      <LabledIcon
        caption={props.accountItem.service.caption}
        fontSize={14}
        iconSize={20}
        labelColor={props.theme.genericTextColors.textColor}
        iconName={props.accountItem.service.key}
      />
    )
    : <span/>;

  const conflictingPasswordsRows = conflictingPasswords.map((item, index) => {
    return (
      <ConflictingPW
        key={index}
        conflictingPassword={item}
        onConflictingPasswordClick={onConflictingPasswordClick}
        theme={props.theme}
      />
    )
  })

  const prevPasswordsRows = prevPasswords.map((item, index) => {
    return (
      <PrevPassword
        key={index}
        password={item}
        theme={props.theme}
      />
    )
  })

  return (
    <div>
      <CardHeader
        title={cardTitle}
        style={muiStyles.cardHeader1}
        titleStyle={{color: props.theme.genericTextColors.textColor, fontSize: '160%', marginLeft: 20}}
      >
        <CardHeader1ChildrenDiv>
          <StarIconWrap>
            <StarIcon
              isFull={props.accountItem.isFavorite}
              callback={() => {props.handlers.setFavorite(props.accountItem.id, !props.accountItem.isFavorite)}}
            />
          </StarIconWrap>
          <IconMenu
            iconButtonElement={
                    (
                      <IconButton
                        style={{
                            width: 'auto',
                            height: 'auto',
                            padding: 0,
                            bottom: 3}}

                        iconStyle={{color: props.theme.genericTextColors.textColorPale}}
                      >
                        <MoreVertIcon style={{color: props.theme.genericTextColors.textColorPale}}/>
                      </IconButton>
                  )}
            anchorOrigin={{horizontal: 'left', vertical: 'top'}}
            targetOrigin={{horizontal: 'left', vertical: 'top'}}
          >
            <MenuItem primaryText={'Add tag'} onTouchTap={(event) => {props.handlers.addTag(accountItem.id)}}/>
          </IconMenu>
        </CardHeader1ChildrenDiv>
      </CardHeader>
      <Card style={muiStyles.card} containerStyle={{padding: 0}}>
        <CardText1>
          <CardTextWrap>
            <SpanContainer>
              <SpanCaption>Acount Name:</SpanCaption>
              <SpanText>{accountItem.accountName} </SpanText>
            </SpanContainer>
            <SpanContainer>
              <SpanCaption>Password:</SpanCaption>
              <SpanText>{accountItem.password.value}</SpanText>
            </SpanContainer>
          </CardTextWrap>
          <ConflictingPasswords>
            <CardTextTitle>Conflicting passwords</CardTextTitle>
            <H4Styled>Select password to display:</H4Styled>
            {conflictingPasswordsRows}
          </ConflictingPasswords>
        </CardText1>
      </Card>
      <Card style={muiStyles.card}>
        <CardText1b>
          <CardTextWrap>
            <CardTextTitle>Previous Passwords</CardTextTitle>
            <Card2List>
              <Card2ListRow>
                <Card2ListRowLeftColumn>
                  <Card2TextSpan>Password</Card2TextSpan>
                </Card2ListRowLeftColumn>
                <Card2ListRowRightColumn>
                  <Card2TextSpan>Last used</Card2TextSpan>
                </Card2ListRowRightColumn>
              </Card2ListRow>
              {prevPasswordsRows}
            </Card2List>
          </CardTextWrap>
        </CardText1b>
      </Card>
      <Card style={muiStyles.card}>
        <Card3Wrapper>
          <Card3LeftDiv>
            <CardTextTitle>Insights</CardTextTitle>
            <div>
              <span>Activity Pattern:</span>
            </div>
          </Card3LeftDiv>
          <Card3RightDiv>
            <ActivityPattern activityTable={accountItem.insights.activityPattern} colorScheme={colorSchemes.BLUE}/>
          </Card3RightDiv>
        </Card3Wrapper>
      </Card>
    </div>
  )
};

AccountsDetailsPane.defaultProps = {accountItem: defaultAccountItem};

export default withTheme(AccountsDetailsPane)
