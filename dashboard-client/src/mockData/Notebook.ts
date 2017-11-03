import moment = require('moment');

const USER_1 = {
  id: 0,
  name: 'Joe Brown',
  avatar: 'https://res.cloudinary.com/sagacity/image/upload/c_crop,h_2002,w' +
  '_2000,x_0,y_623/c_limit,dpr_1.0,f_auto,fl_lossy,q_80,w_200/michael_foster_fullres_02_niz0cb.jpg',
}

const USER_2 = {
  id: 1,
  name: 'Dona Roberts',
  avatar: 'http://www.stylechum.com/wp-content/uploads/2015/07/platinum-blonde-300x300.jpg',
}

export const demoNotebookData = {
  numberOfPosts: 2,
  authorsList: ['me', 'Dona Roberts'],
  allUsers: [],
  user: USER_1,
  posts: [{
    id: 0,
    user: USER_1,
    timestamp: moment(+ new Date() ).add(-2, 'hours').unix() * 1000,
    mentions: [],
    tags: ['Terror', 'Family'],
    content: 'Very interesting chat connecting the wife: this is the first time we have seen him talk about' +
    '\'roses\' (=bombs) with a civilian. We should keep an eye out of more. Everyone please disseminate' +
    'as you see fit. Let\'s not let this go to waste.',
    comments: [{
      id: 0,
      user: USER_2,
      timestamp:  moment(+ new Date() ).add(-1, 'hours').unix() * 1000,
      content: 'Good catch! I think these guys are baddies',
      tags: [],
    }, {
      id: 1,
      user: USER_2,
      timestamp:  moment(+ new Date() ).add(-0.5, 'hours').unix() * 1000,
      content: '',
      tags: ['SharedByMiriRegev', 'MR201', 'Critical', 'Details'],
    }, ]
  }, {
    id: 0,
    user: USER_1,
    timestamp: moment(+ new Date() ).add(-1, 'days').add(-4, 'hours').unix() * 1000,
    mentions: [],
    tags: ['Terror', 'Family'],
    content: 'Very interesting chat connecting the wife: this is the first time we have seen him talk about' +
    '\'roses\' (=bombs) with a civilian. We should keep an eye out of more. Everyone please disseminate' +
    'as you see fit. Let\'s not let this go to waste.',
    comments: [{
      id: 0,
      user: USER_2,
      timestamp:  moment(+ new Date() ).add(-1, 'days').add(-3, 'hours').unix() * 1000,
      content: 'Good catch! I think these guys are baddies',
      tags: [],
    }, {
      id: 1,
      user: USER_2,
      timestamp:  moment(+ new Date() ).add(-1, 'days').add(-2, 'hours').unix() * 1000,
      content: '',
      tags: ['SharedByMiriRegev', 'MR201', 'Critical', 'Details'],
    }, ]
  }, ],
}
