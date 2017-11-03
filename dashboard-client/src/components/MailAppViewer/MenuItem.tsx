import * as React from 'react'
import { defaultTheme, ThemeProps } from './Theme';
import styled, { withTheme } from 'styled-components';
import SearchMarker from '../Common/SearchMarker/index';

const MenuItemView = styled.div`
  background-color: ${prop => prop.color};
  width: 100%;
  cursor: pointer;
  display: flex;
  height: 40px;
`;

const BorderContainer = styled.div`
  display: block;
  background-color: ${prop => prop.color};
  width: 3px;
  height: 100%;
`;

const TitleContainer = styled.div`
  position: relative;
  font-size: 70%;
  width: 75%;
  line-height: 40px;
  color: ${prop => prop.theme.textColor};
  padding: 0 1rem;
`;

const NewItemsContainer = styled.div`
  position: relative;
  top: 10px;
  background-color: ${prop => prop.theme.newItemBgColor};
  font-size: 50%;
  color: ${prop => prop.theme.newItemColor};
  border-radius: 25px;
  height: 20px;
  width: 20px;
  text-align: center;
  line-height: 20px;
`;

const NoNewItems = styled.div`

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
        <TitleContainer><SearchMarker>{this.props.title}</SearchMarker></TitleContainer>
        {this.props.newItems > 0 ? (
          <NewItemsContainer>{this.props.newItems > 99 ? '99+' : this.props.newItems}</NewItemsContainer>
        ) : <NoNewItems/>}
      </MenuItemView>
    )
  }
}

export default withTheme(MenuItem)
