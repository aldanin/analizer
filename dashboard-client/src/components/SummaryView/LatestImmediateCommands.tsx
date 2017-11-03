import * as React from 'react'
import styled from 'styled-components';
import moment = require('moment');
import { LatestCommands } from '../../types/Summary'

const CommandsTable = styled.table`
  font-size: 1.4rem;
  table-layout: fixed;
  color: ${prop => prop.theme.subTitleColor};
  padding-left: 2rem;
  padding-right: 2rem;
  width: 100%;
`;

const TableRow = styled.tr`
  width: 100%;
`;

const TableCell = styled.td`
  padding: 0.5rem 3rem 0.5rem 0;
  white-space: nowrap;
  overflow:hidden !important;
  text-overflow: ellipsis;
  width: 20%;
`;

const CommandCell = styled.td`
  padding: 0.5rem 3rem 0.5rem 0;
  white-space: nowrap;
  overflow:hidden !important;
  text-overflow: ellipsis;
  width: 40%;
`;

const ViewContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
`;

const Title = styled.span`
  text-indent: 2rem;
  margin-top: 1rem;
  margin-bottom: 3.5rem;
  font-size: 1.4rem;
`;

export interface LatestImmediateCommandsProps {
  data: LatestCommands[]
}

const LatestImmediateCommands: React.SFC<LatestImmediateCommandsProps> = ({ data }) => {
  return (
    <ViewContainer>
      <Title>Latest Immediate Commands</Title>
      <CommandsTable>
        {data.map((item, idx) => {
        return (
          <TableRow key={idx}>
            <TableCell title={moment(item.timestamp).format('DD/MM/YYYY HH:mm')}>
              {moment(item.timestamp).format('DD/MM/YYYY HH:mm')}
              </TableCell>
            <TableCell title={item.app}>{item.app}</TableCell>
            <CommandCell title={item.command}>{item.command}</CommandCell>
            <TableCell title={item.status}>{item.status}</TableCell>
          </TableRow>
        )})}
      </CommandsTable>
    </ViewContainer>
  )
}

export default LatestImmediateCommands
