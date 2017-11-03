import { APP_SYMBOLS } from '../types/AppSymbols'
// import {getActivityTable} from '../components/Common/ActivityPattern/mock'
import { EntityStatus } from '../types/Enums'
import { FiltersData } from '../types/Filters'
import { getPerson } from './Persons'
import * as ContactsCommon from 'common-interfaces/types/Contacts'
import * as APITypes from '../api/types'

const now = new Date();
const ms = now.getTime();

let getApp = () => {
  let num = Math.floor((Math.random() * 7));
  let app;
  switch (num) {
    case 0:
      app = APP_SYMBOLS.phone.key;
      break;
    case 1:
      app = APP_SYMBOLS.mail.key;
      break;
    case 2:
      app = APP_SYMBOLS.facebook_messenger.key;
      break;
    case 3:
      app = APP_SYMBOLS.whatsapp.key;
      break;
    case 4:
      app = APP_SYMBOLS.skype.key;
      break;
    case 5:
      app = APP_SYMBOLS.hangouts.key;
      break;
    case 6:
      app = APP_SYMBOLS.line.key;
      break;
    default:
      break;
  }
  return app;
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

// const getStatistics = () => {
//   return {
//     ingoing: Math.floor((Math.random() * 30)),
//     outgoing: Math.floor((Math.random() * 30))
//   }
// }

let BASE_TABLE_DATA: any[] = [
  {
    id: 1,
    app: getApp(),
    details: 'Jackass news',
    lastChat: ms,
    status: getRandomStatus(),
    date: ms,
    tags: [],
    isFavorite: true,
  }, {
    id: 2,
    app: getApp(),
    details: 'Minor terror details',
    lastChat: ms,
    status: getRandomStatus(),
    date: ms,
    tags: [],
    isFavorite: false,
  }, {
    id: 3,
    app: getApp(),
    details: 'Minor terror details',
    lastChat: ms,
    status: getRandomStatus(),
    date: ms,
    tags: [],
    isFavorite: false,
  }, {
    id: 4,
    app: getApp(),
    details: 'Minor terror details',
    lastChat: ms,
    status: getRandomStatus(),
    date: ms,
    tags: [],
    isFavorite: false,
  }, {
    id: 5,
    app: getApp(),
    details: 'Minor terror details',
    lastChat: ms,
    status: getRandomStatus(),
    date: ms,
    tags: [],
    isFavorite: false,
  }, {
    id: 6,
    app: getApp(),
    fat: '6.0',
    details: 'Minor terror details',
    lastChat: ms,
    status: getRandomStatus(),
    date: ms,
    tags: [],
    isFavorite: true,
  }, {
    id: 7,
    app: getApp(),
    details: 'Minor terror details',
    lastChat: ms,
    status: getRandomStatus(),
    date: ms,
    tags: [],
    isFavorite: false,
  }, {
    id: 8,
    app: getApp(),
    details: 'Minor terror details',
    lastChat: ms,
    status: getRandomStatus(),
    date: ms,
    tags: [],
    isFavorite: true,
  }, {
    id: 9,
    app: getApp(),
    details: 'Minor terror details',
    lastChat: ms,
    status: getRandomStatus(),
    date: ms,
    tags: [],
    isFavorite: false,
  }, {
    id: 10,
    app: getApp(),
    details: 'Minor terror details',
    lastChat: ms,
    status: getRandomStatus(),
    date: ms,
    tags: [],
    isFavorite: false,
  },
  {
    id: 11,
    app: getApp(),
    details: 'Minor terror details',
    lastChat: ms,
    status: getRandomStatus(),
    date: ms,
    tags: [],
    isFavorite: true,
  }, {
    id: 12,
    app: getApp(),
    details: 'Minor terror details',
    lastChat: ms,
    status: getRandomStatus(),
    date: ms,
    tags: [],
    isFavorite: false,
  }, {
    id: 13,
    app: getApp(),
    details: 'Minor terror details',
    lastChat: ms,
    status: getRandomStatus(),
    date: ms,
    tags: [],
    isFavorite: false,
  }, {
    id: 14,
    app: getApp(),
    details: 'Minor terror details',
    lastChat: ms,
    status: getRandomStatus(),
    date: ms,
    tags: [],
    isFavorite: false,
  }, {
    id: 15,
    app: getApp(),
    details: 'Minor terror details',
    lastChat: ms,
    status: getRandomStatus(),
    date: ms,
    tags: [],
    isFavorite: false,
  }, {
    id: 16,
    app: getApp(),
    details: 'Minor terror details',
    lastChat: ms,
    status: getRandomStatus(),
    date: ms,
    tags: [],
    isFavorite: true,
  }, {
    id: 17,
    app: getApp(),
    details: 'Minor terror details',
    lastChat: ms,
    status: getRandomStatus(),
    date: ms,
    tags: [],
    isFavorite: false,
  }, {
    id: 18,
    app: getApp(),
    details: 'Minor terror details',
    lastChat: ms,
    status: getRandomStatus(),
    date: ms,
    tags: [],
    isFavorite: true,
  }, {
    id: 19,
    app: getApp(),
    details: 'Minor terror details',
    lastChat: ms,
    status: getRandomStatus(),
    date: ms,
    tags: [],
    isFavorite: false,
  }, {
    id: 20,
    app: getApp(),
    details: 'Minor terror details',
    lastChat: ms,
    status: getRandomStatus(),
    date: ms,
    tags: [],
    isFavorite: false,
  },
  {
    id: 21,
    app: getApp(),
    details: 'Minor terror details',
    lastChat: ms,
    status: getRandomStatus(),
    date: ms,
    tags: [],
    isFavorite: true,
  }, {
    id: 22,
    app: getApp(),
    details: 'Minor terror details',
    lastChat: ms,
    status: getRandomStatus(),
    date: ms,
    tags: [],
    isFavorite: false,
  }, {
    id: 23,
    app: getApp(),
    details: 'Minor terror details',
    lastChat: ms,
    status: getRandomStatus(),
    date: ms,
    tags: [],
    isFavorite: false,
  }, {
    id: 24,
    app: getApp(),
    details: 'Minor terror details',
    lastChat: ms,
    status: getRandomStatus(),
    date: ms,
    tags: [],
    isFavorite: false,
  }, {
    id: 25,
    app: getApp(),
    details: 'Minor terror details',
    lastChat: ms,
    status: getRandomStatus(),
    date: ms,
    tags: [],
    isFavorite: false,
  }, {
    id: 26,
    app: getApp(),
    fat: '6.0',
    details: 'Minor terror details',
    lastChat: ms,
    status: getRandomStatus(),
    date: ms,
    tags: [],
    isFavorite: true,
  }, {
    id: 27,
    app: getApp(),
    details: 'Minor terror details',
    lastChat: ms,
    status: getRandomStatus(),
    date: ms,
    tags: [],
    isFavorite: false,
  }, {
    id: 28,
    app: getApp(),
    details: 'Minor terror details',
    lastChat: ms,
    status: getRandomStatus(),
    date: ms,
    tags: [],
    isFavorite: true,
  }, {
    id: 29,
    app: getApp(),
    details: 'Minor terror details',
    lastChat: ms,
    status: getRandomStatus(),
    date: ms,
    tags: [],
    isFavorite: false,
  }, {
    id: 30,
    app: getApp(),
    details: 'Minor terror details',
    lastChat: ms,
    status: getRandomStatus(),
    date: ms,
    tags: [],
    isFavorite: false,
  },
  {
    id: 31,
    app: getApp(),
    details: 'Minor terror details',
    lastChat: ms,
    status: getRandomStatus(),
    date: ms,
    tags: [],
    isFavorite: true,
  }, {
    id: 32,
    app: getApp(),
    details: 'Minor terror details',
    lastChat: ms,
    status: getRandomStatus(),
    date: ms,
    tags: [],
    isFavorite: false,
  }, {
    id: 33,
    app: getApp(),
    details: 'Minor terror details',
    lastChat: ms,
    status: getRandomStatus(),
    date: ms,
    tags: [],
    isFavorite: false,
  }, {
    id: 34,
    app: getApp(),
    details: 'Minor terror details',
    lastChat: ms,
    status: getRandomStatus(),
    date: ms,
    tags: [],
    isFavorite: false,
  }, {
    id: 35,
    app: getApp(),
    details: 'Minor terror details',
    lastChat: ms,
    status: getRandomStatus(),
    date: ms,
    tags: [],
    isFavorite: false,
  }, {
    id: 36,
    app: getApp(),
    fat: '6.0',
    details: 'Minor terror details',
    lastChat: ms,
    status: getRandomStatus(),
    date: ms,
    tags: [],
    isFavorite: true,
  }, {
    id: 37,
    app: getApp(),
    details: 'Minor terror details',
    lastChat: ms,
    status: getRandomStatus(),
    date: ms,
    tags: [],
    isFavorite: false,
  }, {
    id: 38,
    app: getApp(),
    details: 'Minor terror details',
    lastChat: ms,
    status: getRandomStatus(),
    date: ms,
    tags: ['Suspect', 'Terorist'],
    isFavorite: true,
  }, {
    id: 39,
    app: getApp(),
    details: 'Minor terror details',
    lastChat: ms,
    status: getRandomStatus(),
    date: ms,
    tags: [],
    isFavorite: false,
  }, {
    id: 40,
    app: getApp(),
    details: 'Minor terror details',
    lastChat: ms,
    status: getRandomStatus(),
    date: ms,
    tags: [],
    isFavorite: false,
  },
];

BASE_TABLE_DATA.forEach((item, index) => {
  const personPart = getPerson();

  item = Object.assign(item, personPart);
  item.tags = ['tag' + ((index + 1) * 2)];

  // item.dateModified = ms;
  item.lastOnline = ms;
  // item.dateAdded = ms;
  item.phoneHome = '+56 78129821';
  item.identifier = '+56 78129821 werterter ertert ert ert';
  // item.insights = {
  //   activityPattern: getActivityTable(),
  //   statistics: getStatistics()
  // }

});

let TABLE_DATA: ContactsCommon.Contact[];

for (let i = 0; i < 400; i++) {
  TABLE_DATA = BASE_TABLE_DATA.map((x) => {

    const clone = Object.assign({}, x);

    clone.id = clone.id + 100 * i;
    clone.name = clone.name + clone.id;
    return clone;
  }).concat(TABLE_DATA);
}

const sortByName = (data: ContactsCommon.Contact[], desc: boolean) => {
  data.sort((x, y) => {
    const fieldX = x.name;
    const fieldY = y.name;
    let result = fieldX > fieldY
      ? 1
      : ( fieldY === fieldX
        ? 0
        : -1);
    result = desc ? -1 * result : result;
    return result;
  })
}

const sortDefault = (data: ContactsCommon.Contact[], sortBy: string, desc: boolean) => {
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
// const sortByKey = (data: ContactsCommon.Contact[], sortBy: string, desc: boolean) => {
//   data.sort((x, y) => {
//     const fieldX = x[sortBy].key ? x[sortBy].key : x[sortBy].toString();
//     const fieldY = y[sortBy].key ? y[sortBy].key : y[sortBy].toString();
//     let result = fieldX > fieldY
//       ? 1
//       : ( fieldY === fieldX
//         ? 0
//         : -1);
//     result = desc ? -1 * result : result;
//     return result;
//   })
// }
export const getData = (dataSource: any,
                        nextPageNumber: number,
                        pageSize: number,
                        filters: FiltersData) => {
  //
  // Columns to be sorted or filterd by may be repersented here by their dataKey,
  //
  dataSource = dataSource || TABLE_DATA;
  const data = dataSource.filter((item) => {
    if (!item) {
      return false;
    }
    return !filters ||
      filters.boolean && !filters.boolean.length ||
      filters.boolean && filters.boolean.find(x => x === item.app);
  });

  const sortBy = filters && filters.sort ? filters.sort.sortBy : undefined;
  const desc = filters && filters.sort ? filters.sort.desc : undefined;

  if (sortBy) {
    switch (sortBy) {
      case 'name':
        sortByName(data, desc);
        break;
      case 'app':
        sortDefault(data, sortBy, desc);
        break;
      default:
        sortDefault(data, sortBy, desc);
        break;
    }
  }

  const totalCount = data.length;

  const slicedData = {

    contacts: data.slice((nextPageNumber - 1) * pageSize, nextPageNumber * pageSize),
    nextPageNumber: nextPageNumber + 1,
    totalCount: totalCount,
  }

  return slicedData;
};

export const serverContactsDataMethod = () => {
  return TABLE_DATA.slice(0, 25);
};

export const serverContactsDataMethodForTesting = (query: APITypes.ApiQueryParams) => {
  const {skip, limit} = query
  return getData(null, skip / limit + 1, limit, null).contacts;
};
