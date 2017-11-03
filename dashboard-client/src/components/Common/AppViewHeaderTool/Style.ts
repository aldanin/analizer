import styled from 'styled-components';
import { TitleStyle } from './index';

const FONT_SIZE = '11px';

export const ViewIcon = styled.span`
  color: ${prop => prop.color};
  font-size: 3.2rem;
`;

export const Title = styled.span`
  font-size: 1.8rem;
  position: relative;
  top: 1px;
  color: ${prop => prop.color};
  margin-left: 1.2rem;
`;

export const Extraction = styled.span`
  position: relative;
  top: 1px;
  color: ${prop => prop.color};
  margin-left: 10px;
  font-size: ${FONT_SIZE};
`;

export const Indicator = styled.span`
  position: relative;
  top: 1px;
  color: ${prop => prop.color};
  margin-left: 5px;
  font-size: ${FONT_SIZE};
`;

export const WatchIcon = styled.span`
  color: ${prop => prop.color};
  margin-left: ${(prop: TitleStyle) => prop.marginLeft};
  font-size: 100%;
`;

export const Update = styled.span`
  position: relative;
  top: 1px;
  margin-left: 5px;
  font-size: ${FONT_SIZE};
  cursor: pointer;
  color: ${prop => prop.color};
`;

export const Extract = styled.span`
  position: relative;
  top: 1px;
  margin-left: 25px;
  font-size: ${FONT_SIZE};
  cursor: pointer;
  color: ${prop => prop.color};
`;
