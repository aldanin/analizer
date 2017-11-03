import * as React from 'react'
import styled, { withTheme } from 'styled-components';
import { defaultTheme, ThemeProps } from './Theme';
import Checkbox from '../Common/Checkbox/index';
import { accountId } from '../../types/Calendar';
import * as Tooltip from 'rc-tooltip';
import SearchMarker from '../Common/SearchMarker/index';

interface AccountFilterProp {
  numberOfAccounts: number;
}
const AccountFilterView = styled.div`
  position: relative;
  display: flex;
  top: 4px;
  font-size: 60%;
  color: ${prop => prop.theme.textColor};
  cursor: pointer;
  padding: 0 1.5% 0 0;
  max-width: ${(prop: AccountFilterProp) => 88 / prop.numberOfAccounts}%;
`;

const AccountContainer = styled.span`
  display: inline-block;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow:hidden !important;
`;

const CheckboxContainer = styled.span`
  position: relative;
  top: -2px;
  margin-right: 5px;
`;

const AccountPopUP = styled.div`
  position: relative;
  display: block;
  text-align: center;
  background-color: ${prop => prop.color};
  color: ${prop => prop.theme.textColor};
`;

export interface AccountFilterProps {
  id: accountId;
  index: number;
  account: string;
  isActive: boolean;
  accountFilter: (id: accountId, isActive: boolean) => void;
  numberOfAccounts: number;
  theme?: ThemeProps;
}

export interface AccountFilterState {
  isCheck: boolean;
}

class AccountFilter extends React.Component<AccountFilterProps, AccountFilterState> {
  static defaultProps: Partial<AccountFilterProps> = {
    theme: defaultTheme,
  }

  constructor (props: AccountFilterProps) {
    super(props)

    this.state = {
      isCheck: this.props.isActive,
    }
  }

  render() {
    return (
      <AccountFilterView
        onClick={() => {this.props.accountFilter(this.props.id, !this.props.isActive)}}
        numberOfAccounts={this.props.numberOfAccounts}
      >
        <CheckboxContainer>
          <Checkbox
            onCheck={() => {this.props.accountFilter(this.props.id, !this.props.isActive)}}
            theme={this.props.theme.activeAccountsColor[this.props.index]}
            initialState={this.props.isActive}
            setChecked={this.props.isActive}
          />
        </CheckboxContainer>
          <Tooltip
            placement="bottom"
            overlay={
            <AccountPopUP
              color={this.props.theme.activeAccountsColor[this.props.index].bgColor}
            >
              {this.props.account}
            </AccountPopUP>}
            trigger="hover"
            mouseEnterDelay={1}
          >
            <AccountContainer>
              <SearchMarker>{this.props.account}</SearchMarker>
            </AccountContainer>
          </Tooltip>
      </AccountFilterView>
    )
  }
}

export default withTheme(AccountFilter)
