import * as React from 'react'
import { connect } from 'react-redux'
import ContactsApp from '../components/ContactsAppViewer/index'
import * as Contacts from '../types/Contacts'
import * as ContactsCommon from 'common-interfaces/types/Contacts'
import * as Tag from '../types/Tag'
import * as Prod from '../types/Product'
import * as Actions from '../state/actions/Contacts'
import { ProductID } from 'common-interfaces/types/Product';
import { PRODUCT_TYPES } from '../types/Product';
import scTheme from '../theme/ScTheme'
// import * as ProdActions from '../state/actions/ProductActions'

import {
  productAddTag,
  productRemoveTag,
  productAddToNotebook,
  productAskForTranscript,
  productAskForTranslate,
  // productExportItem,
  productMarkAsRead,
  productMarkAsUnread,
  productSetFavorite,
  productSelectItem
} from '../state/actions/ProductActions';
import PageStatusNoData from '../components/Common/PageStatus/index';

export interface ContactsAppViewerProps extends React.Props<ContactsAppViewer> {
  agentid: number;
  contactsData: ContactsCommon.Contact[];
  filters: Contacts.Filters;
  lastId: number;
  unreadIds: number[];
  isFetching: boolean;
  isFirstRequest: boolean;
  isError: boolean;
  hasNextPage: boolean;
  totalCount: number;
  setFavorite: (id: Prod.ProductID, isFavorite: boolean) => void;
  addTags: (itemIds: Prod.ProductID[], tags: Tag.TagData[]) => void;
  removeTag: (id: Prod.ProductID, tagId: Tag.TagId) => void;
  markAsRead: (itemIds: Prod.ProductID[], isRead: boolean) => void,
  addToNotebook: (itemIds: Prod.ProductID[]) => void,
  askForTranslate: (itemIds: Prod.ProductID[]) => void,
  askForTranscript: (itemIds: Prod.ProductID[]) => void,
  getTranslate: (itemIds: Prod.ProductID) => void,
  getTranscript: (itemId: Prod.ProductID) => void,
  openNotebook: () => void,
  exportItem: (itemIds: Prod.ProductID[]) => void,
  onSliceRendered: (startIndex: number, stopIndex: number) => void;

  onFiltersChange: (filters: Contacts.Filters) => void;
  keyword: string,
  params: any;
}

export const PAGE_SIZE = 25;
export const FIRST_PAGE = 1;

class ContactsAppViewer extends React.Component<ContactsAppViewerProps, {}> {

  constructor(props: ContactsAppViewerProps) {
    super(props);
  }

  refresh = (filters: Contacts.Filters, lastId: number) => {
    // this.props.loadContacts(
    //   this.props.params.agent_id,
    //   FIRST_PAGE, // FIRST_PAGE,  // We typically refresh when filtering has changed, so we fetch the first page
    //   PAGE_SIZE, // PAGE_SIZE,
    //   filters,
    //   this.props.lastId,
    // );
  }

  doTags = () => {
// TODO
  }

  doActions = () => {
// TODO
  }

  doSearch = () => {
// TODO
  }

  onRowMenuChange = (ev: Object) => {
// TODO
  }

  componentWillReceiveProps(nextProps: ContactsAppViewerProps) {
    if (JSON.stringify(nextProps.filters) !== JSON.stringify(this.props.filters)) {
      this.refresh(nextProps.filters, null);
    }
  }

