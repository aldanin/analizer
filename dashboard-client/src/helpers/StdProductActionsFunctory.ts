import { TagData } from '../types/Tag'
import { ProductID } from '../types/Product'
import {
  productAddTag,
  productAddToNotebook,
  productAskForTranscript,
  productAskForTranslate,
  productExportItem,
  productMarkAsRead,
  productMarkAsUnread,
} from '../state/actions/ProductActions';

export interface StdProductActions {
  addTag: (ids: ProductID[], tags: TagData[]) => void,
  addToNotebook: (ids: ProductID[]) => void,
  markAsRead: (ids: ProductID[]) => void,
  markAsUnread: (ids: ProductID[]) => void,
  askForTranslate: (ids: ProductID[]) => void,
  askForTranscript: (ids: ProductID[]) => void,
  exportItem: (ids: ProductID[]) => void
}

const stdProductActions = (dispatch, pType) => (
  {
    addTag: (ids: ProductID[], tags: TagData[]) => {dispatch(productAddTag({ids, tags}, pType))},
    addToNotebook: (ids: ProductID[]) => {dispatch(productAddToNotebook({ids}, pType))},
    markAsRead: (ids: ProductID[]) => {dispatch(productMarkAsRead({ids}, pType))},
    markAsUnread: (ids: ProductID[]) => {dispatch(productMarkAsUnread({ids}, pType))},
    askForTranslate: (ids: ProductID[]) => {dispatch(productAskForTranslate({ids}, pType))},
    askForTranscript: (ids: ProductID[]) => {dispatch(productAskForTranscript({ids}, pType))},
    exportItem: (ids: ProductID[]) => {dispatch(productExportItem({ids}, pType))},
  }
)

export default stdProductActions
