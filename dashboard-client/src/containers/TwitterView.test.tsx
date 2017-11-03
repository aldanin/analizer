import * as React from 'react'
import * as ReactDOM from 'react-dom'

import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'

import * as Theme from '../components/SocialNetworksAppViewer/Theme'
import * as injectTapEventPlugin from 'react-tap-event-plugin';
import TwitterView, { TwitterProps } from './TwitterView';
import { fromJS } from 'immutable';
import { ThemeProvider } from 'styled-components';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
injectTapEventPlugin();
const middlewares = []
const storeMocker = configureStore(middlewares)

const USER_ANONYMUS = {
  id: 0,
  avatar: 'http://orig08.deviantart.net/c591/f/2012/153/4/a/profile_picture_by_anonymous_noir-d51z873.png',
  name: 'Anonymous',
  nickname: 'AnonymousHacker123',
}

const USER_SILVEY = {
  id: 1,
  avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPsov' +
  'bKWXYPahTQd_ZssMuC2Bc7ZbPJzXumMFcbQzBA2IbN_Mr',
  name: 'Silvey',
  nickname: 'silvsilv',
}

const USER_DAVID = {
  id: 2,
  avatar: 'http://www.american.edu/uploads/profiles/large/chris_palmer_profile_11.jpg',
  name: 'David D',
  nickname: 'ddavi',
}

const USER_ANDY = {
  id: 3,
  avatar: 'http://www.biophysics.cornell.edu/images/paszek.jpg',
  name: 'Andy',
  nickname: 'anndy',
}

const USER_WALTER = {
  id: 4,
  avatar: 'https://pbs.twimg.com/profile_images/1186488413/Vince_Formal_profile_linkedin.jpg',
  name: 'Walter Jordan',
  nickname: 'Jowalter',
}

const USER_PETER = {
  id: 5,
  avatar: 'https://content-static.upwork.com/uploads/2014/10/01073427/profilephoto1.jpg',
  name: 'Kathryn Peters',
  nickname: 'PetersK',
}

const USER_JESSICA = {
  id: 6,
  avatar: 'http://thunder-team.com/friend-finder/images/users/user-14.jpg',
  name: 'Jessica Reid',
  nickname: 'Jess2R',
}

const USER_ASHLEY = {
  id: 7,
  avatar: 'https://s-media-cache-ak0.pinimg.com/736x/e9/51/9d/e9519d90c08d220d0c5116bb6e3a67bf.jpg',
  name: 'Ashely',
  nickname: 'realAshley',
}

const USER_PETERP = {
  id: 8,
  avatar: 'http://i1070.photobucket.com/albums/u497/crystalbay00/TwitterProfileSquare_sm_zpsn2kflx2e.jpg',
  name: 'Peter P',
  nickname: 'PeterP3n',
}

