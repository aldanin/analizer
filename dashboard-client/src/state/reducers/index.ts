import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';
import auth from './Session';
import operations from './Operations';
import targets from './Targets';
import user from './User';
import agentsReducer from './Agents';
import globalLoadingReducer from './GlobalLoading';
import Browser from './Browser';
import galleryReducer from './Gallery';
import DirectoryReducer from './Directory'
import notifications from './Notifications'
import acccountsReducer from './Accounts';
import contactsReducer from './Contacts';
import Snapshots from './Snapshots';
import SocialNetworks from './SocialNetworks'
import twitter from './Twitter';
import linkedin from './Linkedin';
import stories from './Stories';
import keylogs from './Keylogs';
import screenshots from './Screenshots';
import instantMessagingReducer from './InstantMessaging';
import Calendar from './Calendar';
import searchReducer from './Search';
import appReducer from './App';
import Tags from './Tags';
import Summary from './Summary';
import calls from './Calls'
import notebook from './Notebook';
import Location from './Location'
import mail from './Mail';
import { PRODUCT_TYPES } from '../../types/Product'

const rootReducer = combineReducers({
  routing,
  [PRODUCT_TYPES.ACCOUNTS]: acccountsReducer,
  [PRODUCT_TYPES.AGENTS]: agentsReducer,
  [PRODUCT_TYPES.APP]: appReducer,
  [PRODUCT_TYPES.BROWSER]: Browser,
  [PRODUCT_TYPES.CALENDAR]: Calendar,
  [PRODUCT_TYPES.CALLS]: calls,
  [PRODUCT_TYPES.CONTACTS]: contactsReducer,
  [PRODUCT_TYPES.DIRECTORY]: DirectoryReducer,
  [PRODUCT_TYPES.GALLERY]: galleryReducer,
  [PRODUCT_TYPES.GLOBAL_LOADERS]: globalLoadingReducer,
  [PRODUCT_TYPES.IM]: instantMessagingReducer,
  [PRODUCT_TYPES.KEYLOG]: keylogs,
  [PRODUCT_TYPES.LOCATION]: Location,
  [PRODUCT_TYPES.MAIL]: mail,
  [PRODUCT_TYPES.NOTEBOOK]: notebook,
  [PRODUCT_TYPES.NOTIFICATIONS]: notifications,
  [PRODUCT_TYPES.OPERATIONS]: operations,
  [PRODUCT_TYPES.SEARCH]: searchReducer,
  [PRODUCT_TYPES.SESSION]: auth,
  [PRODUCT_TYPES.SCREENSHOT]: screenshots,
  [PRODUCT_TYPES.SNAPSHOTS]: Snapshots,
  [PRODUCT_TYPES.SOCIAL_NETWORKS]: SocialNetworks,
  [PRODUCT_TYPES.SOCIAL_NETWORKS_LINKEDIN]: linkedin,
  [PRODUCT_TYPES.SOCIAL_NETWORKS_TWEETER]: twitter,
  [PRODUCT_TYPES.STORIES]: stories,
  [PRODUCT_TYPES.SUMMARY]: Summary,
  [PRODUCT_TYPES.TAGS]: Tags,
  [PRODUCT_TYPES.TARGETS]: targets,
  [PRODUCT_TYPES.USER]: user,
});

export default rootReducer
