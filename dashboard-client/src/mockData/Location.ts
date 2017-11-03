import { Location } from 'common-interfaces/types/Location';
import * as API from '../api/types'

export const demoLocationData: Location[] = [{
  longitude: 123,
  latitude: 456,
  timestamp: 1,
  id: '1',
  isFavorite: true,
  hasNotes: false,
  hasTranslation: false,
  hasTranscript: false,
  isRead: true,
  tags: ['Home', 'Work'],
}, {
  longitude: 123,
  latitude: 456,
  timestamp: 2,
  id: '2',
  isFavorite: false,
  hasNotes: false,
  hasTranslation: false,
  hasTranscript: false,
  isRead: true,
  tags: [],
}, {
  longitude: 1233,
  latitude: 4563,
  timestamp: 0,
  id: '3',
  isFavorite: false,
  hasNotes: true,
  hasTranslation: false,
  hasTranscript: false,
  isRead: false,
  tags: [],
}, {
  longitude: 1233,
  latitude: 4563,
  timestamp: 2,
  id: '15',
  isFavorite: false,
  hasNotes: false,
  hasTranslation: false,
  hasTranscript: false,
  isRead: true,
  tags: [],
}, {
  longitude: 12345,
  latitude: 45645,
  timestamp: 1,
  id: '4',
  isFavorite: false,
  hasNotes: false,
  hasTranslation: false,
  hasTranscript: false,
  isRead: true,
  tags: [],
}, {
  longitude: 89,
  latitude: 45609,
  timestamp: 1,
  id: '5',
  isFavorite: false,
  hasNotes: false,
  hasTranslation: false,
  hasTranscript: false,
  isRead: true,
  tags: [],
}, {
  longitude: 12323,
  latitude: 45656,
  timestamp: 1,
  id: '6',
  isFavorite: false,
  hasNotes: false,
  hasTranslation: false,
  hasTranscript: false,
  isRead: false,
  tags: [],
}, {
  longitude: 12312,
  latitude: 45612,
  timestamp: 1,
  id: '7',
  isFavorite: false,
  hasNotes: false,
  hasTranslation: false,
  hasTranscript: false,
  isRead: true,
  tags: [],
}, {
  longitude: 12312,
  latitude: 45612,
  timestamp: 2,
  id: '8',
  isFavorite: false,
  hasNotes: false,
  hasTranslation: false,
  hasTranscript: false,
  isRead: true,
  tags: [],
}, {
  longitude: 123546,
  latitude: 456456,
  timestamp: 1,
  id: '9',
  isFavorite: false,
  hasNotes: false,
  hasTranslation: false,
  hasTranscript: false,
  isRead: true,
  tags: [],
}, {
  longitude: 123345,
  latitude: 456456,
  timestamp: 1,
  id: '10',
  isFavorite: false,
  hasNotes: false,
  hasTranslation: false,
  hasTranscript: false,
  isRead: true,
  tags: [],
}, {
  longitude: 123435,
  latitude: 456345,
  timestamp: 1,
  id: '11',
  isFavorite: false,
  hasNotes: false,
  hasTranslation: false,
  hasTranscript: false,
  isRead: true,
  tags: [],
}, {
  longitude: 123978,
  latitude: 456879,
  timestamp: 1,
  id: '12',
  isFavorite: false,
  hasNotes: false,
  hasTranslation: false,
  hasTranscript: false,
  isRead: true,
  tags: [],
}, {
  longitude: 123678,
  latitude: 456879,
  timestamp: 1,
  id: '13',
  isFavorite: false,
  hasNotes: false,
  hasTranslation: false,
  hasTranscript: false,
  isRead: true,
  tags: [],
}, {
  longitude: 123567,
  latitude: 456456,
  timestamp: 1,
  id: '14',
  isFavorite: false,
  hasNotes: false,
  hasTranslation: false,
  hasTranscript: false,
  isRead: true,
  tags: [],
}, {
  longitude: 123567,
  latitude: 456456,
  timestamp: 2,
  id: '16',
  isFavorite: false,
  hasNotes: false,
  hasTranslation: false,
  hasTranscript: false,
  isRead: true,
  tags: [],
}, {
  longitude: 123567,
  latitude: 456456,
  timestamp: 3,
  id: '17',
  isFavorite: false,
  hasNotes: false,
  hasTranslation: false,
  hasTranscript: false,
  isRead: true,
  tags: [],
}, {
  longitude: 123567,
  latitude: 456456,
  timestamp: 4,
  id: '18',
  isFavorite: false,
  hasNotes: false,
  hasTranslation: false,
  hasTranscript: false,
  isRead: true,
  tags: [],
}, {
  longitude: 123567,
  latitude: 456456,
  timestamp: 5,
  id: '19',
  isFavorite: false,
  hasNotes: false,
  hasTranslation: false,
  hasTranscript: false,
  isRead: true,
  tags: [],
}, {
  longitude: -73.989308,
  latitude: 40.742695,
  timestamp: 1,
  id: '20',
  isFavorite: false,
  hasNotes: false,
  hasTranslation: false,
  hasTranscript: false,
  isRead: true,
  tags: [],
},
];

