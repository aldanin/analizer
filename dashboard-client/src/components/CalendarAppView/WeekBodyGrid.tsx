import * as React from 'react'
import styled, { withTheme } from 'styled-components';
import * as Theme from './Theme'
import { defaultTheme } from './Theme';

const HOURS = [
  '00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00',
  '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00',
]

const WeekBodyView = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const HourContainer = styled.div`
  display: flex;
  width: 100%;
`;

const HourTitle = styled.div`
  position: relative;
  top: 22px;
  display: block;
  width: 41px;
  height: 60px;
  color: ${prop => prop.color};
  font-size: 75%;
`;

interface DayBoxProps {
  borderBottomColor: string;
  borderRightColor: string;
}
const DayBox = styled.div`
  display: block;
  width: 13.2%;
  height: 60px;
  border-left: 1px solid ${prop => prop.theme.weekGridBorderColor};
  border-top: 1px solid ${prop => prop.theme.weekGridBorderColor};
  border-bottom: 1px solid ${(prop: DayBoxProps) => prop.borderBottomColor};
  border-right: 1px solid ${(prop: DayBoxProps) => prop.borderRightColor};
`;

export interface WeekBodyGridProps {
  theme?: Theme.ThemeProps;
}

export interface WeekBodyGridState {
}

class WeekBodyGrid extends React.Component<WeekBodyGridProps, WeekBodyGridState> {
  static defaultProps: Partial<WeekBodyGridProps> = {
    theme: defaultTheme
  }

  constructor(props: WeekBodyGridProps) {
    super(props);
    this.state = {};
  }

  render() {
    const weekDates = [];
    for (let i = 0; i < 7; i++) {
      weekDates.push(i);
    }
    return (
      <WeekBodyView>
        {HOURS.map((hour, idh) => {
          return (
            <HourContainer key={idh}>
              <HourTitle color={this.props.theme.weekGridTextColor}>{hour}</HourTitle>
              {weekDates.map((day, idx) => {
                return (
                  <DayBox
                    key={idx}
                    borderRightColor={idx === 6 ? this.props.theme.weekGridBorderColor : 'transparent'}
                    borderBottomColor={idh === 23 ? this.props.theme.weekGridBorderColor : 'transparent'}
                  />
                )})}
            </HourContainer>
          )})}
      </WeekBodyView>
    )
  }

}

export default withTheme(WeekBodyGrid)
