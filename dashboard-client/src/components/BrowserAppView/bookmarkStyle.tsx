import styled from 'styled-components';

export interface LevelProp {
  level: number;
}

export const Arrow = styled.span`
  position: relative;
  color: ${(props) => props.theme.bookmarks.arrowIconColor};
  width: 2%;
  padding-right: 1.2%;
  cursor: pointer;
`;

export const Icon = styled.span`
  position: relative;
  top: 2px;
  width: 2%;
  padding-right: 3%;
  cursor: pointer;
  font-size: 120%;
`;

export const BrowserIcon = styled.span`
  position: relative;
  top: 5px;
  width: 2%;
  padding-right: 3%;
  cursor: pointer;
  font-size: 120%;
`;

export const Title = styled.span`
  position: relative;
  top: 2px;
  width: 24%;
  font-size: 100%;
  cursor: pointer;
  text-overflow: ellipsis;
  white-space: nowrap;  
  overflow: hidden;
`;

export const Url = styled.span`
  position: relative;
  top: 2px;
  width: 50%;
  font-size: 100%;
  color: ${(props) => props.theme.bookmarks.urlColor};
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow:hidden !important;
  max-width: 100ch;
`;

export const Tag = styled.span`
  position: relative;
  top: 6px;
  font-size: 120%;
`;

export const Translate = styled.span`
  position: relative;
  top: 9px;
  margin-right: 3%;
  margin-left: 1%;
  font-size: 120%;
  cursor: pointer;
  color: ${(props) => props.theme.bookmarks.notebookIconColor};
`;

export const EmptyItem = styled.div`
  display: flex;
  background-color: ${(props) => props.color};
  width: 100%;
  height: 30px;
  border-bottom: 1px solid ${(props) => props.theme.bookmarks.borderColor};
  margin: 0;
  padding: 0;
  font-size: 100%;
`;

export const Empty = styled.span`
  width: 4%;
  height: 100%;
  line-height: 30px;
  margin-left: ${(props: LevelProp) => props.level * 2}%;
`;

export const Space = styled.span`
  display: block;
  width: ${(props: LevelProp) => props.level * 2}%;
  height: 100%;
`;

export const FixShakes = styled.span`
  width: 0.5px;
`;
