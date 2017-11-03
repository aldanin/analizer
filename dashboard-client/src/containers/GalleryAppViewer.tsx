import * as React from 'react'
import { Component } from 'react'
import { connect } from 'react-redux'
import { PhotoData } from '../types/Photo'
import GalleryAppViewer from '../components/GalleryAppViewer/index'
import {
  // loadGallery,
  imageOptionSelected,
  sortOptionSelected,
} from '../state/actions/Gallery';
import { GalleryViewTheme } from '../theme/ScTheme';
import { TagData, TagId } from '../types/Tag';
import {
  productAddTag, productAddToNotebook, productAskForTranscript, productAskForTranslate, productExportItem,
  productMarkAsRead,
  productMarkAsUnread, productRemoveTag, productSelectItem, productSetFavorite
} from '../state/actions/ProductActions';
import { PRODUCT_TYPES } from '../types/Product';
import { ProductID } from 'common-interfaces/types/Product';

// import * as ProdActions from '../state/actions/ProductActions'

import PageStatusNoData from '../components/Common/PageStatus/index';

export interface GalleryWidgetProps extends React.Props<GalleryWidgetProps> {
  galleryData: {
    photos: PhotoData[];
    timerIndicator: number;
    updateTimeIndicator: number;
    filter: string;
  };
  isFetching: boolean;
  isFirstRequest: boolean;
  isFirstLoading: boolean;
  isError: boolean;
  loadGallery: (agent: string) => void;
  setStar: () => void;
  addTag: (photoId: ProductID[], tag: TagData[]) => void;
  setUnRead: (photoId: ProductID[]) => void;
  setRead: (photoId: ProductID[]) => void;
  addToNotebook: (photoId: ProductID[]) => void;
  askForTranslate: (photoId: ProductID[]) => void;
  askForTranscript: (photoId: ProductID[]) => void;
  exportItem: (photoId: ProductID[]) => void;
  removeTag: (photoId: ProductID, tagId: TagId) => void;
  selectItem: (photoId: ProductID) => void;
  sort: (filter: string, agentId: string) => void;
  imageOption: () => void;
  show: () => void;
  tags: () => void;
  requestGalleryUpdate: () => void;
  getFullSizeImage: () => void;
  extractNow: () => void;
  keyword: string;
  params: any;
}

export class Gallery extends Component<GalleryWidgetProps, {}> {

  constructor() {
    super();
  }

  loadGalleryProps = () => {
    this.props.loadGallery(this.props.params.agent_id);
  }

  sortBy = (filter: string) => {
    this.props.sort(filter, this.props.params.agent_id);
  }

  public componentDidMount() {
    //  this.loadGalleryProps();
  }

  render() {
    if (this.props.isError) {
      return <div>Fail to load</div>
    }

    if ((!this.props.galleryData.photos || !this.props.galleryData.photos.length) && !this.props.isFirstRequest) {
      return (<PageStatusNoData/>);
    }

    return (
      <GalleryAppViewer
        photos={this.props.galleryData.photos}
        timerIndicator={this.props.galleryData.timerIndicator}
        updateTimeIndicator={this.props.galleryData.updateTimeIndicator}
        filter={this.props.galleryData.filter}
        setStar={this.props.setStar}
        addTag={this.props.addTag}
        removeTag={this.props.removeTag}
        sort={this.sortBy}
        imageOption={this.props.imageOption}
        show={this.props.show}
        tags={this.props.tags}
        requestGalleryUpdate={this.props.requestGalleryUpdate}
        getFullSizeImage={this.props.getFullSizeImage}
        extractNow={this.props.extractNow}
        isFetching={this.props.isFetching}
        isFirstRequest={this.props.isFirstRequest}
        setUnRead={this.props.setUnRead}
        setRead={this.props.setRead}
        addToNotebook={this.props.addToNotebook}
        askForTranslate={this.props.askForTranslate}
        askForTranscript={this.props.askForTranscript}
        exportItem={this.props.exportItem}
        keyword={this.props.keyword}
        theme={GalleryViewTheme}
        selectItem={this.props.selectItem}
      />
    )
  }
}

const mapStateToProps = (state) => {
  const galleryData = {
    photos: null,
    timerIndicator: 2,
    updateTimeIndicator: 4000,
    filter: state[PRODUCT_TYPES.GALLERY].get('filter'),
  }
  const isFetching = state[PRODUCT_TYPES.GALLERY].get('isFetching');
  const isFirstRequest = state[PRODUCT_TYPES.GALLERY].get('isFirstRequest');
  const keyword = state[PRODUCT_TYPES.SEARCH].get('keyWord');

  if (!!state[PRODUCT_TYPES.GALLERY].get('productData')) {
    galleryData.photos = state[PRODUCT_TYPES.GALLERY].get('productData').toJS();
  }

  const isError = !!state[PRODUCT_TYPES.GALLERY].get('error');
  // console.log('===> Gallery', galleryData, isFetching, isError, keyword)
  return {
    galleryData,
    isFetching,
    isFirstRequest,
    isError,
    keyword,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // loadGallery: (agentId: string) => {
    //   // dispatch( ProdActions.productLoadRequest({agentId: agentId}, PRODUCT_TYPES.GALLERY))
    //   dispatch(loadGallery({agentId: agentId}))
    // },
    setStar: (id: ProductID, isFavorite: boolean) => {
      dispatch(productSetFavorite({id: id, isFavorite: isFavorite}, PRODUCT_TYPES.GALLERY))
    },
    removeTag: (photoId: ProductID, tagId: TagId) => {
      dispatch(productRemoveTag({id: photoId, tagId: tagId}, PRODUCT_TYPES.GALLERY))
    },
    sort: (sortFilter: string, agentId: string) => {
      dispatch(sortOptionSelected(sortFilter, agentId))
    },
    imageOption: (photoId: ProductID, optionIndex: number) => {
      dispatch(imageOptionSelected({photoId: photoId, optionId: optionIndex}))
    },
    addTag: (photoId: ProductID[], tag: TagData[]) => {
      dispatch(productAddTag({ids: photoId, tags: tag}, PRODUCT_TYPES.GALLERY))
    },
    setUnRead: (photoId: ProductID[]) => {
      dispatch(productMarkAsUnread({ids: photoId}, PRODUCT_TYPES.GALLERY))
    },
    setRead: (photoId: ProductID[]) => {
      dispatch(productMarkAsRead({ids: photoId}, PRODUCT_TYPES.GALLERY))
    },
    addToNotebook: (photoId: ProductID[]) => {
      dispatch(productAddToNotebook({ids: photoId}, PRODUCT_TYPES.GALLERY))
    },
    askForTranslate: (photoId: ProductID[]) => {
      dispatch(productAskForTranslate({ids: photoId}, PRODUCT_TYPES.GALLERY))
    },
    askForTranscript: (photoId: ProductID[]) => {
      dispatch(productAskForTranscript({ids: photoId}, PRODUCT_TYPES.GALLERY))
    },
    selectItem: (photoId: ProductID) => {
      dispatch(productSelectItem({id: photoId}, PRODUCT_TYPES.GALLERY))
    },
    exportItem: (photoId: ProductID[]) => {
      dispatch(productExportItem({ids: photoId}, PRODUCT_TYPES.GALLERY))
    },
    requestGalleryUpdate: () => {/* TODO: implement the function */
    },
    getFullSizeImage: () => {/* TODO: implement the function */
    },
    show: () => {/* TODO: implement the function */
    },
    tags: () => {/* TODO: implement the function */
    },
    extractNow: () => {/* TODO: implement the function */
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Gallery)
