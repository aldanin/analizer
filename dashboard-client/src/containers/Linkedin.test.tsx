import * as React from 'react'
import * as ReactDOM from 'react-dom'

import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'

import * as Theme from '../components/SocialNetworksAppViewer/Theme'
import * as injectTapEventPlugin from 'react-tap-event-plugin';
import LinkedinView, { LinkedinProps } from './LinkedinView';
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
}

const USER_PETERP = {
  id: 8,
  avatar: 'http://i1070.photobucket.com/albums/u497/crystalbay00/TwitterProfileSquare_sm_zpsn2kflx2e.jpg',
  name: 'Peter P',
}

const USER_DAN = {
  id: 9,
  avatar: 'https://symphonynovascotia.ca/wp-content/uploads/Chris-Palmer-2016-web.jpg',
  name: 'Dan Bomb',
}

const USER_ANNA = {
  id: 10,
  avatar: 'https://media.licdn.com/mpr/mpr/shrinknp_200_200/p/4/005/038/2d9/372c965.jpg',
  name: 'Anna Wales',
}

const USER_JOHN = {
  id: 11,
  avatar: 'https://lh4.googleusercontent.com/-fHlz7kScna4/AAAAAAAAAAI/AAAAAAABS38/m2l9kOds1mE/photo.jpg',
  name: 'John Locke',
}

const demoData = {
  id: 0,
  user: USER_ANONYMUS,
  headline: 'Expert Hacker',
  currentPosition: 'ground-base',
  profile: {
    experience: [{
      id: 0,
      headline: 'Senior Accountant',
      position: 'Deloitte',
      fromTime: 1472688000000,
      description: `aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
      aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
      aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
      aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
      aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
      aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa`,
      toTime: -1,
      isFavorite: true,
      hasNotes: false,
      isRead: false,
      hasTranslation: false,
      tags: [{
        id: '0',
        text: 'Work',
      }],
    }, {
      id: 1,
      headline: 'Staff Accountant',
      position: 'PwC',
      fromTime: 1356998400000,
      toTime: 1470009600000,
      description: 'My Description',
      isFavorite: true,
      hasNotes: true,
      isRead: true,
      hasTranslation: false,
      tags: [],
    }],
    education: [{
      id: 0,
      headline: 'University of cyber security',
      degree: 'Cyber security diploma',
      fromTime: 1377993600000,
      toTime: 1435708800000,
      isFavorite: true,
      hasNotes: true,
      isRead: false,
      hasTranslation: false,
      tags: [{
        id: '0',
        text: 'Terror',
      }],
    }, {
      id: 1,
      headline: 'City University of New Yorl-Hunter College',
      degree: 'Bachelor of science (B.S.) Field of Study, Accounting',
      fromTime: 1172707200000,
      toTime: 1280620800000,
      isFavorite: false,
      hasNotes: true,
      isRead: true,
      hasTranslation: false,
      tags: [],
    }],
    skills: [{
      title: 'Cyber security',
      level: 9,
    }, {
      title: 'Networks',
      level: 7,
    }, {
      title: 'Financial Reporting',
      level: 6,
    }, {
      title: 'Accruals',
      level: 3,
    }, {
      title: 'Budjets',
      level: 1,
    }, ],
  },
  connection: [{
    id: 0,
    user: USER_PETERP,
    headline: 'Programmer',
    position: 'Microsoft NYC',
    isFavorite: false,
    hasNotes: false,
    isRead: false,
    hasTranslation: false,
    tags: [],
  }, {
    id: 1,
    user: USER_DAN,
    headline: 'Co Founder',
    position: 'Bombyx Mori',
    isFavorite: true,
    hasNotes: false,
    isRead: true,
    hasTranslation: false,
    tags: [{
      id: '0',
      text: 'Terror',
    }],
  }, {
    id: 2,
    user: USER_ANNA,
    headline: 'CPA',
    position: 'KPMG NYC',
    isFavorite: false,
    hasNotes: true,
    isRead: true,
    hasTranslation: false,
    tags: [],
  }, {
    id: 3,
    user: USER_JOHN,
    headline: 'BM Dev',
    position: 'ASST',
    isFavorite: true,
    hasNotes: false,
    isRead: true,
    hasTranslation: false,
    tags: [],
  }, {
    id: 4,
    user: USER_DAN,
    headline: 'Co Founder',
    position: 'Bombyx Mori',
    isFavorite: false,
    hasNotes: false,
    isRead: true,
    hasTranslation: false,
    tags: [],
  }, {
    id: 5,
    user: USER_ANNA,
    headline: 'CPA',
    position: 'KPMG NYC',
    isFavorite: false,
    hasNotes: false,
    isRead: true,
    hasTranslation: false,
    tags: [],
  }, {
    id: 6,
    user: USER_JOHN,
    headline: 'BM Dev',
    position: 'ASST',
    isFavorite: false,
    hasNotes: false,
    isRead: true,
    hasTranslation: false,
    tags: [],
  }, {
    id: 7,
    user: USER_DAN,
    headline: 'Co Founder',
    position: 'Bombyx Mori',
    isFavorite: false,
    hasNotes: false,
    isRead: true,
    hasTranslation: false,
    tags: [],
  }, {
    id: 8,
    user: USER_ANNA,
    headline: 'CPA',
    position: 'KPMG NYC',
    isFavorite: false,
    hasNotes: false,
    isRead: true,
    hasTranslation: false,
    tags: [],
  }, {
    id: 9,
    user: USER_JOHN,
    headline: 'BM Dev',
    position: 'ASST',
    isFavorite: false,
    hasNotes: false,
    isRead: true,
    hasTranslation: false,
    tags: [],
  }, {
    id: 10,
    user: USER_DAN,
    headline: 'Co Founder',
    position: 'Bombyx Mori',
    isFavorite: false,
    hasNotes: false,
    isRead: true,
    hasTranslation: false,
    tags: [],
  }, {
    id: 11,
    user: USER_ANNA,
    headline: 'CPA',
    position: 'KPMG NYC',
    isFavorite: false,
    hasNotes: false,
    isRead: true,
    hasTranslation: false,
    tags: [],
  }],
  search: [{
    id: 0,
    lookingFor: 'Ann Thompson',
    isFavorite: false,
    hasNotes: false,
    isRead: false,
    hasTranslation: false,
    tags: [],
  }, {
    id: 1,
    lookingFor: 'Dan Bomb',
    isFavorite: true,
    hasNotes: false,
    isRead: true,
    hasTranslation: false,
    tags: [{
      id: '0',
      text: 'Terror',
    }]
  }, {
    id: 2,
    lookingFor: 'Jazz Music',
    isFavorite: false,
    hasNotes: false,
    isRead: true,
    hasTranslation: false,
    tags: [],
  }, {
    id: 3,
    lookingFor: 'Joe Hawkins',
    isFavorite: false,
    hasNotes: false,
    isRead: true,
    hasTranslation: false,
    tags: [],
  }, {
    id: 4,
    lookingFor: 'Jose Locke',
    isFavorite: false,
    hasNotes: false,
    isRead: true,
    hasTranslation: false,
    tags: [],
  }, {
    id: 5,
    lookingFor: 'Katherine Sullivan',
    isFavorite: false,
    hasNotes: false,
    isRead: true,
    hasTranslation: false,
    tags: [],
  }, {
    id: 6,
    lookingFor: 'Katheryn Garza',
    isFavorite: false,
    hasNotes: false,
    isRead: true,
    hasTranslation: false,
    tags: [],
  }, {
    id: 7,
    lookingFor: 'Lawrence Freeman',
    isFavorite: false,
    hasNotes: false,
    isRead: true,
    hasTranslation: false,
    tags: [],
  }, {
    id: 8,
    lookingFor: 'Ruth Hudson',
    isFavorite: false,
    hasNotes: false,
    isRead: true,
    hasTranslation: false,
    tags: [],
  }, {
    id: 9,
    lookingFor: 'Steven James',
    isFavorite: false,
    hasNotes: false,
    isRead: true,
    hasTranslation: false,
    tags: [],
  }, {
    id: 10,
    lookingFor: 'TIME',
    isFavorite: true,
    hasNotes: false,
    isRead: true,
    hasTranslation: false,
    tags: [],
  }, {
    id: 11,
    lookingFor: 'Walter Jordan',
    isFavorite: false,
    hasNotes: false,
    isRead: true,
    hasTranslation: false,
    tags: [],
  }, {
    id: 12,
    lookingFor: 'Wave',
    isFavorite: false,
    hasNotes: false,
    isRead: true,
    hasTranslation: false,
    tags: [],
  }, {
    id: 13,
    lookingFor: 'Wheel',
    isFavorite: false,
    hasNotes: false,
    isRead: true,
    hasTranslation: false,
    tags: [],
  }, {
    id: 14,
    lookingFor: 'Zak',
    isFavorite: false,
    hasNotes: false,
    isRead: true,
    hasTranslation: false,
    tags: [],
  }, {
    id: 15,
    lookingFor: 'Miri M',
    isFavorite: false,
    hasNotes: false,
    isRead: true,
    hasTranslation: false,
    tags: [],
  }, {
    id: 16,
    lookingFor: 'Chef Sam',
    isFavorite: false,
    hasNotes: false,
    isRead: true,
    hasTranslation: false,
    tags: [{
      id: '0',
      text: 'Home',
    }]
  }, {
    id: 17,
    lookingFor: 'Eden B',
    isFavorite: false,
    hasNotes: false,
    isRead: true,
    hasTranslation: false,
    tags: [],
  }, {
    id: 18,
    lookingFor: 'Haim R',
    isFavorite: false,
    hasNotes: false,
    isRead: true,
    hasTranslation: false,
    tags: [],
  }],
};

