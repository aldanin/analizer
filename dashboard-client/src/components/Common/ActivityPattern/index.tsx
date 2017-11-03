import * as React from 'react'
import styled from 'styled-components'
import { addLeadingZeros } from './helpers'
import * as ActivityModel from '../../../types/ActivityPattern'
import * as Theme from './Theme'
import { ActivityPatternTheme } from '../../../theme/ScTheme'
import { ThemeProvider } from 'styled-components'

export interface ActivityPatternProps {
  activityTable: ActivityModel.ActivityTable;
  isFixedWidth?: boolean; // To be assigned to the table's css
  width?: number
  //
  // Need for 4 string array exactly of 4 colors ( at the moment ) or a preset name in capitalized form.
  // Presets found here:
  //
  colorScheme?: string | string[],
}

interface StylesProps {
  tableWidth?: number;
  isFixedWidth?: boolean;
  colorScheme?: ColorScheme;
}

type ColorScheme = string | string[];

export const colorSchemes = {
  BLUE: ['#d2dfe5', '#8ccfe3', '#3d99bc', '#2c6b97'],
  VIOLET: ['#d2dfe5', '#c080ff', '#8b16ff', '#5600cd'],
  GREEN: ['#d2dfe5', '#94db93', '#339b03', '#216603'],
}

const getColorScheme = (colorScheme: ColorScheme) => {
  colorScheme =
    colorScheme
      ? (
        colorScheme instanceof Array
          ? colorScheme
          : colorSchemes[colorScheme]
      )
      : colorSchemes.BLUE
  return colorScheme;
};

const Wrap = styled.div`
    width: ${(props: StylesProps) => props.tableWidth}px;
    height: 300px;
  `;

const Table = styled.table`
    width: 100%;
    table-layout: ${(props: StylesProps) => props.isFixedWidth ? 'fixed' : 'auto'};
  `;

const TH = styled.th`
    width: 25px;
    height: 15px;
    background-color: inherit;
    color: ${props => props.theme.textColor};
    font-weight: normal;
    font-size: 10px;
  `;

const TD = styled.td`
     height: 20px;
     padding: 0;
     position: relative;

  `;

const ColumnAvarageCell = styled(TD)`
     height: 4px;
     top: -3px;
     font-size: 0;
`;
const CornerCell = styled(TD)`
      border-bottom-color: inherit;
      width: 30px;
      background-color: inherit;
`;

const RowAvarageCell = styled.td`
  border-bottom-color: inherit;
  padding: 0;
  width: 4px;
  height: 20px;
  position: relative;
  right: 2px;
`;
const RowAvarageCellEmpty = styled(RowAvarageCell)`
  height: 4px;
`;
const DateColumnCell = styled(TD)`
    background-color: inherit;
    color: ${props => props.theme.textColor};
    font-size: 10px;
  `;

const DataColumnCell = styled.span`
    display: inline-block;
    width: 100%;
    height: 100%;
    background-color: inherit;
    padding: 0;

    &:hover {
      background-color: ${props => props.theme.hoverColor};
    }
  `;

const DataColumnCellNone = styled(DataColumnCell)`
    background-color: ${(props: StylesProps) => getColorScheme(props.colorScheme)[0]};
  `;
const DataColumnCellLow = styled(DataColumnCell)`
    background-color:  ${(props: StylesProps) => getColorScheme(props.colorScheme)[1]};
  `;
const DataColumnCellMed = styled(DataColumnCell)`
    background-color:  ${(props: StylesProps) => getColorScheme(props.colorScheme)[2]};
  `;
const DataColumnCellHigh = styled(DataColumnCell)`
    background-color:  ${(props: StylesProps) => getColorScheme(props.colorScheme)[3]};
  `;

const getCellContentByStrengthValue = (colorScheme: ColorScheme, value: any) => {
  let inner;

  switch (value) {
    case ActivityModel.Strength.none:
      inner = <DataColumnCellNone colorScheme={colorScheme}/>;
      break;
    case ActivityModel.Strength.low:
      inner = <DataColumnCellLow colorScheme={colorScheme}/>;
      break;
    case ActivityModel.Strength.med:
      inner = <DataColumnCellMed colorScheme={colorScheme}/>;
      break;
    case ActivityModel.Strength.high:
      inner = <DataColumnCellHigh colorScheme={colorScheme}/>;
      break;
    default:
      break;
  }
  return inner;
}

const createFinalTable = (activityTable: ActivityModel.ActivityTable, colorScheme: ColorScheme) => {
  let weekly;
  let hour;
  let keygen = 0;

  const finalTable =
    activityTable.table.map((row) => {
      //
      // Create the table:
      //
      weekly = row.weekly;
      hour = row.hour;

      let TDs = weekly.map((value, index) => {
        let inner = getCellContentByStrengthValue(colorScheme, value);

        let cell = index
          ? <TD key={keygen++}>{inner}</TD>
          : <RowAvarageCell key={keygen++}>{inner}</RowAvarageCell>;
        return cell;
      });

      let hourToString = addLeadingZeros(hour, 2);
      TDs.unshift(<DateColumnCell key={keygen++}>{`${hourToString}.00`}</DateColumnCell>);

      const tr = <tr key={keygen++}>{TDs}</tr>;

      return tr;
    });
  //
  // Create the column avarages row and prepend it to the table:
  //
  weekly = activityTable.avaragesByWeekDays;

  let weeklyTDs = weekly.map((value, index) => {
    let inner = getCellContentByStrengthValue(colorScheme, value);

    let cell = <ColumnAvarageCell key={keygen++}>{inner}</ColumnAvarageCell>;
    return cell;
  });

  weeklyTDs.unshift(<RowAvarageCellEmpty key={keygen++}/>);
  weeklyTDs.unshift(<ColumnAvarageCell key={keygen++}/>);
  const weeklyTr = <tr key={keygen++}>{weeklyTDs}</tr>;
  finalTable.unshift(weeklyTr);

  return finalTable;
};

const mapStrengthTablePropsToUI = (props: ActivityPatternProps): any => {
  const finalTable =
    props.activityTable
      ? createFinalTable(props.activityTable, props.colorScheme)
      : undefined;

  return finalTable;
};

//
// Priority color scheme to user-defined array.
// Next is a user isSelected scheme ( by string name )
// Finally we take colorSchemes.BLUE as default:
//
const ActivityPattern: React.SFC<ActivityPatternProps> = (props: ActivityPatternProps) => {
  const theme = ActivityPatternTheme || Theme.defaultTheme;

  const content = mapStrengthTablePropsToUI(props) || undefined;

  return (
    <ThemeProvider theme={theme}>
      <Wrap
        tableWidth={props.width}
      >
        <Table
          isFixedWidth={props.isFixedWidth}
        >
          <thead>
          <tr>
            <CornerCell/>
            <RowAvarageCell/>
            <TH>Mo</TH>
            <TH>Tu</TH>
            <TH>We</TH>
            <TH>Th</TH>
            <TH>Fr</TH>
            <TH>Sa</TH>
            <TH>Su</TH>
          </tr>
          </thead>
          <tbody>
          {content}
          </tbody>
        </Table>
      </Wrap>
    </ThemeProvider>
  )
};

ActivityPattern.defaultProps = {
  isFixedWidth: true,
  width: 240,
};

export default ActivityPattern;
