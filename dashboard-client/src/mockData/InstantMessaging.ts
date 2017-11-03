import * as Prod from '../types/Product'
import * as IMCommon from 'common-interfaces/types/InstantMessaging'
import * as IM from '../types/InstantMessaging'
import IMProduct, { createConversationName } from './Service mock classes/im-product'
import { realData2 } from './InstantMessagingMock'
import * as APITypes from '../api/types'

//////////////////////////////////////////
////////// Person Data ///////////////////
//////////////////////////////////////////
const randomNumbers = {
  img1: Math.floor((Math.random() * 999)),
  img2: Math.floor((Math.random() * 999)),
  img3: Math.floor((Math.random() * 999)),
  img4: Math.floor((Math.random() * 999)),
  img5: Math.floor((Math.random() * 999)),
  img6: Math.floor((Math.random() * 999)),
  img7: Math.floor((Math.random() * 999)),
  img8: Math.floor((Math.random() * 999)),
};

const PERSON_DATA: any[] = [
  {
    id: 1,
    name: 'Yuri gagarin',
    avatar: 'https://unsplash.it/500/400?image=' + randomNumbers.img1,

    contactDetails: {}
  }, {
    id: 2,
    name: 'Abdul Nazer',
    avatar: 'https://unsplash.it/500/400?image=' + randomNumbers.img2,

  }, {
    id: 3,
    name: 'Nikoly Pavlov',
    avatar: 'https://unsplash.it/500/400?image=' + randomNumbers.img8,

  }, {
    id: 4,
    name: 'Roger Waters',
    avatar: 'https://unsplash.it/500/400?image=' + randomNumbers.img7,

  }, {
    id: 5,
    name: 'Yosef Stalin',
    avatar: 'https://unsplash.it/500/400?image=' + randomNumbers.img6,

  }, {
    id: 6,
    name: 'King Henry iiiV',
    details: 'Minor terror details',
    avatar: 'https://unsplash.it/500/400?image=' + randomNumbers.img5,

  }, {
    id: 7,
    name: 'Something Erduwan',
    avatar: 'https://unsplash.it/500/400?image=' + randomNumbers.img4,

  }, {
    id: 8,
    name: 'Haman the evil',
    avatar: 'https://unsplash.it/500/400?image=' + randomNumbers.img3,

  }, {
    id: 9,
    name: 'Bernardo Gui',
    avatar: 'https://unsplash.it/500/400?image=' + randomNumbers.img2,

  }, {
    id: 10,
    name: 'KitKat',
    avatar: 'https://unsplash.it/500/400?image=' + randomNumbers.img1,
  },
];

PERSON_DATA.forEach((item, index) => {
  item.phoneNumber = '07-9892153';
  // item.phoneWork = '03-6384159';
  // item.phoneMobile = '052-6755012';
  // item.email = 'tushi@gmail.com';
  // item.address = {
  //   street: 'Dizingoff st. 34',
  //   city: 'Tel Aviv, Israel'
  // };
});

export const getPerson = () => {
  return PERSON_DATA[Math.floor((Math.random() * PERSON_DATA.length))];
}

/////////////////////////////////////////////////////////////////////
/////////////////////////////// Conversation Part ///////////////////
/////////////////////////////////////////////////////////////////////

let dateGen = (new Date(2015, 10, 1, 12, 0, 0)).getTime();
let idGen = 0;

const getBoolean = () => {
  return Math.floor((Math.random() * 2)) % 2 === 0;
}

let getAppSymbol = () => {
  let num = Math.floor((Math.random() * 6));
  let appSymbol;
  switch (num) {
    case 0:
      appSymbol = 'whatsapp';
      break;
    case 1:
      appSymbol = 'skype';
      break;
    case 2:
      appSymbol = 'linkedin';
      break;
    case 3:
      appSymbol = 'sms';
      break;
    case 4:
      appSymbol = 'telegram';
      break;
    case 5:
      appSymbol = 'viber';
      break;
    default:
      break;
  }
  return appSymbol;
};

export let getDate = () => {
  dateGen = dateGen + Math.floor((Math.random() * 50000000));

  return dateGen;
}

///////////// PARTICIPANTS /////////////

const identifiers = ['Baron from Minhauzen', 'The little prince',
  'Winni the pooh', 'Amlak', 'im Tirzu', 'Smolanim', 'Yemanim', 'Ashkenazim', 'Yekepotz'];

let PARTICIPANT_DATA: IMCommon.Participant[] = [];

for (let i = 0; i < 1000; i++) {
  const id = (++idGen).toString();

  const person = getPerson();

  let parti: any = Object.assign(person, Prod.DEFAULT_PRODUCT);
  parti.id = id;
  parti.status = 'to be announced...';
  parti.partial = Math.floor((Math.random() * 2)) % 2 === 0;
  parti.identifier = identifiers[Math.floor((Math.random() * identifiers.length))];

  PARTICIPANT_DATA.push(parti);
}