it('renders without crashing', () => {
  const initialState = {
    linkedin: fromJS({
      isFetching: false,
      error: null,
      isSorting: false,
      connectionSortBy: 0,
      data: demoData,
    })
  }
  const store = storeMocker(initialState)

  const div = document.createElement('div');
  const props: LinkedinProps = {
    setStar: () => null,
    removeTag: () => null,
    connectionSortByIndex: 0,
    connectionSortBy: () => null,
    isSorting: false,
    linkedinExperienceAddTag: () => null,
    linkedinExperienceMarkAsRead: () => null,
    linkedinExperienceMarkAsUnread: () => null,
    linkedinEducationAddTag: () => null,
    linkedinEducationMarkAsRead: () => null,
    linkedinEducationMarkAsUnread: () => null,
    linkedinConnectionAddTag: () => null,
    linkedinConnectionMarkAsRead: () => null,
    linkedinConnectionMarkAsUnread: () => null,
    linkedinSearchAddTag: () => null,
    linkedinSearchMarkAsRead: () => null,
    linkedinSearchMarkAsUnread: () => null,
  };

  ReactDOM.render(
    <Provider store={store}>
      <ThemeProvider theme={Theme}>
        <MuiThemeProvider>
          <LinkedinView {...props}/>
        </MuiThemeProvider>
      </ThemeProvider>
    </Provider>,
    div);
});
