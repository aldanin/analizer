import styled from 'styled-components';

const FONT_SIZE = '15px';

// counter file:

export const SelectedFilter = styled.div`
  background-color: ${prop => prop.color};
  width: 100%;
  display: flex;
`;

export const SelectedContainer = styled.div`
  font-size: 1.3rem;
  line-height: 4rem;
  padding-left: 0.9rem;
`;

export const ClearAllContainer = styled.div`
  font-size: 1.3rem;
  line-height: 4rem;
  padding-left: 2rem;
  cursor: pointer;
  color: ${prop => prop.color};
`;

export const FilterTool = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

export const RightSide = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  font-size: ${FONT_SIZE};
  width: 40%;
`;

export const LeftSide = styled.div`
  display: flex;
  flex-direction: row;
  width: 62%;
  padding-left: 20px;
`;

// showDropDown file:

export const ShowFilter = styled.div`
  display: table;
  position: relative;
  right: -40px;
  top: 2px;
`;

export const ShowTitle = styled.span`
  display: table-cell;
  vertical-align: middle;
  position: relative;
  top: -0.6px;
  left: 10px;
  font-size: 80%;
  width: 30%;
  color: ${prop => prop.color};
`;

// tagsDropDown file:

export const TagsFilter = styled.div`
  display: table;
  position: relative;
  right: 5px;
  top: 2px;
`;

export const TagsTitle = styled.span`
  display: table-cell;
  vertical-align: middle;
  position: relative;
  top: -0.7px;
  left: 10px;
  font-size: 80%;
  width: 30%;
  color: ${prop => prop.color};
`;

// actionsDropDown file:

export const ActionsFilter = styled.div`
  display: table;
  position: relative;
  right: 40px;
  top: 2px;
`;

// search file:

export const SearchFilter = styled.div`
    position: relative;
    top: -2px;
`;

interface SearchInputProps {
  borderColor: string;
  focusColor: string;
  backgroundColor: string;
}

export const SearchInput = styled.input`
    position: relative;
    right: 0px;
    top: 1px;
    width: 60%;
    border: none;
    border-bottom: 1px solid ${(prop: SearchInputProps) => prop.borderColor};
    background-color: ${(prop: SearchInputProps) => prop.backgroundColor};
    height: 20px;

    &:focus {
      outline: none;
      background-color: ${(prop: SearchInputProps) => prop.focusColor};
    }
`;
