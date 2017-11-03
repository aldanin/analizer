import * as React from 'react'
import styled, { withTheme } from 'styled-components';
import LinkedinProfile from './LinkedinProfile';
import { LinkedinData, TwitterId } from '../../types/SocialNetworks';
import MenuItem from './MenuItem';
import LinkedinProfileView from './LinkedinProfileView';
import LinkedinSearchItem from './LinkedinSearchItem';
import { defaultTheme, ThemeProps } from './Theme';
import DropDownMenu from 'material-ui/DropDownMenu';
import {default as SortItem } from 'material-ui/MenuItem';
import LinkedinConnection from './LinkedinConnection';
import { TagId } from '../../types/Tag';
import { ActionMenuFunctions } from './index';
import LoadingIndicator from '../Common/LoadingIndicator';

const LinkedinView = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
`;

const LinkedinMenu = styled.div`
  display: flex;
  flex-direction: column;
  width: 20%;
  height: 100%;
  background-color: ${prop => prop.theme.profileBgColor};
`;

const LinkedinInfo = styled.div`
  display: flex;
  flex: 2;
  overflow-y: auto;
  overflow-x: hidden;
  width: 80%;
  height: 94%;
  background-color: ${prop => prop.theme.infoBgColor};
  padding: 20px;
`;

const LinkedinInfoWithoutOverflow = styled.div`
  display: flex;
  flex-direction: column;
  flex: 2;
  overflow: hidden;
  width: 80%;
  height: 94%;
  background-color: ${prop => prop.theme.infoBgColor};
  padding: 20px;
`;

const LinkedinFrame = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  overflow-x: hidden;
  flex: 3;
  height: 100%;
  width: 100%;
  background-color: ${prop => prop.theme.profileBgColor};
  border: 1px solid ${prop => prop.theme.messageBorderColor};
`;

const SortBy = styled.div`
  color: ${prop => prop.theme.sortByColor};
  font-size: 60%;
`;

const SortByContainer = styled.div`
  display: flex;
  width: 100%;
  height: 25px;
`;

const styles = {

  hint: {
    position: 'relative',
    fontSize: '60%',
    top: '-21px',
    left: '-13px',
  },

  arrow: {
  },

  title: {
  },

  list: {
    border: 'none',
  },
}

export interface LinkedinNetworkProps extends React.Props<LinkedinNetwork> {
  data: LinkedinData;
  connectionSortByIndex: number;
  connectionSortBy: (selectedIndex: number) => void;
  isSorting: boolean;
  setStar: (path: string[], id: TwitterId, isFavorite: boolean) => void;
  removeTag: (path: string[], id: TwitterId, tagId: TagId) => void;
  linkedinExperienceActionMenu: ActionMenuFunctions;
  linkedinEducationActionMenu: ActionMenuFunctions;
  linkedinConnectionActionMenu: ActionMenuFunctions;
  linkedinSearchActionMenu: ActionMenuFunctions;
  theme?: ThemeProps;
}
export interface LinkedinNetworkState {
  activeMenu: number;
  sortMenu: number;
}

class LinkedinNetwork extends React.Component<LinkedinNetworkProps, LinkedinNetworkState> {
  static defaultProps: Partial<LinkedinNetworkProps> = {
    theme: defaultTheme,
  }

  constructor (props: LinkedinNetworkProps) {
    super(props)

    this.state = {
      activeMenu: 0,
      sortMenu: 0,
    }
  }

  componentDidMount() {
    this.setState({sortMenu: this.props.connectionSortByIndex})
  }

  handleChange = (event, index, value) => {
    this.props.connectionSortBy(index);
    this.setState({sortMenu: index})
  };

  menuItemSelected(index: number) {
    this.setState({activeMenu: index})
  }

  getInfo() {
    switch (this.state.activeMenu) {
      case 0:
        return (
          <LinkedinInfo>
            <LinkedinProfileView
              data={this.props.data.profile}
              setStar={this.props.setStar}
              removeTag={this.props.removeTag}
              linkedinExperienceActionMenu={this.props.linkedinExperienceActionMenu}
              linkedinEducationActionMenu={this.props.linkedinEducationActionMenu}
            />
          </LinkedinInfo>
        );

      case 1:
        return (
          <LinkedinInfoWithoutOverflow>
            <SortByContainer>
              <SortBy>Sort by:</SortBy>
              <DropDownMenu
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                maxHeight={300}
                value={this.state.sortMenu}
                onChange={this.handleChange}
                style={styles.hint}
                iconStyle={styles.arrow}
                labelStyle={styles.title}
                underlineStyle={styles.list}
              >
                <SortItem value={0} key={0} primaryText={'Recently added'}/>
                <SortItem value={1} key={1} primaryText={'Name (A-Z)'}/>
                <SortItem value={2} key={2} primaryText={'Name (Z-A)'}/>
              </DropDownMenu>
            </SortByContainer>
            {this.props.isSorting ? (
              <LinkedinFrame>
                <LoadingIndicator/>
              </LinkedinFrame>
            ) : (
              <LinkedinFrame>
                {this.props.data.connection.map((item, idx) => {
                  return (
                    <LinkedinConnection
                      key={idx}
                      data={item}
                      setStar={this.props.setStar}
                      removeTag={this.props.removeTag}
                      linkedinConnectionActionMenu={this.props.linkedinConnectionActionMenu}
                    />)
                })}
              </LinkedinFrame>
            )}
          </LinkedinInfoWithoutOverflow>
        );

      case 2:
        return (
          <LinkedinInfoWithoutOverflow>
            <LinkedinFrame>
              {this.props.data.search.map((item, idx) => {
                return (
                  <LinkedinSearchItem
                    key={idx}
                    data={item}
                    setStar={this.props.setStar}
                    removeTag={this.props.removeTag}
                    linkedinSearchActionMenu={this.props.linkedinSearchActionMenu}
                  />)
              })}
            </LinkedinFrame>
          </LinkedinInfoWithoutOverflow>
        );

      default:
        return null;
    }
  }

  getNewConnections() {
    let counter = 0;
    for (let i = 0; i < this.props.data.connection.length; i++) {
      if (!this.props.data.connection[i].isRead) {
        counter++;
      }
    }
    return counter;
  }

  getNewSearch() {
    let counter = 0;
    for (let i = 0; i < this.props.data.search.length; i++) {
      if (!this.props.data.search[i].isRead) {
        counter++;
      }
    }
    return counter;
  }

  render() {
    styles.arrow = {
      fill: this.props.theme.arrowColor,
    }
    styles.title = {
      color: this.props.theme.titleInsideDropDownMenuColor,
    }

    return (
      <LinkedinView>
        <LinkedinMenu>
          <LinkedinProfile data={this.props.data}/>
          <MenuItem
            title={'Profile'}
            items={0}
            newItems={0}
            isActive={this.state.activeMenu === 0}
            clickCallback={() => {this.menuItemSelected(0)}}
          />
          <MenuItem
            title={'Connections'}
            items={this.props.data.connection.length}
            newItems={this.getNewConnections()}
            isActive={this.state.activeMenu === 1}
            clickCallback={() => {this.menuItemSelected(1)}}
          />
          <MenuItem
            title={'Recent searches'}
            items={this.props.data.search.length}
            newItems={this.getNewSearch()}
            isActive={this.state.activeMenu === 2}
            clickCallback={() => {this.menuItemSelected(2)}}
          />
        </LinkedinMenu>
          {this.getInfo()}
      </LinkedinView>
    )
  }
}

export default withTheme(LinkedinNetwork)