///////////// MESSAGES /////////////

const messageTexts = [
  'See that? I told you it wasnt ment to be. Forget about him. I\'m serious',
  'She said you\'re stupid! I told her to go f**k herself, the maniac',
  '...',
  'meet you at 5\'ish. Dont forget to bring the stuf for nraking tyhe safe up!!!!!',
  'Your mumma!!! But you\'re right I AM retarted',
  'No place like home..? Go to Switzerland and ask yourself again',
  'In the begging their was tohu vavo hu and dakdness at the edge of town' +
  'After that there was total caos. Now their is also andarlamusia',
  'asdadsasdasdafsadfkljsglkjsdglkjflkjlkjsdflkjflkjsddlflkjlkjlkjfslkjsfdlkjflkjfdslkjlsdfjlkjflkjlskdjflkjlkjfds'
];

const getTags = (tagCount: number) => {
  const tags = [];

  for (let i = 0; i < tagCount; i++) {
    tags.push('tag' + i);
  }
  return tags;
}

const getPhoto = (): IMCommon.Attachment => {
  const photo = Math.floor((Math.random() * 13)) % 6 === 0
    ? 'https://unsplash.it/200/300/?random'
    : null;
  return photo
    ? {
      id: (++idGen).toString(),
      path: 'https://unsplash.it/200/300/?random',
      type: 'image',
      size: Math.floor((Math.random() * 3000))
    }
    : null;
}

const getVideo = (): IMCommon.Attachment => {
  let video;
  switch (Math.floor((Math.random() * 5))) {
    case 0:
      video = {
        id: (++idGen).toString(),
        path: '../../../../public/VideoClips/Fire - 9164.mp4',
        type: 'video',
        size: Math.floor((Math.random() * 3000)),
      }
      break;
    case 1:
      video = {
        id: (++idGen).toString(),
        path: '../../../../public/VideoClips/Light - 9140.mp4',
        type: 'video',
        size: Math.floor((Math.random() * 3000)),
      }
      break;
    case 2:
      video = {
        id: (++idGen).toString(),
        path: '../../../../public/VideoClips/Rocket - 9067.mp4',
        type: 'video',
        size: Math.floor((Math.random() * 3000)),
      }
      break;
    case 3:
      video = {
        id: (++idGen).toString(),
        path: '../../../../public/VideoClips/Spider - 9088.mp4',
        type: 'video',
        size: Math.floor((Math.random() * 3000)),
      }
      break;
    case 4:
      video = {
        id: (++idGen).toString(),
        path: '../../../../public/VideoClips/Water - 9083.mp4',
        type: 'video',
        size: Math.floor((Math.random() * 3000)),
      }
      break;
    default:
      break;
  }
  video.path = 'https://www.w3schools.com/html/mov_bbb.mp4'
  video.type = 'video';
  return video;
}

const getAttachment = (): IMCommon.Attachment => {
  const rndNumber = Math.floor((Math.random() * 20));
  const media = 0 <= rndNumber && rndNumber < 4
    ? getVideo()
    : ( 4 <= rndNumber && rndNumber < 14
        ? getPhoto()
        : null
    );
  // console.log('media', media)
  return media;
}

export const getChat = (conv: IMCommon.ChatConversation) => {
  const chat: IMCommon.ChatMessage[] = [];
  const partis = conv.participants;

  const messageCount = Math.floor(Math.random() * (100 - 50 + 1)) + 50;
  for (let i = 0; i < messageCount; i++) {
    const direction = Math.floor((Math.random() * 2)) % 2 === 0 ? 'outgoing' : 'incoming';
    const body = conv.id + '.' + i.toString() + ' - ' + messageTexts[Math.floor((Math.random() * messageTexts.length))];
    const tags = getTags(2);
    const isFirstOnDate = Math.floor((Math.random() * 20)) % 20 === 0;

    const me = partis[0];
    const other = partis[Math.floor(Math.random() * (partis.length - 1)) + 1];
    const attachment = getAttachment();
    const chatMessage: any = {
      id: (++idGen).toString(),
      from: direction === 'outgoing' ? me : other,
      to: direction === 'outgoing' ? [other] : [me],
      body: body,
      direction: direction,
      timestamp: getDate(),
      translatedBody: body,
      attachments: attachment ? [attachment] : null,
      tags: tags,
      isFavorite: getBoolean(),
      hasNotes: getBoolean(),
      hasTranslation: getBoolean(),
      hasTranscript: getBoolean(),
      isRead: getBoolean(),
      topicId: conv.id,
      isFirstOnDate: isFirstOnDate,
    }

    chat.push(chatMessage);
  }

  return chat;
}

//
///////////// ChatConversations /////////////
//

