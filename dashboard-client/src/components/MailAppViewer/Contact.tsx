import * as React from 'react'
import styled from 'styled-components';
import Avatar from 'material-ui/Avatar';
import ListItem from 'material-ui/List/ListItem';
import MenuItem from './MenuItem';
import { MailData } from '../../types/Mail';
import { MailLabel } from '../../types/Mail';
import SearchMarker from '../Common/SearchMarker/index';

const ContactView = styled.div`
  display: flex;
  flex-direction: column;
  height: auto;
  width: 100%;
  padding: 0 1rem;
  box-sizing: border-box;
`;

const ContactTitle = styled.div`
  display: flex;
  width: 100%;
  padding: 1rem 0 1rem 1rem;
  height: auto;
  border-bottom: 1px solid ${prop => prop.theme.borderColor};
  box-sizing: border-box;
`;

const AvatarContainer = styled.span`
  width: 15%;
  height: auto;
`;

const AccountContainer = styled.span`
  font-size: 1.5rem;
  line-height: 3rem;
  width: 60%;
`;

const NewItemsContainer = styled.div`
  position: relative;
  top: 0.5rem;
  background-color: ${prop => prop.theme.newItemBgColor};
  font-size: 50%;
  color: ${prop => prop.theme.newItemColor};
  border-radius: 2.5rem;
  height: 2rem;
  width: 2rem;
  text-align: center;
  line-height: 2rem;
  margin-left: 2rem;
`;

const NoNewItems = styled.div`
  display: block;
  position: relative;
  top: 0.5rem;
  font-size: 50%;
  border-radius: 2.5rem;
  height: 2rem;
  width: 2rem;
  text-align: center;
  line-height: 2rem;
  margin-left: 2rem;
`;

const ExpandContainer = styled.span`
  line-height: 3.5rem;
  margin-left: 1rem;
  color: ${prop => prop.theme.expandColor};
  font-size: 90%;
  cursor: pointer;
`;

const style = {
  profilePicture: {
    maxWidth: '70%',
    width: 'auto',
    height: 'auto',
    position: 'relative',
    top: 0,
    left: 0,
  },
  list: {
    padding: 0,
  }
}

export interface ContactProps extends React.Props<Contact> {
  id: string;
  account: string;
  avatar: string;
  folders: MailLabel[];
  inbox: MailData[];
  isShowing: boolean;
  onLabelClick: (id: string) => void;
}
export interface ContactState {
  isExpand: boolean;
  activeLabel: number;
}

class Contact extends React.Component<ContactProps, ContactState> {
  constructor (props: ContactProps) {
    super(props)

    this.state = {
      isExpand: false,
      activeLabel: -1,
    }
  }

  countAllNewItems() {
    let counter = 0;
    for (let i = 0; i < this.props.inbox.length; i++) {
      if (!this.props.inbox[i].isRead) {counter++}
    }
    return counter;
  }

  toggleContact() {
    this.setState({
      isExpand: !this.state.isExpand,
      activeLabel: 0,
    })
  }

  renderNewItems() {
    let counter = this.countAllNewItems();
    if (counter === 0) {return <NoNewItems/>}
    return (
      <NewItemsContainer>
        {counter}
      </NewItemsContainer>
    )
  }

  render() {
    return (
      <ContactView>
        <ContactTitle>
          <AvatarContainer>
            <ListItem
              style={style.list}
              disabled={true}
              leftAvatar={(
                <Avatar
                  src={this.props.avatar}
                  style={style.profilePicture}
                />
              )}
            />
          </AvatarContainer>
          <AccountContainer>
            <SearchMarker>{this.props.account}</SearchMarker>
          </AccountContainer>
          {this.renderNewItems()}
          <ExpandContainer onClick={() => this.toggleContact()}>
            {this.state.isExpand ? (
              <span className="base_icons icon_arrow_up"/>
              ) : <span className="base_icons icon_arrow_down"/> }
          </ExpandContainer>
        </ContactTitle>
        {this.state.isExpand ? (
          this.props.folders.map((item, idx) => {
            return (
              <MenuItem
                key={idx}
                title={item.label}
                items={0}
                isActive={this.state.activeLabel === idx && this.props.isShowing}
                newItems={this.countAllNewItems()}
                clickCallback={() => {
                  this.props.onLabelClick(this.props.id);
                  this.setState({activeLabel: idx})}
                }
              />
            )
          })
        ) : null}
      </ContactView>
    )
  }
}

export default Contact