const demoData = {
  id: 0,
  user: USER_ANONYMUS,
  location: {
    city: 'Unknown',
    country: 'Earth planet',
  },
  joinedDate: 1317459600000,
  tweets: [{
    id: 0,
    user: USER_ANONYMUS,
    postDate: 1455220260000,
    content: `Don't miss her new single!`,
    comments: [{
      id: 1,
      user: USER_SILVEY,
      postDate: 1455261660000,
      content: `Agree`,
      comments: [],
      likes: 2,
      shares: 0,
      isFavorite: false,
      hasNotes: false,
      hasTranslation: false,
      isRead: false,
      tags: []
    }, {
      id: 2,
      user: USER_DAVID,
      postDate: 1455220260000,
      content: `I didn't like it`,
      comments: [],
      likes: 0,
      shares: 0,
      isFavorite: false,
      hasNotes: false,
      hasTranslation: false,
      isRead: true,
      tags: []
    }],
    likes: 18,
    shares: 2,
    isFavorite: false,
    hasNotes: false,
    isRead: false,
    hasTranslation: false,
    tags: [{
      id: '0',
      text: 'Home',
    }, {
      id: '1',
      text: 'Family',
    }, {
      id: '2',
      text: 'Terror',
    }, {
      id: '3',
      text: 'Work',
    }]
  }, {
    id: 3,
    user: USER_ANONYMUS,
    postDate: 1455133740000,
    content: `Thanks for your congrates, hate you all`,
    comments: [],
    likes: 101,
    shares: 0,
    isFavorite: true,
    hasNotes: false,
    hasTranslation: false,
    isRead: true,
    tags: []
  }, {
    id: 4,
    user: USER_ANONYMUS,
    postDate: 1455133440000,
    content: `Who's here?`,
    comments: [],
    likes: 0,
    shares: 0,
    isFavorite: false,
    hasNotes: true,
    hasTranslation: false,
    isRead: true,
    tags: []
  }],
  mentions: [{
    id: 0,
    user: USER_ANDY,
    postDate: 1455220260000,
    contentBefore: `what do you think?`,
    contentAfter: ``,
    comments: 2,
    likes: 18,
    shares: 2,
    isFavorite: false,
    hasNotes: false,
    isRead: true,
    hasTranslation: false,
    tags: []
  }, {
    id: 1,
    user: USER_SILVEY,
    postDate: 1455220260000,
    contentBefore: `Well?`,
    contentAfter: ``,
    comments: 0,
    likes: 2,
    shares: 0,
    isFavorite: false,
    hasNotes: false,
    isRead: true,
    hasTranslation: false,
    tags: []
  }, {
    id: 2,
    user: USER_DAVID,
    postDate: 1455220260000,
    contentBefore: ``,
    contentAfter: `Reply this`,
    comments: 0,
    likes: 0,
    shares: 0,
    isFavorite: true,
    hasNotes: false,
    isRead: true,
    hasTranslation: false,
    tags: [{
      id: '1',
      text: 'Terror',
    }]
  }, {
    id: 3,
    user: USER_ANDY,
    postDate: 1455220260000,
    contentBefore: `what do you think?`,
    contentAfter: ``,
    comments: 2,
    likes: 18,
    shares: 2,
    isFavorite: false,
    hasNotes: true,
    isRead: false,
    hasTranslation: false,
    tags: []
  }, {
    id: 4,
    user: USER_SILVEY,
    postDate: 1455220260000,
    contentBefore: `Well?`,
    contentAfter: ``,
    comments: 0,
    likes: 2,
    shares: 0,
    isFavorite: false,
    hasNotes: false,
    isRead: false,
    hasTranslation: false,
    tags: []
  }, {
    id: 5,
    user: USER_DAVID,
    postDate: 1455220260000,
    contentBefore: ``,
    contentAfter: `Reply this`,
    comments: 0,
    likes: 0,
    shares: 0,
    isFavorite: false,
    hasNotes: false,
    isRead: true,
    hasTranslation: false,
    tags: []
  }],
  following: [{
    id: 0,
    user: USER_ANDY,
    status: 'Live and let live :)',
    isFavorite: false,
    hasNotes: false,
    isRead: true,
    hasTranslation: false,
    tags: [],
  }, {
    id: 1,
    user: USER_SILVEY,
    status: '',
    isFavorite: false,
    hasNotes: true,
    isRead: true,
    hasTranslation: false,
    tags: [],
  }, {
    id: 2,
    user: USER_DAVID,
    status: 'Visit my website www.me.com',
    isFavorite: true,
    hasNotes: false,
    isRead: true,
    hasTranslation: false,
    tags: [{
      id: '1',
      text: 'Terror',
    }],
  }, {
    id: 3,
    user: USER_WALTER,
    status: 'Sun is fun',
    isFavorite: false,
    hasNotes: false,
    isRead: true,
    hasTranslation: false,
    tags: [],
  }, {
    id: 4,
    user: USER_PETERP,
    status: 'Live and let live :)',
    isFavorite: false,
    hasNotes: false,
    isRead: true,
    hasTranslation: false,
    tags: [],
  }, {
    id: 5,
    user: USER_JESSICA,
    status: '',
    isFavorite: false,
    hasNotes: false,
    isRead: true,
    hasTranslation: false,
    tags: [],
  }, {
    id: 6,
    user: USER_ASHLEY,
    status: 'Set fire to the rain',
    isFavorite: false,
    hasNotes: false,
    isRead: false,
    hasTranslation: false,
    tags: [],
  }, ],
  followers: [{
    id: 0,
    user: USER_PETER,
    status: 'Let the story continue',
    isFavorite: false,
    hasNotes: false,
    isRead: true,
    hasTranslation: false,
    tags: [],
  }, {
    id: 1,
    user: USER_SILVEY,
    status: '',
    isFavorite: false,
    hasNotes: false,
    isRead: true,
    hasTranslation: false,
    tags: [],
  }, {
    id: 2,
    user: USER_DAVID,
    status: 'Visit my website www.me.com',
    isFavorite: true,
    hasNotes: false,
    isRead: true,
    hasTranslation: false,
    tags: [{
      id: '1',
      text: 'Terror',
    }],
  }, {
    id: 3,
    user: USER_WALTER,
    status: 'Sun is fun',
    isFavorite: false,
    hasNotes: false,
    isRead: true,
    hasTranslation: false,
    tags: [],
  }, {
    id: 4,
    user: USER_PETERP,
    status: 'Live and let live :)',
    isFavorite: false,
    hasNotes: true,
    isRead: true,
    hasTranslation: false,
    tags: [],
  }, {
    id: 5,
    user: USER_JESSICA,
    status: '',
    isFavorite: false,
    hasNotes: false,
    isRead: true,
    hasTranslation: false,
    tags: [],
  }, {
    id: 6,
    user: USER_ASHLEY,
    status: 'Set fire to the rain',
    isFavorite: false,
    hasNotes: false,
    isRead: true,
    hasTranslation: false,
    tags: [],
  }, ],
};

it('renders without crashing', () => {

  const initialState = {
    twitter: fromJS({
      isFetching: false,
      error: null,
      data: demoData,
    })
  }
  const store = storeMocker(initialState)

  const div = document.createElement('div');
  const props: TwitterProps = {
    setStar: () => null,
    removeTag: () => null,
    tweeterMessageAddTag: () => null,
    tweeterMessageMarkAsRead: () => null,
    tweeterMessageMarkAsUnread: () => null,
    tweeterMentionAddTag: () => null,
    tweeterMentionMarkAsRead: () => null,
    tweeterMentionMarkAsUnread: () => null,
    tweeterFollowingAddTag: () => null,
    tweeterFollowingMarkAsRead: () => null,
    tweeterFollowingMarkAsUnread: () => null,
    tweeterFollowerAddTag: () => null,
    tweeterFollowerMarkAsRead: () => null,
    tweeterFollowerMarkAsUnread: () => null,
  };

  ReactDOM.render(
    <Provider store={store}>
      <ThemeProvider theme={Theme}>
        <MuiThemeProvider>
          <TwitterView {...props}/>
        </MuiThemeProvider>
      </ThemeProvider>
    </Provider>,
    div);
});