const getParticipants = (): IMCommon.Participant[] => {
  const partiCount = Math.floor((Math.random() * 100));
  const partis = [];
  for (let i = 0; i < partiCount + 2; i++) {
    partis.push(PARTICIPANT_DATA[Math.floor((Math.random() * PARTICIPANT_DATA.length - 2)) + 2]);
  }
  return partis;
}

let CONVERSATION_DATA: IMCommon.ChatConversation[] = [];

export const createConversations = () => {
  for (let i = 0; i < 500; i++) {
    const id = (++idGen).toString();
    const conv: any = {
      id: id,
      appName: getAppSymbol(),
      isGroup: Math.floor((Math.random() * 25)) % 6 !== 0,
      participants: getParticipants(),
    }
    conv.chat = getChat(conv);
    conv.name = createConversationName(conv);

    CONVERSATION_DATA.push(conv);
  }
}

createConversations();

export const CONVERSATIONS: IMCommon.Conversations = {
  conversations: CONVERSATION_DATA
}

//
// Move a group at index 3 to a different location in the array, to place it not in the array's start:
//
const groupToBeMoved = PARTICIPANT_DATA.splice(2, 1)[0];

PARTICIPANT_DATA.splice(40, 1, groupToBeMoved);

export const getConversationsData = (dataSource: any,
                                     nextPageNumber: number,
                                     pageSize: number,
                                     // ispreviousPage: boolean,
                                     filters: IM.Filters) => {
  //
  // Columns to be sorted or filterd by may be repersented here by their dataKey,
  // or by appSymbol.key of the items, as appSymbol is not a flat string value:
  //
  //
  dataSource = dataSource || CONVERSATIONS;

  const data = dataSource.conversations.filter((item) => {
    return !filters ||
      filters.boolean && !filters.boolean.length ||
      filters.boolean && filters.boolean.find(x => x === item.appName);
  });

  const sortBy = filters && filters.sort ? filters.sort.sortBy : undefined;
  const desc = filters && filters.sort ? filters.sort.desc : undefined;
  if (sortBy) {
    switch (sortBy) {
      case 'name':
        sortByName(data, desc, sortBy);
        break;
      case 'appSymbol':
        sortByApp(data, desc);
        break;
      default:
        sortDefault(data, sortBy, desc);
        break;
    }
  }

  const totalCount = data.length;

  const slicedData = {

    conversations: data.slice((nextPageNumber - 1) * pageSize, nextPageNumber * pageSize),
    nextPageNumber: nextPageNumber + 1,
    totalCount: totalCount,
  }

  return slicedData;
};
//
// Get the page which contains a certain conversation by its supplied id:
//
export const getConversationsPageByConversationId =
  (convId: Prod.ProductID, pageSize: number, filters: IM.Filters) => {
    const data = CONVERSATION_DATA.filter((item) => {
      return !filters ||
        filters.boolean && !filters.boolean.length ||
        filters.boolean && filters.boolean.find(x => x === item.appName);
    });

    const sortBy = filters && filters.sort ? filters.sort.sortBy : undefined;
    const desc = filters && filters.sort ? filters.sort.desc : undefined;
    if (sortBy) {
      switch (sortBy) {
        case 'name':
          sortByName(data, desc, sortBy);
          break;
        case 'appSymbol':
          sortByApp(data, desc);
          break;
        default:
          sortDefault(data, sortBy, desc);
          break;
      }
    }
    const conv = data.find(x => x.id === convId);
    const index = data.indexOf(conv);
    const containingPageNumber = Math.ceil(index / pageSize);

    return getConversationsData(null, containingPageNumber, pageSize, filters);
  }

const sortDefault = (data: IMCommon.ChatConversation[], sortBy: string, desc: boolean) => {
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

const sortByApp = (data: IMCommon.ChatConversation[], desc: boolean) => {
  data.sort((x, y) => {
    const fieldX = x.appName
    const fieldY = y.appName;
    let result = fieldX > fieldY
      ? 1
      : ( fieldY === fieldX
        ? 0
        : -1);
    result = desc ? -1 * result : result;
    return result;
  })
}

const sortByName = (data: IMCommon.ChatConversation[], desc: boolean, sortBy: string) => {
  data.sort((x, y) => {
    const fieldX = x.participants[0].name.toLowerCase();
    const fieldY = y.participants[0].name.toLowerCase();
    ;
    let result = fieldX > fieldY
      ? 1
      : ( fieldY === fieldX
        ? 0
        : -1);
    result = desc ? -1 * result : result;
    return result;
  })
}

export const getIMMockData = () => {
  return CONVERSATIONS;
};

export const createIMMockDataFromRealSource = (query: APITypes.ApiQueryParams) => {
  query = query || {}
  const {skip, limit} = query;
  const rawData = {
    chatconversations: realData2.chatconversations.slice(skip, skip + limit)
  }
  const data = IMProduct.fromData(rawData);

  return data;
}
