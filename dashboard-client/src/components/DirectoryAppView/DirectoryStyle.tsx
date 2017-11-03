import styled from 'styled-components';

export interface LevelProp {
  level?: number;
  isExpandable?: boolean;
}

export const Item = styled.div`
  display: flex;
  background-color: ${(props) => props.color}
  width: 100%;
  height: 30px;
  border-bottom: 1px solid ${(props) => props.theme.bookmarks.borderColor};
  margin: 0;
  padding: 0;
  
  &:hover {
    backgroundColor: ${(props) => props.theme.bookmarks.hoverBgColor};
  }
`;

export const LeftSpan = styled.span`
  display: flex;
  justify-content: flex-start;
  width: 50%;
`;

export const RightSpan = styled.span`
  display: flex;
  justify-content: flex-end;
  width: 50%;
`;

export const HighLight = styled.span`
  background-color: ${(props) => props.color}
  width: 4px;
  height: 100%;
  margin-right: 2px;
`;

export const CheckBoxSpanBrowser = styled.span`
  position: relative;
  top: 6px;
  left: 5px;
  width: 24px;
  height: 100%;
  margin-right: 23px;
`;

export const CheckBoxSpanDirectory = styled.span`
  position: relative;
  top: 6px;
  left: 5px;
  width: 27px;
  height: 100%;
  margin-right: ${(props: LevelProp) => props.level * 30.3}px;
`;

export const CheckBoxSpanSite = styled.span`
  position: relative;
  top: 6px;
  left: 5px;
  width: 27px;
  height: 100%;
  margin-right: ${(props: LevelProp) => props.level * 45}px;
`;
///////////
export const CheckBoxSpan = styled.span`
  position: relative;
  top: 6px;
  left: 5px;
  width: 27px;
  height: 100%;
  margin-right: ${(props: LevelProp) => props.isExpandable ? props.level * 30.3 : props.level * 30.3 + 20}px;
`;

export const IconSpan = styled.span`
  position: relative;
  top: ${(props: LevelProp) => props.isExpandable ? '5px' : '2px'}
  width: 15px;
  margin-right: ${(props: LevelProp) => props.isExpandable ? '15px' : '23px'}
  cursor: pointer;
  font-size: 120%;
`;
///////////
export const Arrow = styled.span`
  position: relative;
  color: ${(props) => props.theme.bookmarks.arrowIconColor};
  top: 6.5px;
  width: 14px;
  margin-right: 9px;
  cursor: pointer;
`;

export const IconDirectory = styled.span`
  position: relative;
  top: 5px;
  width: 15px;
  margin-right: 15px;
  cursor: pointer;
  font-size: 120%;
`;

export const Icon = styled.span`
  position: relative;
  top: 2px;
  width: 15px;
  margin-right: 23px;
  cursor: pointer;
  font-size: 120%;
`;

export const Name = styled.span`
  position: relative;
  top: 8px;
  width: 145px;
  margin-right: 0%;
  font-size: 100%;
  cursor: pointer;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

export const EmptyMessageWrap = styled.span`
  position: relative;
  top: 8px;
  width: 505px;
  margin-right: 23px;
  font-size: 100%;
  color: ${(props) => props.theme.genericTextColors.textColor};
`;

export const Tag = styled.span`
  position: relative;
  top: 6px;
  font-size: 120%;
`;

export const ActionMenuSpan = styled.span`
  position: relative;
  top: 5px;
  right: 23px;
  width: 15px;
  margin-left: 4px;
  font-size: 120%;
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

export const EmptyItem = styled.div`
  display: flex;
  background-color: ${(props) => props.color}
  width: 100%;
  height: 30px;
  border-bottom: 1px solid ${(props) => props.theme.borderColor};
  margin: 0;
  padding: 0;
  font-size: 100%;
`;

export const Empty = styled.span`
  width: 4%;
  height: 100%;
  margin-left: ${(props: LevelProp) => props.level * 2}%;
`;

export const Space = styled.span`
  display: block;
  width: ${(props: LevelProp) => props.level * 2}%;
  height: 100%;
`;
