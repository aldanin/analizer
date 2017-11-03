import * as React from 'react'
import FontIcon from 'material-ui/FontIcon';
import styled from 'styled-components';
import TabGeneric from '../Common/TabGeneric/index';
import { withTheme } from 'styled-components';
import { ThemeProps } from './Theme';
import Checkbox from '../Common/Checkbox/index';

export interface BrowserFilterProps {
  bookmarksClickAction: Function;
  historyClickAction: Function;
  expandCallback: Function;
  collapseCallback: Function;
  initialSelectedIndex: number;
  isGroupByDomainMode: boolean;
  groupByClickAction: () => void;
  theme?: ThemeProps;
  isGroupMode: boolean;
  changeGroupByMode:  (isGroupMode: boolean) => void;
}

export interface BrowserFilterState {
  isGroupByDomain: boolean;
}

const Toggle = styled.span`
  position: relative;
  top: 11px;
  color: ${prop => prop.theme.linkColor};
  text-decoration: none;
  margin-left: 2%;
  margin-right: 5%;
  font-size: 50%;
  font-weight: bold;
  cursor: pointer;
  white-space: nowrap;
`;

const Content = styled.div`
  position: relative;
  left: 1%;
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 50%;
`;

const Pipe = styled.span`
  color: ${prop => prop.theme.pipeColor};
  position: relative;
  top: 1px;
`;

const Tabs = styled.span`
  position: relative;
  top: 20%;
  left: 9%;
  font-size: 75%;
`;

const Group = styled.span`
  position: relative;
  top: 10px;
  left: 65px;
  font-size: 60%;
  color: ${prop => prop.theme.groupByColor};
`;

const CheckboxSpan = styled.span`
  position: relative;
  top: 4px;
  left: 58px;
`;

const styles = {
  collapseIcon: {

  },

  expandIcon: {

  },
};

class BrowserFilterBar extends React.Component<BrowserFilterProps, BrowserFilterState> {

  constructor (props: BrowserFilterProps) {
    super(props)

    this.state = {
      isGroupByDomain: this.props.isGroupMode,
    }
  }

  render() {
    const browserTabs = [{
      title: 'Bookmarks',
      callback: () => {this.props.bookmarksClickAction()},
    }, {
      title: 'History',
      callback: () => {this.props.historyClickAction()},
    }];

    styles.expandIcon = {
      color: this.props.theme.linkColor,
      position: 'relative',
      top: '12px',
      marginLeft: '25%',
      fontSize: '45%',
    };

    styles.collapseIcon = {
      color: this.props.theme.linkColor,
      position: 'relative',
      top: '11px',
      marginLeft: '3%',
      fontSize: '50%',
    }

    const getTabs = () => {
      return (
        <Tabs>
          <TabGeneric
            tabs={browserTabs}
            initialSelectedIndex={this.props.initialSelectedIndex}
            theme={this.props.theme.tabs}
          />
        </Tabs>
      )
    }

    return (
      (this.props.initialSelectedIndex === 0 ) ? (
        <Content>
          {getTabs()}
          <FontIcon className="base_icons icon_expand" style={styles.expandIcon}/>
          <Toggle onClick={() => {this.props.expandCallback()}}>Expand All</Toggle>
          <Pipe>|</Pipe>
          <FontIcon className="base_icons icon_collapse" style={styles.collapseIcon}/>
          <Toggle onClick={() => {this.props.collapseCallback()}}>Collapse All</Toggle>
        </Content>) : (
        <Content>
          {getTabs()}
          {process.env.REACT_APP_IS_FILTERED_ENABLED ? (
            <CheckboxSpan>
              <Checkbox
                theme={this.props.theme.checkbox}
                onCheck={() => {
                  this.props.changeGroupByMode(!this.state.isGroupByDomain);
                  this.setState({isGroupByDomain: !this.state.isGroupByDomain})}
                }
                setChecked={this.state.isGroupByDomain}
              />
            </CheckboxSpan>
          ) : null}
          {process.env.REACT_APP_IS_FILTERED_ENABLED ? (
            <Group>Group by domain</Group>
          ) : null}
        </Content>
      )
    )

  }
}

export default withTheme(BrowserFilterBar);
