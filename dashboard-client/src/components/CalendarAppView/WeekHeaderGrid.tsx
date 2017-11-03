import * as React from 'react'
import styled, { withTheme } from 'styled-components';
import * as moment from 'moment';
import * as Theme from './Theme'

const WeekHeaderView = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-left: 40px;
  width: 100%;
`;
interface DayEventProps {
  numberOfEvents: number;
}
const DayContainer = styled.div`
  width: 13.2%;
  height: ${(prop: DayEventProps) => (prop.numberOfEvents * 25) + 20}px;
  border-left: 1px solid transparent;
  border-right: 1px solid transparent;
`;

const DayTitle = styled.div`
  width: 100%;
  height: 10px;
  text-align: center;
  margin-bottom: 10px;
  font-size: 75%;
  color: ${prop => prop.color};
  border-left: 1px solid transparent;
  border-right: 1px solid transparent;
`;

const DayBox = styled.div`
  display: block;
  width: 100%;
  height: ${(prop: DayEventProps) => prop.numberOfEvents * 25}px;
  border-left: 1px solid ${prop => prop.theme.weekGridBorderColor};
  border-top: 1px solid ${prop => prop.theme.weekGridBorderColor};
  border-bottom: 1px solid ${prop => prop.theme.weekGridBorderColor};
  border-right: 1px solid ${(prop) => prop.color};
`;

export interface WeekHeaderGridProps {
  timestamp: number;
  maxNumberOfEvents: number;
  theme?: Theme.ThemeProps;
}

const WeekHeaderGrid: React.SFC<WeekHeaderGridProps> = ({ theme, timestamp, maxNumberOfEvents }) => {
  const weekDates = [];
  for (let i = 0; i < 7; i++) {
    weekDates.push(moment(timestamp).add(i, 'days'))
  }
  return (
    <WeekHeaderView>
      {weekDates.map((day, idx) => {
        return (
          <DayContainer numberOfEvents={maxNumberOfEvents} key={idx}>
            <DayTitle color={theme.weekGridTextColor}>
              {moment(day).format('ddd DD/M')}
            </DayTitle>
            <DayBox
              numberOfEvents={maxNumberOfEvents}
              color={idx === 6 ? theme.weekGridBorderColor : 'transparent'}
            />
          </DayContainer>
        )
      })}
    </WeekHeaderView>
  )
}
export default withTheme(WeekHeaderGrid);

WeekHeaderGrid.defaultProps = {
  theme: Theme.defaultTheme,
}
