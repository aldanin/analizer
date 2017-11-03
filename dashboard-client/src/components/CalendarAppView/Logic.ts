import { CalendarAccounts, CalendarEvent } from '../../types/Calendar';
import { CalendarDivideEvents, CalendarGridEvent } from './CalendarGrid';

export const sortArrayOfActiveEvents = (eventsArray: CalendarGridEvent[]) => {
  let swapped;
  do {
    swapped = false;
    for (let i = 0; i < eventsArray.length - 1; i++) {
      if (eventsArray[i].event === null || eventsArray[i].event === undefined ||
        eventsArray[i + 1].event === null || eventsArray[i + 1].event === undefined) {
        throw new Error('Incomplete data')
      }

      if (eventsArray[i].event.fromTime > eventsArray[i + 1].event.fromTime) {
        let temp = eventsArray[i];
        eventsArray[i] = eventsArray[i + 1];
        eventsArray[i + 1] = temp;
        swapped = true;
      }
    }
  } while (swapped);
}

export const divideToGroup = (eventsArray: CalendarGridEvent[], fromIndex: number,
                              toIndex: number, toTime: number, partGroupArray: CalendarDivideEvents[],
                              fullGroupArray: CalendarDivideEvents[], part: CalendarGridEvent[],
                              full: CalendarGridEvent[]) => {
  let tempArray = [];
  for (let i = fromIndex; i < toIndex; i++) {
    tempArray.push(eventsArray[i]);
  }
  if (eventsArray[fromIndex].event.isFullDay) {
    fullGroupArray.push({
      group: tempArray,
      fromTime: full[fromIndex].event.fromTime,
      toTime: toTime,
    })
  } else {
    partGroupArray.push({
      group: tempArray,
      fromTime: part[fromIndex].event.fromTime,
      toTime: toTime,
    })
  }
}

export const divideActiveEventsToGroups = (eventsArray: CalendarGridEvent[],
                                           partGroupArray: CalendarDivideEvents[],
                                           fullGroupArray: CalendarDivideEvents[], part: CalendarGridEvent[],
                                           full: CalendarGridEvent[]) => {
  let currentIndex = 0;
  while (currentIndex < eventsArray.length) {
    let tempIndex = currentIndex + 1;
    let tempEndTime = eventsArray[currentIndex].event.toTime;
    while (tempIndex < eventsArray.length) {
      let currentEvent = eventsArray[tempIndex].event;
      if (tempEndTime > currentEvent.fromTime) {
        tempEndTime = currentEvent.toTime > tempEndTime ? currentEvent.toTime : tempEndTime;
      } else {
        break;
      }
      tempIndex++;
    }
    divideToGroup(eventsArray, currentIndex, tempIndex, tempEndTime, partGroupArray, fullGroupArray, part, full);
    currentIndex = tempIndex;
  }
}

export const getAllEvents = (events: CalendarEvent[], index: number, accountsArray: CalendarAccounts[],
                             partEventsArray: CalendarGridEvent[], fullEventArray: CalendarGridEvent[]) => {
  for (let i = 0; i < events.length; i++) {
    if (events[i].isFullDay) {
      fullEventArray.push({
        event: events[i],
        themeIndexColor: index,
        account: accountsArray[index].account,
        accountId: accountsArray[index].id,
      })
    } else {
      partEventsArray.push({
        event: events[i],
        themeIndexColor: index,
        account: accountsArray[index].account,
        accountId: accountsArray[index].id,
      })
    }
  }
}

export const getAllEventsFromActivateAccounts =
  (accountsArray: CalendarAccounts[], partEventsArray: CalendarGridEvent[],
   fullEventArray: CalendarGridEvent[], partGroupArray: CalendarDivideEvents[],
   fullGroupArray: CalendarDivideEvents[]) => {
  for (let i = 0; i < accountsArray.length; i++) {
    if (accountsArray[i].isActive) {
      getAllEvents(accountsArray[i].calendar, i, accountsArray, partEventsArray, fullEventArray);
    }
  }

  if (partEventsArray.length > 1) {
    sortArrayOfActiveEvents(partEventsArray);
  }
  if (fullEventArray.length > 1) {
    sortArrayOfActiveEvents(fullEventArray);
  }
  divideActiveEventsToGroups(partEventsArray, partGroupArray, fullGroupArray, partEventsArray, fullEventArray);
  divideActiveEventsToGroups(fullEventArray, partGroupArray, fullGroupArray, partEventsArray, fullEventArray);
}

export const getMaxNumberOfEvents = (eventsArray: CalendarDivideEvents[], timestamp: number) => {
  let max = 0;
  for (let i = 0; i < eventsArray.length; i++) {
    let counter = 0;
    let group = eventsArray[i].group;

    for (let j = 0; j < group.length; j++) {
      if (group[j].event.toTime > timestamp) {counter ++}
    }
    max = counter > max ? counter : max;
  }
  return max + 1;
}
