export enum Strength {
  none = 4,
  low = 3,
  med = 2,
  high = 1
}

//
// First value in this.weekly must be the AVARAGE. The 7 days of the week follow:
//
export interface WeeklyByHourActivity {
  hour: number,
  weekly: Strength[] // will capture a table row
}

export interface ActivityTable {
  table: WeeklyByHourActivity[];
  avaragesByWeekDays: Strength[]; // will appear in columnRenderers
}
