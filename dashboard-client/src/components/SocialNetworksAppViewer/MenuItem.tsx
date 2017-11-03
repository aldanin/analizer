import * as React from 'react'
import { defaultTheme, ThemeProps } from './Theme';
import styled, { withTheme } from 'styled-components';

const MenuItemView = styled.div`
  background-color: ${prop => prop.color};
  width: 96%;
  margin-left: 2%;
  cursor: pointer;
  display: flex;
  height: 50px;
  border-bottom: 1px solid ${prop => prop.theme.borderColor};
  margin-bottom: 1%;
`;

const BorderContainer = styled.div`
  display: block;
  background-color: ${prop => prop.color};
  width: 1.5%;
  height: 100%;
  margin-right: 3%;
`;

const TitleContainer = styled.div`
  position: relative;
  font-size: 70%;
  width: 50%;
  margin-right: 2%;
  line-height: 50px;
  color: ${prop => prop.theme.textColor};
`;

const NewItemsContainer = styled.div`
  position: relative;
  top: 16px;
  background-color: ${prop => prop.theme.newItemColor};
  font-size: 50%;
  color: ${prop => prop.theme.newItemTextColor};
  border-radius: 25px;
  height: 20px;
  width: 20px;
  text-align: center;
  line-height: 20px;
`;

const NoNewItems = styled.div`
  width: 7%;
`;

const ItemsContainer = styled.div`
  position: relative;
  font-size: 70%;
  width: 20%;
  text-align: right;
  float: left;
  margin-left: 12%;
  line-height: 50px;
  color: ${prop => prop.theme.textColor};
`;

export interface MenuItemProps extends React.Props<MenuItem> {
  title: string;
  items: number;
  newItems: number;
  isActive: boolean;
  clickCallback: () => void;
  theme?: ThemeProps,
}
export interface MenuItemState {
  isMouseOn: boolean;
}

class MenuItem extends React.Component<MenuItemProps, MenuItemState> {
  static defaultProps: Partial<MenuItemProps> = {
    theme: defaultTheme,
  }

  constructor (props: MenuItemProps) {
    super(props)

    this.state = {
      isMouseOn: false,
    }
  }

  setMouseState(isMouseOn: boolean) {
    this.setState({isMouseOn: isMouseOn});
  }

  render() {
    return (
      <MenuItemView
        color={this.props.isActive ? this.props.theme.infoBgColor :
          this.state.isMouseOn ? this.props.theme.menuItemHoverColor : this.props.theme.menuItemBgColor}
        onMouseOver={() => {this.setMouseState(true)}}
        onMouseLeave={() => {this.setMouseState(false)}}
        onClick={this.props.clickCallback}
      >
        <BorderContainer color={this.props.isActive ? this.props.theme.selectedItemColor : 'transparent'}/>
        <TitleContainer>{this.props.title}</TitleContainer>
        {this.props.newItems > 0 ? (
          <NewItemsContainer>{this.props.newItems > 99 ? '99+' : this.props.newItems}</NewItemsContainer>
        ) : <NoNewItems/>}
        <ItemsContainer>{this.props.items > 0 ? this.props.items : null}</ItemsContainer>
      </MenuItemView>
    )
  }
}

export default withTheme(MenuItem)
