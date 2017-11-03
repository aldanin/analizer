import * as React from 'react'
import styled   from 'styled-components'
import * as Defs from './definitions'

export interface RowCellProps extends React.Props<any> {
  cellProps: Defs.CellProps
}

interface StyleProps {
  color: string;
  width: string;
  minWidth: string;
  maxWidth: string;
  flexShrink: number;
  flexGrow: number;
  overflow: string;
  textOverflow: string;
  whiteSpace: string;
  marginRight: string;
}

const Root = styled.div`
  display: inline-block;
  color: ${(props: StyleProps) => props.color};
  flex-basis: ${(props: StyleProps) => props.width};
  min-width: ${(props: StyleProps) => props.minWidth};
  max-width: ${(props: StyleProps) => props.maxWidth};
  flex-shrink: ${(props: StyleProps) => props.flexShrink};
  flex-grow: ${(props: StyleProps) => props.flexGrow};
  overflow: ${(props: StyleProps) => props.overflow};
  text-overflow: ${(props: StyleProps) => props.textOverflow};
  white-space: ${(props: StyleProps) => props.whiteSpace};
  vertical-align: middle;
  margin: auto 0;
  margin-right: ${(props: StyleProps) => props.marginRight};
`;

const RowCell: React.SFC<RowCellProps> = (props: RowCellProps) => {
  const cellProps = props.cellProps;
  const style = cellProps.additionalStyle || {};
  const color = cellProps.fontColor;
  const width = cellProps.width + 'px';
  const minWidth = cellProps.minWidth + 'px';
  const maxWidth = cellProps.maxWidth ? cellProps.maxWidth + 'px' : 'initial';
  const flexShrink = cellProps.flexShrink || 0;
  const flexGrow = cellProps.flexGrow || 0;
  const overflow = style.overflow || 'hidden !important';
  const textOverflow = style.textOverflow || 'ellipsis';
  const whiteSpace = style.whiteSpace || 'nowrap';

  return (
    <Root
      color={color}
      width={width}
      minWidth={minWidth}
      maxWidth={maxWidth}
      flexShrink={flexShrink}
      flexGrow={flexGrow}
      overflow={overflow}
      textOverflow={textOverflow}
      whiteSpace={whiteSpace}
      marginRight={'20px'}
    >
      {props.children}
    </Root>
  )
}

export default RowCell