  render() {
    if ((!this.props.contactsData || !this.props.contactsData.length) && !this.props.isFirstRequest) {
      return (<PageStatusNoData/>);
    }

    const theme = scTheme.contacts;

    return (
      <ContactsApp
        data={this.props.contactsData}
        hasNextPage={this.props.hasNextPage}
        isFetching={this.props.isFetching}
        isFirstRequest={this.props.isFirstRequest}
        timerIndicator={3}
        updateTimeIndicator={20}
        contentHandlers={{
          setFavorite: this.props.setFavorite,
          addTags: this.props.addTags,
          removeTag: this.props.removeTag,
          markAsRead: this.props.markAsRead,
          addToNotebook: this.props.addToNotebook,
          askForTranslate: this.props.askForTranslate,
          askForTranscript: this.props.askForTranscript,
          getTranslate: this.props.getTranslate,
          getTranscript: this.props.getTranscript,
          openNotebook: this.props.openNotebook,
          exportItem: this.props.exportItem,
          onSliceRendered: () => {/* Not Implemented */
          },
          onFiltersChange: this.props.onFiltersChange,
        }}
        filters={this.props.filters}
        theme={theme}
        keyword={this.props.keyword}
      />
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const contactsList = state[PRODUCT_TYPES.CONTACTS].get('productData');

  const isFetching = state[PRODUCT_TYPES.CONTACTS].get('isFetching');
  const isFirstRequest = state[PRODUCT_TYPES.CONTACTS].get('isFirstRequest');
  const isError = state[PRODUCT_TYPES.CONTACTS].get('isError');
  const totalCount = state[PRODUCT_TYPES.CONTACTS].get('totalCount');
  const lastId = state[PRODUCT_TYPES.CONTACTS].get('lastId');
  const filters = state[PRODUCT_TYPES.CONTACTS].get('filters').toJS();

  const keyword = state[PRODUCT_TYPES.SEARCH].get('keyWord');

  const contactsData = contactsList.toJS();
  return {
    contactsData,
    isFetching,
    isFirstRequest,
    isError,
    filters,
    lastId,
    hasNextPage: totalCount > contactsData.length,
    keyword,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFiltersChange: (filters: Contacts.Filters) => {
      dispatch(Actions.filtersChange({filters: filters}))
    },
    setFavorite: (contactId: ProductID, isFavorite: boolean) => {
      dispatch(productSetFavorite({id: contactId, isFavorite: isFavorite}, PRODUCT_TYPES.CONTACTS))
    },
    removeTag: (contactId: ProductID, tagId: Tag.TagId) => {
      dispatch(productRemoveTag({id: contactId, tagId: tagId}, PRODUCT_TYPES.CONTACTS))
    },
    addTags: (contactIds: ProductID[], tags: Tag.TagData[]) => {
      dispatch(productAddTag({ids: contactIds, tags: tags}, PRODUCT_TYPES.CONTACTS))
    },
    markAsRead: (contactIds: ProductID[], isRead: boolean) => {
      if (isRead) {
        dispatch(productMarkAsRead({ids: contactIds}, PRODUCT_TYPES.CONTACTS))
      } else {
        dispatch(productMarkAsUnread({ids: contactIds}, PRODUCT_TYPES.CONTACTS))
      }
    },
    addToNotebook: (contactIds: ProductID[]) => {
      dispatch(productAddToNotebook({ids: contactIds}, PRODUCT_TYPES.CONTACTS))
    },
    askForTranslate: (contactIds: ProductID[]) => {
      dispatch(productAskForTranslate({ids: contactIds}, PRODUCT_TYPES.CONTACTS))
    },
    askForTranscript: (contactIds: ProductID[]) => {
      dispatch(productAskForTranscript({ids: contactIds}, PRODUCT_TYPES.CONTACTS))
    },
    selectItem: (contactId: ProductID) => {
      dispatch(productSelectItem({id: contactId}, PRODUCT_TYPES.CONTACTS))
    },
    // requestUpdate: () => {/* TODO: implement the function */ },
    //
    // // sort: () => {/* TODO: implement the function */ },
    // // search: () => {/* TODO: implement the function */ },
    // // show: () => {/* TODO: implement the function */ },
    // // tags: () => {/* TODO: implement the function */ },
    // // actions: () => {/* TODO: implement the function */ },
    // // extractNow:  () => {/* TODO: implement the function */ },
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContactsAppViewer)
