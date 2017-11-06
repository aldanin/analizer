import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';
import auth from './Session';
import operations from './Operations';
import targets from './Targets';
import user from './User';
import agentsReducer from './Agents';
import globalLoadingReducer from './GlobalLoading';
import notifications from './Notifications'
import contactsReducer from './Contacts';
import searchReducer from './Search';
import appReducer from './App';
import Summary from './Summary';
import { PRODUCT_TYPES } from '../../types/Product'

const rootReducer = combineReducers({
  routing,
  [PRODUCT_TYPES.AGENTS]: agentsReducer,
  [PRODUCT_TYPES.APP]: appReducer,
  [PRODUCT_TYPES.CONTACTS]: contactsReducer,
  [PRODUCT_TYPES.GLOBAL_LOADERS]: globalLoadingReducer,
  [PRODUCT_TYPES.NOTIFICATIONS]: notifications,
  [PRODUCT_TYPES.OPERATIONS]: operations,
  [PRODUCT_TYPES.SEARCH]: searchReducer,
  [PRODUCT_TYPES.SESSION]: auth,
  [PRODUCT_TYPES.SUMMARY]: Summary,
  [PRODUCT_TYPES.TARGETS]: targets,
  [PRODUCT_TYPES.USER]: user,
});

export default rootReducer
