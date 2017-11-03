import { APP_SYMBOLS } from '../../../types/AppSymbols'
import { getActivityTable } from '../../Common/ActivityPattern/mock'
import { EntityStatus } from '../../../types/Enums'
import {
  PASSWORD_DEFAULT, isDefaultPassword, AccountItem, PasswordAction
} from '../../../types/Accounts'
import { FiltersData } from '../../../types/Filters'

const passwords = [
  'df998!9', 'dontremmeber678', '~you2_88', '56haroldc',
  'HooRU???', 'pooh6402', 'myPWs&csA??', 'roland80@',
  '861102sex<<', 'luckyman_0981'
]

const now = new Date();

export let getDate = () => {
  return now.getTime() - Math.floor((Math.random() * 10000000000));
}

let getService = () => {
  let num = Math.floor((Math.random() * 5));
  let service;
  switch (num) {
    case 0:
      service = APP_SYMBOLS.facebook;
      break;
    case 1:
      service = APP_SYMBOLS.google;
      break;
    case 2:
      service = APP_SYMBOLS.yahoo;
      break;
    case 3:
      service = APP_SYMBOLS.amazon;
      break;
    case 4:
      service = APP_SYMBOLS.dropbox;
      break;
    case 5:
      service = APP_SYMBOLS.twitter;
      break;
    case 6:
      service = APP_SYMBOLS.linkedin;
      break;
    default:
      break;
  }
  return service;
};

let getPlatform = () => {
  let num = Math.floor((Math.random() * 5));
  let service;
  switch (num) {
    case 0:
      service = APP_SYMBOLS.chrome;
      break;
    case 1:
      service = APP_SYMBOLS.googledrive;
      break;
    case 2:
      service = APP_SYMBOLS.firefox;
      break;
    case 3:
      service = APP_SYMBOLS.ie;
      break;
    case 4:
      service = APP_SYMBOLS.safari;
      break;
    default:
      break;
  }
  return service;
};

const getRandomStatus = () => {
  const rand = Math.floor((Math.random() * 4));

  let status: EntityStatus;

  switch (rand) {
    case 0:
      status = EntityStatus.created;
      break;
    case 1:
      status = EntityStatus.modified;
      break;
    case 2:
      status = EntityStatus.accessed;
      break;
    case 3:
      status = EntityStatus.deleted;
      break;
    default:
      break;
  }

  return status;
};

let getPassword = () => {
  const hasConflict = Math.floor((Math.random() * 15)) % 7 === 0
  const pw = !hasConflict
    ? {
      value: passwords[Math.floor((Math.random() * 10))],
      lastUsed: getDate(),
    }
    : PASSWORD_DEFAULT;
  return pw;
};

let getRemarks = () => {
  const remarks = Math.floor((Math.random() * 15)) % 7 === 0
    ? 'These is my excelent remarks'
    : null;
  return remarks;
};

let getPWRemarks = (hasPassword: boolean) => {
  const remarks = hasPassword && Math.floor((Math.random() * 15)) % 7 === 0
    ? 'I have excelent PW remarks'
    : null;
  return remarks;
};

let getPWTranscription = (hasPassword: boolean) => {
  const remarks = hasPassword && Math.floor((Math.random() * 15)) % 7 === 0
    ? 'I requested some PW transcription'
    : null;
  return remarks;
};

let getPrevPasswords = () => {
  const pws = [];
  for (let i = 0; i < Math.floor((Math.random() * 4)); i++) {
    pws.push(getPassword());
  }

  return pws;
}

let getConflictedPassword = (isExtracted: boolean) => {
  const cpw = {
    value: passwords[Math.floor((Math.random() * 10))],
    actionStatus: isExtracted ? PasswordAction.extracted : PasswordAction.manuallyAdded,
    actionDate: getDate(),
  }
  return cpw;
};

let getConflictedPasswords = (hasPassword: boolean) => {
  const conflictedPWs = hasPassword ? null : [];

  if (conflictedPWs) {
    for (let i = 0; i < 2; i++) {
      conflictedPWs.push(getConflictedPassword(i % 2 === 0));
    }
  }
  return conflictedPWs;
};

