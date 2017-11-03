import * as AppSymbols from '../../../types/AppSymbols'
import * as Calls from '../../../types/Calls'
import * as IMM  from 'immutable'
import * as Prod from '../../../types/Product'

const phoneNumbers = [
  'df998!9', 'dontremmeber678', '~you2_88', '56haroldc',
  'HooRU???', 'pooh6402', 'myPWs&csA??', 'roland80@',
  '861102sex<<', 'luckyman_0981'
];

const cueNodes = [
  'Avrasha speaks kinky',
  'Dolores says Tehilim',
  'Franky goes to Hollywwod',
  'Train arrives with black jokes'
]

let idGen = 1;

const callProto: Calls.CallData = {
  id: -1,
  appSymbol: AppSymbols.APP_SYMBOLS.whatsapp,
  fromTo: {
    callDirection: Calls.CallDirection.incomming,
    phoneNumber: '989-8728812'
  },
  type: Calls.CallTypes.incomming,
  source: Calls.SourceTypes.audio,
  duration: 60000,
  cueData: [],
  date: 7872993923,
  isFavorite: false,
  isRead: false,
  hasNotes: false,
  hasTranslation: false,
  tags: [],
}

const now = new Date();

export let getDate = () => {
  return now.getTime() - Math.floor((Math.random() * 10000000000));
}

const getPhoneNumber = () => {
  return phoneNumbers[Math.floor((Math.random() * phoneNumbers.length))]
}

const getCallType = () => {
  let num = Math.floor((Math.random() * 3));
  let type;
  switch (num) {
    case 0:
      type = Calls.CallTypes.incomming;
      break;
    case 1:
      type = Calls.CallTypes.outgoing;
      break;
    case 2:
      type = Calls.CallTypes.unanswered;
      break;
    default:
      break;
  }
  return type;
};

const getApp = () => {
  let num = Math.floor((Math.random() * 4));
  let service;
  switch (num) {
    case 0:
      service = AppSymbols.APP_SYMBOLS.whatsapp;
      break;
    case 1:
      service = AppSymbols.APP_SYMBOLS.skype;
      break;
    case 2:
      service = AppSymbols.APP_SYMBOLS.telegram;
      break;
    case 3:
      service = AppSymbols.APP_SYMBOLS.viber;
      break;
    default:
      break;
  }
  return service;
};

const getSource = () => {
  let num = Math.floor((Math.random() * 5));
  let source;
  switch (num) {
    case 4:
      source = Calls.SourceTypes.video;
      break;
    default:
      source = Calls.SourceTypes.audio;
      break;
  }
  return source;
};

const fillCuesData = (cueArray: Calls.CueData[], duration: number) => {
  for (let time = 0; time < duration; time = time + Math.floor(duration / 5)) {
    const cueData = {
      id: ++idGen,
      time: time,
      note: cueNodes[Math.random() * cueNodes.length]
    }
    cueArray.push(cueData);
  }
}

let TABLE_DATA: any[] = [];

const createCalls = () => {
  for (let i = 0; i < 300; i++) {
    const fromTo = {
      callDirection: Math.floor((Math.random() * 2)) % 2 === 0,
      phoneNumber: getPhoneNumber(),
    }
    const call = IMM.fromJS(callProto).toJS();
    const id = ++idGen;
    call.id = id;
    call.appSymbol = getApp();
    call.type = getCallType();
    call.fromTo = fromTo;
    call.source = getSource();
    call.duration = Math.max(Math.floor((Math.random() * 600000)), 10000);
    call.date = getDate();
    call.isRead = Math.floor((Math.random() * 5)) % 5 === 0;
    call.isFavorite = Math.floor((Math.random() * 5)) % 5 === 0;
    call.tags = ['tag' + ((id + 1) * 2)];
    fillCuesData(call.cueData, call.duration);

    TABLE_DATA.push(call);
  }
}

createCalls();

const sortByAppSymbol = (data: Calls.CallData[], desc: boolean) => {
  data.sort((x, y) => {
    const fieldX = x.appSymbol.key;
    const fieldY = y.appSymbol.key;
    let result = fieldX > fieldY
      ? 1
      : ( fieldY === fieldX
        ? 0
        : -1);
    result = desc ? -1 * result : result;
    return result;
  })
}

const sortDefault = (data: Calls.CallData[], sortBy: string, desc: boolean) => {
  data.sort((x, y) => {
    const fieldX = x[sortBy].toString();
    const fieldY = y[sortBy].toString();
    let result = fieldX > fieldY
      ? 1
      : ( fieldY === fieldX
        ? 0
        : -1);
    result = desc ? -1 * result : result;
    return result;
  })
}

const sortByFromTo = (data: Calls.CallData[], desc: boolean) => {
  data.sort((x, y) => {
    const fieldX = x.fromTo;
    const fieldY = y.fromTo;
    let result = 0;

    if (fieldX.phoneNumber > fieldY.phoneNumber) {
      result = 1;
    } else if (fieldY.phoneNumber > fieldX.phoneNumber) {
      result = -1
    } else {
      const xFromTo = fieldX.callDirection ? 1 : 0;
      const yFromTo = fieldY.callDirection ? 1 : 0;

      if (xFromTo > yFromTo) {
        result = 1;
      } else if (yFromTo > xFromTo) {
        result = -1;
      }
    }

    result = desc ? -1 * result : result;

    return result;
  })
}

export const getData = (nextPageNumber: number, pageSize: number, filters: Calls.Filters) => {
  //
  // Columns to be sorted or filterd by may be repersented here by their dataKey,
  // or by appSymbol.key of the items, as appSymbol is not a flat string value:
  //
  //
  const data = TABLE_DATA.filter((item) => {
    return !filters ||
      filters.boolean && !filters.boolean.size ||
      filters.boolean && filters.boolean.has(item.appSymbol.key);
  });

  const sortBy = filters && filters.sort ? filters.sort.sortBy : null;
  const desc = filters && filters.sort ? filters.sort.desc : null;
  if (sortBy) {
    switch (sortBy) {
      case 'appSymbol':
        sortByAppSymbol(data, desc);
        break;
      case 'fromTo':
        sortByFromTo(data, desc);
        break;
      default:
        sortDefault(data, sortBy, desc);
        break;
    }
  }

  const totalCount = data.length;

  const slicedData = {

    callsData: data.slice((nextPageNumber - 1) * pageSize, nextPageNumber * pageSize),
    nextPageNumber: nextPageNumber + 1,
    totalCount: totalCount,
  }

  return slicedData;
};

export const getItemById = (id: Prod.ProductID): Calls.CallData => {
  const item = TABLE_DATA.find(x => x.id === id);
  return item;
}
