import * as Theme from './Theme'
import * as Prod from '../../../types/Product'
import * as Tags from '../../../types/Tag'
import DefaultRenderer from './columnRenderers/DefaultRenderer'

export interface GroupByProps {
  caption: string;
  field: string;
}

export interface CellProps {
  fontColor?: string;
  fontSize?: number | string;
  width?: number;
  minWidth?: number,
  maxWidth?: number,
  flexShrink?: number;
  flexGrow?: number;
  isClickable?: boolean;
  marginRight?: number | string;
  additionalStyle?: any;
}

export interface ColumnHeaderProps extends CellProps {
  title: string;
  field: string;
}

export interface ColumnDataProps {
  rowData: any;
  field: string;
  withMarker?: boolean;
  style?: any,
  options?: any,
  additionalTheme?: any,
  theme: Theme.ThemeProps
}

export interface ColumnProps {
  title: string;
  field: string;
  headerClickable?: boolean;
  withMarker?: boolean;
  renderer?: (props: ColumnDataProps) => JSX.Element;
  width?: number;
  minWidth?: number;
  maxWidth?: number;
  cellColor?: string;
  cellFontSize?: string;
  flexShrink?: number;
  flexGrow?: number;
  headerCellColor?: string;
  additionalStyle?: any; // Extra styling option
  options?: any;
}

export const DEAFULT_COLUMN_PROPS = {
  title: 'Name',
  field: 'name',
  headerClickable: true,
  withMarker: false,
  renderer: DefaultRenderer,
  width: 30,
  cellColor: 'black',
  cellFontSize: '1.2rem',
  flexShrink: 0,
  flexGrow: 0,
  headerCellColor: 'black'
}

export const DEAFULT_CELL_PROPS = {
  fontColor: 'black',
  fontSize: '1.2rem',
  width: 50,
  minWidth: 50,
  maxWidth: 50,
  flexShrink: 0,
  flexGrow: 0,
  isClickable: false,
  marginRight: 20,
  additionalStyle: {}
}

export const DEFAULT_ACTIONS = {
  onRowCheck: (id: Prod.ProductID, state: boolean) => {
    // NOT Implemented
  },
  setStar: (id: Prod.ProductID, isFavorite: boolean) => {
    // NOT Implemented
  },
  removeTag: (id: Prod.ProductID, tag: Tags.TagId) => {
    // NOT Implemented
  },
  addTag: (id: Prod.ProductID, tag: Tags.TagData[]) => {
    // NOT Implemented
  },
  addToNotebook: (id: Prod.ProductID) => {
    // NOT Implemented
  },
  markAsRead: (id: Prod.ProductID) => {
    // NOT Implemented
  },
  markAsUnRead: (id: Prod.ProductID) => {
    // NOT Implemented
  },
  askForTranslate: (id: Prod.ProductID) => {
    // NOT Implemented
  },
  askForTranscript: (id: Prod.ProductID) => {
    // NOT Implemented
  },
  exportItem: (id: Prod.ProductID) => {
    // NOT Implemented
  },
  openNotebook: () => {
    // NOT Implemented
  },
  getTranslate: (id: Prod.ProductID) => {
    // NOT Implemented
  },
  getTranscript: (id: Prod.ProductID) => {
    // NOT Implemented
  },
};
//
// These allow name customization of action menu parameters ( e.g. hasNotes -> isNotebook ):
//
export type FieldNamesMapping = {
  isNoteBook: string,
  isTranslate: string,
  hasTranscript: string,
}

export const DEFAULT_FIELDNAME_MAPPING: FieldNamesMapping = {
  isNoteBook: 'isNotebook',
  isTranslate: 'isTranslate',
  hasTranscript: 'hasTranscript',
}
