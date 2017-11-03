import * as React from 'react'
import FontIcon from 'material-ui/FontIcon';
import SvgIcon from 'material-ui/SvgIcon';
import styled from 'styled-components';
import TabGeneric from '../Common/TabGeneric/index';
import RadiosGeneric from '../Common/RadiosGeneric/index';
import { withTheme } from 'styled-components';
import { ThemeProps } from './Theme';
import DropdownGeneric from '../Common/DropdownGeneric'
import * as Dir from '../../types/Directory'

export interface DirectoryFilterProps {
  directoryTreeClickAction: Function;
  fileListClickAction: Function;
  expandAll: () => void;
  collapseAll: () => void;
  initialSelectedIndex: number;
  initialFileListModeIndex: Dir.FileListMode;
  isGroupByDomainMode: boolean;
  groupByClickAction: () => void;
  fileListModeClick: (mode: Dir.FileListMode) => void;
  theme?: ThemeProps;
  selectType: (value: number) => void
}

const Toggle = styled.span`
  position: relative;
  color: ${prop => prop.theme.linkColor}
  textDecoration: none;
  margin: 0 10px;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  whiteSpace: nowrap;
`;

const Content = styled.div`
  position: relative;
  margin-left: 0px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const Pipe = styled.span`
  color: ${prop => prop.theme.pipeColor}
  position: relative;
  // top: 1px;
  margin: 0 10px 0 0;
`;

const Tabs = styled.span`
  position: relative;
  // top: 20%;
  font-size: 1.6rem;
`;

const TreeContorlsWrap = styled.div`
  margin-right: auto;
  margin-left: 60px;
`;

const FileListViewModeTabs = styled(Tabs)`
  top: 18px;
  margin: auto;
  min-width: 350px;
`;

const RadiosGenericWrap = styled.div`
  float: left;
`;

const TypeSelectorWrap = styled.div`
  position: relative;
  // left: 50px;
  bottom: 1.6rem;
  font-size: 1.6rem;
  float: right;
`;

const styles = {
  collapseIcon: {},
  radiosIconStyle: {},
  expandIcon: {},
};

class DirectoryFilterBar extends React.Component<DirectoryFilterProps, {}> {

  constructor(props: DirectoryFilterProps) {
    super(props)

  }

  getViewerModeTabs = () => {
    const viewerModeTabs = [{
      title: 'Tree view',
      callback: () => {
        this.props.directoryTreeClickAction()
      },
    }, {
      title: 'Files view',
      callback: () => {
        this.props.fileListClickAction()
      },
    }];

    return (
      <Tabs>
        <TabGeneric
          tabs={viewerModeTabs}
          initialSelectedIndex={this.props.initialFileListModeIndex}
          theme={this.props.theme.tabs}
        />
      </Tabs>
    )
  }

  getFileListViewModeTabs = () => {
    const modeTabs = [{
      title: 'Flat List',
      icon: (
        <SvgIcon className="material-icons" style={styles.radiosIconStyle}>
          <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
        </SvgIcon>
      ),
      callback: () => {
        this.props.fileListModeClick(Dir.FileListMode.flatList)
      },
    }, {
      title: 'Grouped List',
      icon: (
        <SvgIcon className="material-icons" style={styles.radiosIconStyle}>
          <path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"/>
        </SvgIcon>
      ),
      callback: () => {
        this.props.fileListModeClick(Dir.FileListMode.groupedList)
      },
    }];

    return (
      <FileListViewModeTabs>
        <RadiosGenericWrap>
          <RadiosGeneric
            radios={modeTabs}
            initialSelectedIndex={this.props.initialFileListModeIndex}
            theme={this.props.theme.radios}
          />
        </RadiosGenericWrap>
        <TypeSelectorWrap>
          <DropdownGeneric
            caption={'Type'}
            values={['type1a', 'type2a']}
            selectCallback={this.props.selectType}
          />
        </TypeSelectorWrap>
      </FileListViewModeTabs>
    )
  }

  render() {
    styles.expandIcon = {
      color: this.props.theme.linkColor,
      position: 'relative',
      fontSize: '1.2rem',
    };

    styles.collapseIcon = {
      color: this.props.theme.linkColor,
      position: 'relative',
      fontSize: '1.2rem',
    }
    styles.radiosIconStyle = {
      color: this.props.theme.genericTextColors.textColorLink,
      width: '1.6rem',
      height: 'auto',
      position: 'relative',
      top: '0.4rem'
    }

    return (
      (this.props.initialSelectedIndex === 0 ) ? (
          <Content>
            {this.getViewerModeTabs()}
            <TreeContorlsWrap>
              <FontIcon className="base_icons icon_expand" style={styles.expandIcon}/>
              <Toggle onClick={this.props.expandAll}>Expand All</Toggle>
              <Pipe>|</Pipe>
              <FontIcon className="base_icons icon_collapse" style={styles.collapseIcon}/>
              <Toggle onClick={this.props.collapseAll}>Collapse All</Toggle>
            </TreeContorlsWrap>
          </Content>) : (
          <Content>
            {this.getViewerModeTabs()}
            {this.getFileListViewModeTabs()}
          </Content>
        )
    )
  }
}

export default withTheme(DirectoryFilterBar);