export const serverLocationData: Location[] = [{
  id: '5988888ccc87e87fe77d2675',
  tags: [],
  isFavorite: false,
  isRead: false,
  latitude: 52.0364974,
  longitude: 4.4966213,
  timestamp: 1503236512602
}, {
  id: '5988888ccc87e87fe77d2674',
  tags: [],
  isFavorite: false,
  isRead: false,
  latitude: 52.0364778,
  longitude: 4.4965926,
  timestamp: 1503236512602
}, {
  id: '5988888bcc87e87fe77d2586',
  tags: [],
  isFavorite: false,
  isRead: false,
  latitude: 52.0364994,
  longitude: 4.4965706,
  timestamp: 1503236512602
}, {
  id: '5988888bcc87e87fe77d2587',
  tags: [],
  isFavorite: false,
  isRead: false,
  latitude: 52.0364994,
  longitude: 4.4965706,
  timestamp: 1503236512602
}, {
  id: '5988888bcc87e87fe77d2588',
  tags: [],
  isFavorite: false,
  isRead: false,
  latitude: 52.0364994,
  longitude: 4.4965706,
  timestamp: 1503236512602
}, {
  id: '5988888bcc87e87fe77d258f',
  tags: [],
  isFavorite: false,
  isRead: false,
  latitude: 52.0364994,
  longitude: 4.4965706,
  timestamp: 1503236512602
}, {
  id: '5988888bcc87e87fe77d2590',
  tags: [],
  isFavorite: false,
  isRead: false,
  latitude: 52.0364994,
  longitude: 4.4965706,
  timestamp: 1503236512602
}, {
  id: '5988888bcc87e87fe77d2591',
  tags: [],
  isFavorite: false,
  isRead: false,
  latitude: 52.0364994,
  longitude: 4.4965706,
  timestamp: 1503236512602
}, {
  id: '5988888bcc87e87fe77d2592',
  tags: [],
  isFavorite: false,
  isRead: false,
  latitude: 52.0364994,
  longitude: 4.4965706,
  timestamp: 1503236512602
}, {
  id: '5988888ccc87e87fe77d2621',
  tags: [],
  isFavorite: false,
  isRead: false,
  latitude: 52.0364994,
  longitude: 4.4965706,
  timestamp: 1503236512602
}, {
  id: '5988888ccc87e87fe77d2622',
  tags: [],
  isFavorite: false,
  isRead: false,
  latitude: 52.0364994,
  longitude: 4.4965706,
  timestamp: 1503236512602
}, {
  id: '5988888ccc87e87fe77d262c',
  tags: [],
  isFavorite: false,
  isRead: false,
  latitude: 52.0364994,
  longitude: 4.4965706,
  timestamp: 1503236512602
}, {
  id: '5988888ccc87e87fe77d2633',
  tags: [],
  isFavorite: false,
  isRead: false,
  latitude: 52.0364994,
  longitude: 4.4965706,
  timestamp: 1503236512602
}, {
  id: '5988888ccc87e87fe77d2634',
  tags: [],
  isFavorite: false,
  isRead: false,
  latitude: 52.0364994,
  longitude: 4.4965706,
  timestamp: 1503236512602
}, {
  id: '5988888ccc87e87fe77d2635',
  tags: [],
  isFavorite: false,
  isRead: false,
  latitude: 52.0364994,
  longitude: 4.4965706,
  timestamp: 1503236512602
}, {
  id: '5988888ccc87e87fe77d2637',
  tags: [],
  isFavorite: false,
  isRead: false,
  latitude: 52.0364994,
  longitude: 4.4965706,
  timestamp: 1503236512602
}, {
  id: '5988888ccc87e87fe77d2638',
  tags: [],
  isFavorite: false,
  isRead: false,
  latitude: 52.0364994,
  longitude: 4.4965706,
  timestamp: 1503236512602
}, {
  id: '5988888ccc87e87fe77d266e',
  tags: [],
  isFavorite: false,
  isRead: false,
  latitude: 52.0364994,
  longitude: 4.4965706,
  timestamp: 1503236512602
}, {
  id: '5988888ccc87e87fe77d266f',
  tags: [],
  isFavorite: false,
  isRead: false,
  latitude: 52.0364994,
  longitude: 4.4965706,
  timestamp: 1503236512602
}, {
  id: '5988888ccc87e87fe77d2670',
  tags: [],
  isFavorite: false,
  isRead: false,
  latitude: 52.0364994,
  longitude: 4.4965706,
  timestamp: 1503236512602
}, {
  id: '5988888ccc87e87fe77d2671',
  tags: [],
  isFavorite: false,
  isRead: false,
  latitude: 52.0364994,
  longitude: 4.4965706,
  timestamp: 1503236512602
}, {
  id: '5988888ccc87e87fe77d2672',
  tags: [],
  isFavorite: false,
  isRead: false,
  latitude: 52.0364994,
  longitude: 4.4965706,
  timestamp: 1503236512602
}, {
  id: '5988888ccc87e87fe77d2673',
  tags: [],
  isFavorite: false,
  isRead: false,
  latitude: 52.0364994,
  longitude: 4.4965706,
  timestamp: 1503236512602
}, {
  id: '5988888bcc87e87fe77d2585',
  tags: [],
  isFavorite: false,
  isRead: false,
  latitude: 52.0364994,
  longitude: 4.4965706,
  timestamp: 1503236512602
}, {
  id: '5988888bcc87e87fe77d2584',
  tags: [],
  isFavorite: false,
  isRead: false,
  latitude: 52.0364994,
  longitude: 4.4965706,
  timestamp: 1503236512602
}, {
  id: '5988888bcc87e87fe77d2583',
  tags: [],
  isFavorite: false,
  isRead: false,
  latitude: 52.0364994,
  longitude: 4.4965706,
  timestamp: 1503236512602
}, {
  id: '5988888bcc87e87fe77d2557',
  tags: [],
  isFavorite: false,
  isRead: false,
  latitude: 52.0365102,
  longitude: 4.4965596,
  timestamp: 1503236512602
}, {
  id: '5988888bcc87e87fe77d2558',
  tags: [],
  isFavorite: false,
  isRead: false,
  latitude: 52.0365102,
  longitude: 4.4965596,
  timestamp: 1503236512602
}, {
  id: '5988888bcc87e87fe77d2567',
  tags: [],
  isFavorite: false,
  isRead: false,
  latitude: 52.0365102,
  longitude: 4.4965596,
  timestamp: 1503236512602
}, {
  id: '5988888bcc87e87fe77d256e',
  tags: [],
  isFavorite: false,
  isRead: false,
  latitude: 52.0365102,
  longitude: 4.4965596,
  timestamp: 1503236512602
}, {
  id: '5988888bcc87e87fe77d256f',
  tags: [],
  isFavorite: false,
  isRead: false,
  latitude: 52.0365102,
  longitude: 4.4965596,
  timestamp: 1503236512602
}, {
  id: '5988888bcc87e87fe77d2570',
  tags: [],
  isFavorite: false,
  isRead: false,
  latitude: 52.0365102,
  longitude: 4.4965596,
  timestamp: 1503236512602
}, {
  id: '5988888bcc87e87fe77d2571',
  tags: [],
  isFavorite: false,
  isRead: false,
  latitude: 52.0365102,
  longitude: 4.4965596,
  timestamp: 1503236512602
}, {
  id: '5988888bcc87e87fe77d2578',
  tags: [],
  isFavorite: false,
  isRead: false,
  latitude: 52.0365102,
  longitude: 4.4965596,
  timestamp: 1503236512602
}, {
  id: '5988888bcc87e87fe77d2579',
  tags: [],
  isFavorite: false,
  isRead: false,
  latitude: 52.0365102,
  longitude: 4.4965596,
  timestamp: 1503236512602
}, {
  id: '5988888bcc87e87fe77d2580',
  tags: [],
  isFavorite: false,
  isRead: false,
  latitude: 52.0365102,
  longitude: 4.4965596,
  timestamp: 1503236512602
}, {
  id: '5988888bcc87e87fe77d2581',
  tags: [],
  isFavorite: false,
  isRead: false,
  latitude: 52.0365102,
  longitude: 4.4965596,
  timestamp: 1503236512602
}, {
  id: '5988888bcc87e87fe77d2582',
  tags: [],
  isFavorite: false,
  isRead: false,
  latitude: 52.0365102,
  longitude: 4.4965596,
  timestamp: 1503236512602
}, {
  id: '5988887fcc87e87fe77d1fb5',
  tags: [],
  isFavorite: false,
  isRead: false,
  latitude: 52.0364994,
  longitude: 4.4965706,
  timestamp: 1503236512602
}, {
  id: '5988887fcc87e87fe77d1fb6',
  tags: [],
  isFavorite: false,
  isRead: false,
  latitude: 52.0364994,
  longitude: 4.4965706,
  timestamp: 1503236512602
}, {
  id: '5988887fcc87e87fe77d1fb7',
  tags: [],
  isFavorite: false,
  isRead: false,
  latitude: 52.0364994,
  longitude: 4.4965706,
  timestamp: 1503236512602
}, {
  id: '5988887fcc87e87fe77d1fb8',
  tags: [],
  isFavorite: false,
  isRead: false,
  latitude: 52.0364994,
  longitude: 4.4965706,
  timestamp: 1503236512602
}, {
  id: '5988887fcc87e87fe77d1fb9',
  tags: [],
  isFavorite: false,
  isRead: false,
  latitude: 52.0364994,
  longitude: 4.4965706,
  timestamp: 1503236512602
}, {
  id: '5988887fcc87e87fe77d1fba',
  tags: [],
  isFavorite: false,
  isRead: false,
  latitude: 52.0364994,
  longitude: 4.4965706,
  timestamp: 1503236512602
}, {
  id: '5988887fcc87e87fe77d1fbb',
  tags: [],
  isFavorite: false,
  isRead: false,
  latitude: 52.0364994,
  longitude: 4.4965706,
  timestamp: 1503236512602
}, {
  id: '5988887fcc87e87fe77d1fbc',
  tags: [],
  isFavorite: false,
  isRead: false,
  latitude: 52.0364994,
  longitude: 4.4965706,
  timestamp: 1503236512602
}, {
  id: '5988887fcc87e87fe77d1fbd',
  tags: [],
  isFavorite: false,
  isRead: false,
  latitude: 52.0364994,
  longitude: 4.4965706,
  timestamp: 1503236512602
}, {
  id: '5988887fcc87e87fe77d1fbe',
  tags: [],
  isFavorite: false,
  isRead: false,
  latitude: 52.0364994,
  longitude: 4.4965706,
  timestamp: 1503236512602
}, {
  id: '5988887fcc87e87fe77d1fbf',
  tags: [],
  isFavorite: false,
  isRead: false,
  latitude: 52.0364994,
  longitude: 4.4965706,
  timestamp: 1503236512602
}, {
  id: '5988887fcc87e87fe77d1fc0',
  tags: [],
  isFavorite: false,
  isRead: false,
  latitude: 52.0364994,
  longitude: 4.4965706,
  timestamp: 1503236512602
}, {
  id: '59888887cc87e87fe77d233b',
  tags: [],
  isFavorite: false,
  isRead: false,
  latitude: 52.0364994,
  longitude: 4.4965706,
  timestamp: 1503236512602
}, {
  id: '59888887cc87e87fe77d233c',
  tags: [],
  isFavorite: false,
  isRead: false,
  latitude: 52.0364994,
  longitude: 4.4965706,
  timestamp: 1503236512602
}, {
  id: '5988888bcc87e87fe77d2530',
  tags: [],
  isFavorite: false,
  isRead: false,
  latitude: 52.0364994,
  longitude: 4.4965706,
  timestamp: 1503236512602
}, {
  id: '5988888bcc87e87fe77d2531',
  tags: [],
  isFavorite: false,
  isRead: false,
  latitude: 52.0364994,
  longitude: 4.4965706,
  timestamp: 1503236512602
}, {
  id: '5988888bcc87e87fe77d2532',
  tags: [],
  isFavorite: false,
  isRead: false,
  latitude: 52.0364994,
  longitude: 4.4965706,
  timestamp: 1503236512602
}, {
  id: '5988888bcc87e87fe77d2533',
  tags: [],
  isFavorite: false,
  isRead: false,
  latitude: 52.0364994,
  longitude: 4.4965706,
  timestamp: 1503236512602
}, {
  id: '5988888bcc87e87fe77d2534',
  tags: [],
  isFavorite: false,
  isRead: false,
  latitude: 52.0364994,
  longitude: 4.4965706,
  timestamp: 1503236512602
}, {
  id: '5988888bcc87e87fe77d253b',
  tags: [],
  isFavorite: false,
  isRead: false,
  latitude: 52.0364994,
  longitude: 4.4965706,
  timestamp: 1503236512602
}, {
  id: '5988888bcc87e87fe77d253c',
  tags: [],
  isFavorite: false,
  isRead: false,
  latitude: 52.0364994,
  longitude: 4.4965706,
  timestamp: 1503236512602
}, {
  id: '5988888bcc87e87fe77d253d',
  tags: [],
  isFavorite: false,
  isRead: false,
  latitude: 52.0364994,
  longitude: 4.4965706,
  timestamp: 1503236512602
}, {
  id: '5988888bcc87e87fe77d253e',
  tags: [],
  isFavorite: false,
  isRead: false,
  latitude: 52.0364994,
  longitude: 4.4965706,
  timestamp: 1503236512602
}, {
  id: '5988888bcc87e87fe77d2545',
  tags: [],
  isFavorite: false,
  isRead: false,
  latitude: 52.0364994,
  longitude: 4.4965706,
  timestamp: 1503236512602
}, {
  id: '5988888bcc87e87fe77d254f',
  tags: [],
  isFavorite: false,
  isRead: false,
  latitude: 52.0364994,
  longitude: 4.4965706,
  timestamp: 1503236512602
}, {
  id: '5988888bcc87e87fe77d2550',
  tags: [],
  isFavorite: false,
  isRead: false,
  latitude: 52.0364994,
  longitude: 4.4965706,
  timestamp: 1503236512602
}, {
  id: '5988887fcc87e87fe77d1fb1',
  tags: [],
  isFavorite: false,
  isRead: false,
  latitude: 52.0364994,
  longitude: 4.4965706,
  timestamp: 1503236512602
}];

let locationServerPoints = [];
for (let index = 0; index < 50; index++) {
  const newArray = serverLocationData.map(data => {
    const clone = Object.assign({}, data)
    clone.latitude += index * .0000001;
    clone.id = clone.id + '_' + index;

    return clone;
  })
  locationServerPoints = locationServerPoints.concat(newArray);
}
// const locationServerPoints = (Array(100).fill(0).map((e, i) => i + 1)).map(index => {
//   const newArray = serverLocationData.map(data => {
//     const clone = Object.assign({}, data)
//     clone.latitude += index * .0000001;
//     clone.id = clone.id + '_' + index;
//
//     return clone;
//   })
//
//   return newArray
// })

export const getServerLocationMockData = (query: API.ApiQueryParams) => {
  return locationServerPoints.slice(query.skip, query.skip + query.limit);
}