let BASE_TABLE_DATA: any[] = [
  {
    id: 1,
    accountName: 'Frozen yogurt1',
    service: getService(),
    password: getPassword(),
    platform: getPlatform(),
    lastUsed: getDate(),
    status: getRandomStatus(),
    remarks: getRemarks(),
    tags: [],
    isFavorite: true,
  }, {
    id: 2,
    accountName: 'Ice cream sandwich1',
    service: getService(),
    password: getPassword(),
    platform: getPlatform(),
    lastUsed: getDate(),
    status: getRandomStatus(),
    remarks: getRemarks(),
    tags: [],
    isFavorite: false,
  }, {
    id: 3,
    accountName: 'Eclair',
    service: getService(),
    password: getPassword(),
    platform: getPlatform(),
    lastUsed: getDate(),
    status: getRandomStatus(),
    remarks: getRemarks(),
    tags: [],
    isFavorite: false,
  }, {
    id: 4,
    accountName: 'Cupcake',
    service: getService(),
    password: getPassword(),
    platform: getPlatform(),
    lastUsed: getDate(),
    status: getRandomStatus(),
    remarks: getRemarks(),
    tags: [],
    isFavorite: false,
  }, {
    id: 5,
    accountName: 'Gingerbread',
    service: getService(),
    password: getPassword(),
    platform: getPlatform(),
    lastUsed: getDate(),
    status: getRandomStatus(),
    remarks: getRemarks(),
    tags: [],
    isFavorite: false,
  }, {
    id: 6,
    accountName: 'Jelly bean',
    service: getService(),
    password: getPassword(),
    platform: getPlatform(),
    lastUsed: getDate(),
    status: getRandomStatus(),
    remarks: getRemarks(),
    tags: [],
    isFavorite: true,
  }, {
    id: 7,
    accountName: 'Lollipop',
    service: getService(),
    password: getPassword(),
    platform: getPlatform(),
    lastUsed: getDate(),
    status: getRandomStatus(),
    remarks: getRemarks(),
    tags: [],
    isFavorite: false,
  }, {
    id: 8,
    accountName: 'Honeycomb',
    service: getService(),
    password: getPassword(),
    platform: getPlatform(),
    lastUsed: getDate(),
    status: getRandomStatus(),
    remarks: getRemarks(),
    tags: [],
    isFavorite: true,
  }, {
    id: 9,
    accountName: 'Donut',
    service: getService(),
    password: getPassword(),
    platform: getPlatform(),
    lastUsed: getDate(),
    status: getRandomStatus(),
    remarks: getRemarks(),
    tags: [],
    isFavorite: false,
  }, {
    id: 10,
    accountName: 'KitKat',
    service: getService(),
    password: getPassword(),
    platform: getPlatform(),
    lastUsed: getDate(),
    status: getRandomStatus(),
    remarks: getRemarks(),
    tags: [],
    isFavorite: false,
  },
  {
    id: 11,
    accountName: 'Frozen yogurt1',
    service: getService(),
    password: getPassword(),
    platform: getPlatform(),
    lastUsed: getDate(),
    status: getRandomStatus(),
    remarks: getRemarks(),
    tags: [],
    isFavorite: true,
  }, {
    id: 12,
    accountName: 'Ice cream sandwich1',
    service: getService(),
    password: getPassword(),
    platform: getPlatform(),
    lastUsed: getDate(),
    status: getRandomStatus(),
    remarks: getRemarks(),
    tags: [],
    isFavorite: false,
  }, {
    id: 13,
    accountName: 'Eclair',
    service: getService(),
    password: getPassword(),
    platform: getPlatform(),
    lastUsed: getDate(),
    status: getRandomStatus(),
    remarks: getRemarks(),
    tags: [],
    isFavorite: false,
  }, {
    id: 14,
    accountName: 'Cupcake',
    service: getService(),
    password: getPassword(),
    platform: getPlatform(),
    lastUsed: getDate(),
    status: getRandomStatus(),
    remarks: getRemarks(),
    tags: [],
    isFavorite: false,
  }, {
    id: 15,
    accountName: 'Gingerbread',
    service: getService(),
    password: getPassword(),
    platform: getPlatform(),
    lastUsed: getDate(),
    status: getRandomStatus(),
    remarks: getRemarks(),
    tags: [],
    isFavorite: false,
  }, {
    id: 16,
    accountName: 'Jelly bean',
    service: getService(),
    password: getPassword(),
    platform: getPlatform(),
    lastUsed: getDate(),
    status: getRandomStatus(),
    remarks: getRemarks(),
    tags: [],
    isFavorite: true,
  }, {
    id: 17,
    accountName: 'Lollipop',
    service: getService(),
    password: getPassword(),
    platform: getPlatform(),
    lastUsed: getDate(),
    status: getRandomStatus(),
    remarks: getRemarks(),
    tags: [],
    isFavorite: false,
  }, {
    id: 18,
    accountName: 'Honeycomb',
    service: getService(),
    password: getPassword(),
    platform: getPlatform(),
    lastUsed: getDate(),
    status: getRandomStatus(),
    remarks: getRemarks(),
    tags: [],
    isFavorite: true,
  }, {
    id: 19,
    accountName: 'Donut',
    service: getService(),
    password: getPassword(),
    platform: getPlatform(),
    lastUsed: getDate(),
    status: getRandomStatus(),
    remarks: getRemarks(),
    tags: [],
    isFavorite: false,
  }, {
    id: 20,
    accountName: 'KitKat',
    service: getService(),
    password: getPassword(),
    platform: getPlatform(),
    lastUsed: getDate(),
    status: getRandomStatus(),
    remarks: getRemarks(),
    tags: [],
    isFavorite: false,
  },
  {
    id: 21,
    accountName: 'Frozen yogurt1',
    service: getService(),
    password: getPassword(),
    platform: getPlatform(),
    lastUsed: getDate(),
    status: getRandomStatus(),
    remarks: getRemarks(),
    tags: [],
    isFavorite: true,
  }, {
    id: 22,
    accountName: 'Ice cream sandwich1',
    service: getService(),
    password: getPassword(),
    platform: getPlatform(),
    lastUsed: getDate(),
    status: getRandomStatus(),
    remarks: getRemarks(),
    tags: [],
    isFavorite: false,
  }, {
    id: 23,
    accountName: 'Eclair',
    service: getService(),
    password: getPassword(),
    platform: getPlatform(),
    lastUsed: getDate(),
    status: getRandomStatus(),
    remarks: getRemarks(),
    tags: [],
    isFavorite: false,
  }, {
    id: 24,
    accountName: 'Cupcake',
    service: getService(),
    password: getPassword(),
    platform: getPlatform(),
    lastUsed: getDate(),
    status: getRandomStatus(),
    remarks: getRemarks(),
    tags: [],
    isFavorite: false,
  }, {
    id: 25,
    accountName: 'Gingerbread',
    service: getService(),
    password: getPassword(),
    platform: getPlatform(),
    lastUsed: getDate(),
    status: getRandomStatus(),
    remarks: getRemarks(),
    tags: [],
    isFavorite: false,
  }, {
    id: 26,
    accountName: 'Jelly bean',
    service: getService(),
    password: getPassword(),
    platform: getPlatform(),
    lastUsed: getDate(),
    status: getRandomStatus(),
    remarks: getRemarks(),
    tags: [],
    isFavorite: true,
  }, {
    id: 27,
    accountName: 'Lollipop',
    service: getService(),
    password: getPassword(),
    platform: getPlatform(),
    lastUsed: getDate(),
    status: getRandomStatus(),
    remarks: getRemarks(),
    tags: [],
    isFavorite: false,
  }, {
    id: 28,
    accountName: 'Honeycomb',
    service: getService(),
    password: getPassword(),
    platform: getPlatform(),
    lastUsed: getDate(),
    status: getRandomStatus(),
    remarks: getRemarks(),
    tags: [],
    isFavorite: true,
  }, {
    id: 29,
    accountName: 'Donut',
    service: getService(),
    password: getPassword(),
    platform: getPlatform(),
    lastUsed: getDate(),
    status: getRandomStatus(),
    remarks: getRemarks(),
    tags: [],
    isFavorite: false,
  }, {
    id: 30,
    accountName: 'KitKat',
    service: getService(),
    password: getPassword(),
    platform: getPlatform(),
    lastUsed: getDate(),
    status: getRandomStatus(),
    remarks: getRemarks(),
    tags: [],
    isFavorite: false,
  },
  {
    id: 31,
    accountName: 'Frozen yogurt1',
    service: getService(),
    password: getPassword(),
    platform: getPlatform(),
    lastUsed: getDate(),
    status: getRandomStatus(),
    remarks: getRemarks(),
    tags: [],
    isFavorite: true,
  }, {
    id: 32,
    accountName: 'Ice cream sandwich1',
    service: getService(),
    password: getPassword(),
    platform: getPlatform(),
    lastUsed: getDate(),
    status: getRandomStatus(),
    remarks: getRemarks(),
    tags: [],
    isFavorite: false,
  }, {
    id: 33,
    accountName: 'Eclair',
    service: getService(),
    password: getPassword(),
    platform: getPlatform(),
    lastUsed: getDate(),
    status: getRandomStatus(),
    remarks: getRemarks(),
    tags: [],
    isFavorite: false,
  }, {
    id: 34,
    accountName: 'Cupcake',
    service: getService(),
    password: getPassword(),
    platform: getPlatform(),
    lastUsed: getDate(),
    status: getRandomStatus(),
    remarks: getRemarks(),
    tags: [],
    isFavorite: false,
  }, {
    id: 35,
    accountName: 'Gingerbread',
    service: getService(),
    password: getPassword(),
    platform: getPlatform(),
    lastUsed: getDate(),
    status: getRandomStatus(),
    remarks: getRemarks(),
    tags: [],
    isFavorite: false,
  }, {
    id: 36,
    accountName: 'Jelly bean',
    service: getService(),
    password: getPassword(),
    platform: getPlatform(),
    lastUsed: getDate(),
    status: getRandomStatus(),
    remarks: getRemarks(),
    tags: [],
    isFavorite: true,
  }, {
    id: 37,
    accountName: 'Lollipop',
    service: getService(),
    password: getPassword(),
    platform: getPlatform(),
    lastUsed: getDate(),
    status: getRandomStatus(),
    remarks: getRemarks(),
    tags: [],
    isFavorite: false,
  }, {
    id: 38,
    accountName: 'Honeycomb',
    service: getService(),
    password: getPassword(),
    platform: getPlatform(),
    lastUsed: getDate(),
    status: getRandomStatus(),
    remarks: getRemarks(),
    tags: ['Suspect', 'Terorist'],
    isFavorite: true,
  }, {
    id: 39,
    accountName: 'Donut',
    service: getService(),
    password: getPassword(),
    platform: getPlatform(),
    lastUsed: getDate(),
    status: getRandomStatus(),
    remarks: getRemarks(),
    tags: [],
    isFavorite: false,
  }, {
    id: 40,
    accountName: 'KitKat',
    service: getService(),
    password: getPassword(),
    platform: getPlatform(),
    lastUsed: getDate(),
    status: getRandomStatus(),
    remarks: getRemarks(),
    tags: [],
    isFavorite: false,
  },
];

