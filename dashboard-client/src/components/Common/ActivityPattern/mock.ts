import { Strength } from '../../../types/ActivityPattern'

const getRandomState = () => {
  const rand = Math.floor((Math.random() * 4));

  let strength: Strength;

  switch (rand) {
    case 0:
      strength = Strength.none;
      break;
    case 1:
      strength = Strength.low;
      break;
    case 2:
      strength = Strength.med;
      break;
    case 3:
      strength = Strength.high;
      break;
    default:
      break;
  }

  return strength;
};

const getWeekly = () => {
  const weekly = [];
  //
  // 1 hour avarage in week + 7 week days = 8:
  //
  for (let i = 0; i < 7; i++) {
    weekly.push(getRandomState());
  }
  return weekly;
};

export const getActivityTable = () => {
  const activityTable = {
    table: [],
    avaragesByWeekDays: []
  };

  for (let i = 0; i < 12; i++) {
    const weekly = getWeekly();
    weekly.unshift(getRandomState());

    activityTable.table.push({
      hour: i * 2,
      weekly: weekly,
    });
  }
  activityTable.avaragesByWeekDays = getWeekly();

  return activityTable;
};
