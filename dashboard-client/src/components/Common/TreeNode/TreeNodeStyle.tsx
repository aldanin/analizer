import styled from 'styled-components';
import * as Theme from './Theme'

export interface TreeNodeStyleProps {
  level?: number;
  isExpandable?: boolean;
  showControls?: boolean;
}

export const Item = styled.div`
  display: flex;
  background-color: ${(props) => props.color};
  width: 100%;
  height: 30px;
  border-bottom: 1px solid ${(props) => props.theme.borderColor};
  margin: 0;
  padding: 0;
  
  &:hover {
    backgroundColor: ${(props) => props.theme.hoverBgColor};
  }
`;

export const LeftSpan = styled.span`
  cursor: pointer;
  display: flex;
  justify-content: flex-start;
  width: 70%;
  min-width: 150px;
`;

export const RightSpan = styled.span`
  display: flex;
  justify-content: flex-end;
  width: 30%;
  margin-left: 150px;
`;

export const HighLight = styled.span`
  background-color: ${(props) => props.color};
  width: 4px;
  height: 100%;
  margin-right: 2px;
  visibility: ${(props: TreeNodeStyleProps) => props.showControls ? 'visible' : 'hidden'};
`;

///////////
export const CheckBoxSpan = styled.span`
  position: relative;
  top: 6px;
  left: 5px;
  width: 27px;
  height: 100%;
  margin-right: ${(props: TreeNodeStyleProps) => props.isExpandable ? props.level * 30.3 : props.level * 30.3 + 20}px;
  visibility: ${(props: TreeNodeStyleProps) => props.showControls ? 'visible' : 'hidden'};
`;

export const IconSpan = styled.span`
  position: relative;
  top: ${(props: TreeNodeStyleProps) => props.isExpandable ? '5px' : '2px'};
  width: 15px;
  margin-right: ${(props: TreeNodeStyleProps) => props.isExpandable ? '15px' : '23px'};
  cursor: pointer;
  font-size: 120%;
`;
///////////
export const Arrow = styled.span`
  position: relative;
  color: ${(props) => props.theme.arrowIconColor};
  top: 6.5px;
  width: 14px;
  margin-right: 9px;
  cursor: pointer;
`;

export const Name = styled.span`
  position: relative;
  width: 145px;
  margin-right: 0%;
  font-size: 100%;
  cursor: pointer;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  vertical-align: middle;
  line-height: 30px;
`;

export const ActionMenuSpan = styled.span`
  position: relative;
  right: 23px;
  width: 15px;
  margin-left: 4px;
  font-size: 120%;
  display: ${(props: TreeNodeStyleProps) => props.showControls ? 'inline' : 'none'};
`;

export const Star = styled.span`
  position: relative;
  top: 1px;
  right: 38px;
  width: 15px;
  margin-left: 30px;
  font-size: 120%;
`;

export const NoteBook = styled.span`
  position: relative;
  top: 9px;
  margin-right: 23px;
  margin-left: 8px;
  font-size: 120%;
  cursor: pointer;
  color: ${(props) => props.theme.notebookIconColor};
`;

export const Translate = styled.span`
  position: relative;
  top: 9px;
  margin-right: 3%;
  margin-left: 1%;
  font-size: 120%;
  cursor: pointer;
  color: ${(props) => props.theme.notebookIconColor};
`;

export const GetMUIStyles = (theme: Theme.ThemeProps) => {
  const styles = {
    star: {
      position: 'absolute',
      left: '92%',
      top: '7px',
      color: theme.starBorderColor,
      fontSize: '100%',
      cursor: 'pointer',
    },
    fullStar: {
      position: 'absolute',
      left: '92%',
      top: '7px',
      color: theme.starColor,
      fontSize: '100%',
      cursor: 'pointer',
    },
    action: {
      position: 'relative',
      top: '3px',
      left: '3px',
      color: theme.iconColor,
      fontSize: '100%',
      cursor: 'pointer',
    },
    icon: {
      position: 'relative',
      top: '3px',
      left: '2px',
      color: theme.iconColor,
      fontSize: '125%',
      width: '0.3px',
    },
    translateOn: {
      position: 'absolute',
      left: '92%',
      color: theme.translateOnColor,
      fontSize: '110%',
      cursor: 'pointer',
    },
    translateOff: {
      position: 'absolute',
      left: '92%',
      color: theme.translateOffColor,
      fontSize: '110%',
      cursor: 'pointer',
    },
    notebookOn: {
      position: 'absolute',
      left: '92%',
      color: theme.notebookOnColor,
      fontSize: '100%',
      cursor: 'pointer',
    }
  }

  return styles;
};