BASE_TABLE_DATA.forEach((item, index) => {
  const hasPassword = !isDefaultPassword(item.password);

  item.tags = ['tag' + ((index + 1) * 2)];
  item.prevPasswords = getPrevPasswords();
  item.conflictedPasswords = getConflictedPasswords(hasPassword);
  item.passwordRemarks = getPWRemarks(hasPassword);
  item.passwordTranscription = getPWTranscription(hasPassword);
  item.insights = {
    activityPattern: getActivityTable()
  }
});

let TABLE_DATA = [];
for (let i = 0; i < 100; i++) {
  TABLE_DATA = BASE_TABLE_DATA.map((x) => {

    const clone = Object.assign({}, x);

    clone.id = clone.id + 100 * i;
    clone.accountName = clone.accountName + clone.id;
    return clone;
  }).concat(TABLE_DATA);
}

const sortByPassword = (data: AccountItem[], desc: boolean) => {
  data.sort((x, y) => {
    const fieldX = x.password.value;
    const fieldY = y.password.value;
    let result = fieldX > fieldY
      ? 1
      : ( fieldY === fieldX
        ? 0
        : -1);
    result = desc ? -1 * result : result;
    return result;
  })
}

const sortDefault = (data: AccountItem[], sortBy: string, desc: boolean) => {
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

const sortByKey = (data: AccountItem[], sortBy: string, desc: boolean) => {
  data.sort((x, y) => {
    const fieldX = x[sortBy].key ? x[sortBy].key : x[sortBy].toString();
    const fieldY = y[sortBy].key ? y[sortBy].key : y[sortBy].toString();
    let result = fieldX > fieldY
      ? 1
      : ( fieldY === fieldX
        ? 0
        : -1);
    result = desc ? -1 * result : result;
    return result;
  })
}

export const getData = (nextPageNumber: number, pageSize: number, filters: FiltersData) => {
  //
  // Columns to be sorted or filterd by may be repersented here by their dataKey,
  // or by appSymbol.key of the items, as appSymbol is not a flat string value:
  //
  //
  const data = TABLE_DATA.filter((item) => {
    return !filters ||
      filters.boolean && !filters.boolean.length ||
      filters.boolean && filters.boolean.find(x => x === item.appSymbol.key);
  });

  const sortBy = filters && filters.sort ? filters.sort.sortBy : null;
  const desc = filters && filters.sort ? filters.sort.desc : null;
  if (sortBy) {
    switch (sortBy) {
      case 'password':
        sortByPassword(data, desc);
        break;
      case 'service':
      case 'platform':
        sortByKey(data, sortBy, desc);
        break;
      default:
        sortDefault(data, sortBy, desc);
        break;
    }
  }

  const totalCount = data.length;

  const slicedData = {

    accountItems: data.slice((nextPageNumber - 1) * pageSize, nextPageNumber * pageSize),
    nextPageNumber: nextPageNumber + 1,
    totalCount: totalCount,
  }

  return slicedData;
};

export const getItemById = (accountItemId: number): AccountItem => {
  const item = TABLE_DATA.find(x => x.id === accountItemId) as AccountItem;
  return item;
}
