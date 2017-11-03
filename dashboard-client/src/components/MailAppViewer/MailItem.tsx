import * as React from 'react'
import * as Theme from './Theme'
import styled, { ThemeProvider } from 'styled-components';
import Checkbox from '../Common/Checkbox/index';
import moment = require('moment');
import SearchMarker from '../Common/SearchMarker/index';

interface LineProps {
  lineHeight: string;
  height: string;
  borderColor: string;
  bgColor: string;
}

const LineContainer = styled.div`
  border-bottom: 1px solid ${prop => prop.theme.lineBorder};
  width: 100%;
  line-height: ${(prop: LineProps) => prop.lineHeight};
  height: ${(prop: LineProps) => prop.height};
  border-left: 4px solid ${(prop: LineProps) => prop.borderColor};
  background-color: ${(prop: LineProps) => prop.bgColor};
  box-sizing: border-box;
`;

const LineItemsContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  flex: 1;
  height: 100%;
`;

const CheckboxContainer = styled.div`
  display: inline-block;
  padding: 0 0.5em 0 0.5em;
  width: ${prop => prop.width};
  margin: auto 0;
  margin-right: 5px;
`;

const RightSideContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 1.3rem;
  box-sizing: border-box;
  position: absolute;
  right: 0;
`;

const RightSideDownContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const ActionToolbarContainer = styled.span`
  display: inline-block;
`;

const AttachmentIcon = styled.span`
  position: relative;
  top: 6px;
  right: 5px;
  margin-right: 0.5rem;
  color: ${prop => prop.theme.contentColor}
`;

const DateContainer = styled.span`
  position: relative;
  top: -3px;
  right: 5px;
  font-size: 1.1rem;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden !important;
`;

export interface ListItemProps extends React.Props<ListItem> {
  lineHeight?: string;
  checkboxSize?: string;
  isCheckboxAvailable?: boolean;
  isNewItem?: boolean;
  isAttachment?: boolean;
  content: JSX.Element;
  actionToolbar?: JSX.Element;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onCheck?: () => void;
  isChecked?: boolean;
  isSelected?: boolean;
  isMouseOn?: boolean;
  style?: any,
  timestamp: number;
  theme?: Theme.ThemeProps
}
export interface ListItemState {
}

class ListItem extends React.Component<ListItemProps, ListItemState> {

  static defaultProps: Partial<ListItemProps> = {
    lineHeight: '30px',
    checkboxSize: '15px',
    isCheckboxAvailable: true,
    isNewItem: false,
    actionToolbar: null,
    onMouseEnter: () => null,
    onMouseLeave: () => null,
    onCheck: () => null,
    isChecked: false,
    isSelected: false,
    isMouseOn: false,
    isAttachment: false,
    style: {},
    theme: Theme.defaultTheme,
  }

  constructor(props: ListItemProps) {
    super(props)

    this.state = {}
  }

  changeMouseState(isMouseOn: boolean) {
    isMouseOn ? this.props.onMouseEnter() : this.props.onMouseLeave();
  }

  onCheck() {
    this.props.onCheck()
  }

  render() {
    const lineHeight = this.props.style.lineHeight || this.props.lineHeight;
    const height = this.props.style.height || 'initial';

    return (
      <ThemeProvider theme={this.props.theme}>
        <LineContainer
          lineHeight={lineHeight}
          height={height}
          borderColor={this.props.isChecked ? this.props.theme.markAsChecked :
            this.props.isNewItem ? this.props.theme.markAsNewItem : 'transparent'}
          onMouseEnter={() => {this.changeMouseState(true)}}
          onMouseLeave={() => {this.changeMouseState(false)}}
          bgColor={this.props.isSelected ? this.props.theme.itemBgChecked :
            this.props.isMouseOn ? this.props.theme.itemBgHover : this.props.theme.itemBgColor}
        >
          <LineItemsContainer>
            <CheckboxContainer width={this.props.checkboxSize}>
              {this.props.isCheckboxAvailable ? (
                <Checkbox
                  theme={this.props.theme.checkbox}
                  onCheck={() => {this.onCheck()}}
                  setChecked={this.props.isChecked}
                  size={this.props.checkboxSize}
                />) : null}
            </CheckboxContainer>
            {this.props.content}
            <RightSideContainer>
              <ActionToolbarContainer>
                {this.props.actionToolbar}
              </ActionToolbarContainer>
              <RightSideDownContainer>
                {this.props.isAttachment ? <AttachmentIcon className="base_icons icon_attachment"/> : null}
              <DateContainer>
                <SearchMarker>{moment(this.props.timestamp).format('DD/MM/YYYY HH:mm')}</SearchMarker>
              </DateContainer>
              </RightSideDownContainer>
            </RightSideContainer>
          </LineItemsContainer>
        </LineContainer>
      </ThemeProvider>
    )
  }
}

export default ListItem
