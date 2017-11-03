import {
  TEXT_COLORS,
  BACKGROUND_COLORS,
  ICON_STAR_COLOR,
} from './constants'
import { addAlpha } from './helpers'

const loginPage = {
  background: 'url(\'/images/login_background.png\') 0/cover',
  textColor: TEXT_COLORS.T01,
  hintTextColor: TEXT_COLORS.T15,
  errorTextColor: TEXT_COLORS.T12,
  buttonBg: BACKGROUND_COLORS.B21,
  buttonTextColor: TEXT_COLORS.T01,
  buttonDisabledBg: BACKGROUND_COLORS.B11,
  buttonDisabledTextColor: TEXT_COLORS.T15,
  underlineFocusColor: BACKGROUND_COLORS.B01,
}

const DefaultAvatar = {
  color: 'rgb(42, 45, 56)',
  backgroundColor: 'rgb(191, 191, 191)',
}

const notificationBadge = {
  bgColor: BACKGROUND_COLORS.B28,
  textColor: TEXT_COLORS.T01,
  fontWeight: 'normal',
}
const headerTheme = {
  highlightColor: TEXT_COLORS.T01,
  textColor: TEXT_COLORS.T05,
  backgroundImage: 'url(\'/images/header_background_1.png\')',
  notificationBadge
}
const globalNavBar = {
  highlightColor: TEXT_COLORS.T01,
  textColor: TEXT_COLORS.T05,
  backgroundImage: 'url(\'/images/header_background_2.png\')',
  menuBg: BACKGROUND_COLORS.B06,
  menuTextColor: TEXT_COLORS.T09,
  menuHighlightColor: TEXT_COLORS.T16,
  notificationBadge
}
const VGridRowRenderer = {
  bgColorRowActive: BACKGROUND_COLORS.B02,
  bgColorRowHover: BACKGROUND_COLORS.B05,
}

const genericTextColors = {
  textColor: TEXT_COLORS.T02,
  textColorLink: TEXT_COLORS.T17,
  textColorPale: TEXT_COLORS.T03,
  borderColor: '#e1e0e0',
}

export const dropdownGeneric = {
  genericTextColors: genericTextColors
}

const appSymbolColors = {
  default: TEXT_COLORS.T02,
  phone: '#3b4993',
  hangouts: '#34974d',
  whatsapp: '#8ED370',
  skype: '#48bae7',
  mail: '#f35757',
  facebook: '#366bff',
  line: '#40bf00',
  facebook_messenger: '#366bff',
  telegram: TEXT_COLORS.T16,
  viber: BACKGROUND_COLORS.B13,
  linkedin: TEXT_COLORS.T10,
  sms: TEXT_COLORS.T03,
  excel: TEXT_COLORS.T02,
  word: TEXT_COLORS.T02,
  pdf: TEXT_COLORS.T02,
}

const appSymbols = {
  colors: appSymbolColors
}

const DateChooserTheme = {
  textColor: TEXT_COLORS.T17
}

const homepageTheme = {
  bgColor: BACKGROUND_COLORS.B04,
  listPanel: {
    bgColor: BACKGROUND_COLORS.B01,
    bgColorSelected: 'rgb(239, 241, 249)',
    textColor: TEXT_COLORS.T02,
    textColorLight: TEXT_COLORS.T03,
    accentColor: BACKGROUND_COLORS.B21,
  },
  dashboard: {
    cardHeadBgImage: 'linear-gradient( 90deg, rgb(53, 158, 193), rgb(45, 145, 180) )',
    cardHeadTextColor: TEXT_COLORS.T01,
    cardHoverBgColor: BACKGROUND_COLORS.B16,
    cardHoverBorderColor: BACKGROUND_COLORS.B19,
    textColorLight: TEXT_COLORS.T03,
    textColorCounter: TEXT_COLORS.T04,
    textColorAlert: TEXT_COLORS.T18,
    textColorDisabled: TEXT_COLORS.T03,
    tooltip: {
      textColor: TEXT_COLORS.T01,
      highlightColor: TEXT_COLORS.T11,
      backgroundColor: addAlpha(BACKGROUND_COLORS.B06, 0.95),
    }
  },
}

export const TagTheme = {
  textColor: BACKGROUND_COLORS.B29,
  borderColor: BACKGROUND_COLORS.B29,
  backgroundColor: 'none',
}

export const TabsTheme = {
  activeBgColor: BACKGROUND_COLORS.B01,
  activeTextColor: TEXT_COLORS.T06,
  activeBorderColor: TEXT_COLORS.T06,
  disActiveBgColor: TEXT_COLORS.T16,
  disActiveTextColor: TEXT_COLORS.T01,
  disActiveBorderColor: TEXT_COLORS.T16,
  shadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
}

export const RadiosTheme = {
  activeBgColor: BACKGROUND_COLORS.B01,
  activeTextColor: TEXT_COLORS.T04,
  activeBorderColor: TEXT_COLORS.T06,
  disActiveBgColor: BACKGROUND_COLORS.B01,
  disActiveTextColor: TEXT_COLORS.T04,
  disActiveBorderColor: TEXT_COLORS.T01,
  shadow: 'none',
}

export const ChatBubbleTheme = {
  textColor: BACKGROUND_COLORS.B29,
  borderColor: BACKGROUND_COLORS.B29,
}

export const CheckboxTheme = {
  bgColor: BACKGROUND_COLORS.B01,
  textColor: TEXT_COLORS.T17,
  borderColor: TEXT_COLORS.T09,
}

export const ListItemTheme = {
  checkedColor: BACKGROUND_COLORS.B21,
  readMarkColor: 'transparent',
  unreadMarkColor: BACKGROUND_COLORS.B28,
  starColor: ICON_STAR_COLOR,
  starBorderColor: BACKGROUND_COLORS.B08,
  translateOnColor: TEXT_COLORS.T02,
  translateOffColor: TEXT_COLORS.T03,
  notebookOnColor: TEXT_COLORS.T02,
  checkBgColor: BACKGROUND_COLORS.B03,
  iconColor: BACKGROUND_COLORS.B09,
  checkbox: CheckboxTheme,
  borderColor: BACKGROUND_COLORS.B02,
  hoverBgColor: BACKGROUND_COLORS.B02,
  notebookIconColor: TEXT_COLORS.T03,
}

export const TreeNodeTheme = {
  checkedColor: BACKGROUND_COLORS.B21,
  readMarkColor: 'transparent',
  unreadMarkColor: BACKGROUND_COLORS.B28,
  starColor: ICON_STAR_COLOR,
  starBorderColor: BACKGROUND_COLORS.B08,
  translateOnColor: TEXT_COLORS.T02,
  translateOffColor: TEXT_COLORS.T03,
  notebookOnColor: TEXT_COLORS.T02,
  checkBgColor: BACKGROUND_COLORS.B03,
  arrowIconColor: TEXT_COLORS.T04,
  iconColor: BACKGROUND_COLORS.B09,
  checkbox: CheckboxTheme,
  borderColor: BACKGROUND_COLORS.B02,
  hoverBgColor: BACKGROUND_COLORS.B02,
  notebookIconColor: TEXT_COLORS.T03,
}

export const GridGenericTheme = {
  genericTextColors: genericTextColors,
  arrowIconColor: TEXT_COLORS.T04,
  appSymbols: appSymbols,
  listItem: ListItemTheme,
}

export const GridTheme = {
  sortIconSize: 8,
  sortIconMargin: 2,
}

const VGridTheme = {
  genericTextColors: genericTextColors,
  rowBorder: BACKGROUND_COLORS.B02,
  tags: TagTheme,
  status: BACKGROUND_COLORS.B30,
  rowTheme: VGridRowRenderer,
  checkbox: CheckboxTheme,
  appSymbols: appSymbols,
  header: {
    sortIconSize: 8,
    sortIconMargin: 2,
  }
}

export const MenuIconTheme = {
  textColor: TEXT_COLORS.T03,
}

export const circleNumberTheme = {
  bgColor: BACKGROUND_COLORS.B28,
  borderColor: TEXT_COLORS.T03,
  numberColor: TEXT_COLORS.T01
}

export const ActivityPatternTheme = {
  textColor: TEXT_COLORS.T03,
  hoverColor: TEXT_COLORS.T08,
}

export const AppViewHeaderToolTheme = {
  backgroundColor: BACKGROUND_COLORS.B01,
  iconViewColor: TEXT_COLORS.T02,
  titleColor: TEXT_COLORS.T02,
  textColor: TEXT_COLORS.T03,
  watchColor: TEXT_COLORS.T03,
  linkColor: TEXT_COLORS.T17,
}

export const AppViewFilterToolTheme = {
  backgroundColor: BACKGROUND_COLORS.B01,
  borderBottom: BACKGROUND_COLORS.B02,
  arrowColor: TEXT_COLORS.T17,
  titleColor: TEXT_COLORS.T02,
  titleInsideDropDownMenuColor: TEXT_COLORS.T17,
  searchBorder: BACKGROUND_COLORS.B03,
  searchFocusColor: 'lightgoldenrodyellow',
  searchIconColor: TEXT_COLORS.T17,
  actionMenuIconColor: TEXT_COLORS.T20,
  actionMenuTextColor: TEXT_COLORS.T04,
  selectedBackground: '#e3f8fc',
  clearAllTextColor: TEXT_COLORS.T04,
}

export const PhotoGridTheme = {
  starColor: ICON_STAR_COLOR,
  starBorder: TEXT_COLORS.T02,
  starStroke: TEXT_COLORS.T01,
  markerColor: BACKGROUND_COLORS.B28,
  textColor: TEXT_COLORS.T02,
  titleColor: TEXT_COLORS.T01,
  titleBgColor: addAlpha(BACKGROUND_COLORS.B20, 0.5),
  hoverBgColor: BACKGROUND_COLORS.B02,
  checkBgColor: BACKGROUND_COLORS.B03,
  checkBox: CheckboxTheme,
}

const TimeLine = {
  bgColor: BACKGROUND_COLORS.B06,
  textColor: TEXT_COLORS.T07,
}
const Notebook = {
  bgColor: BACKGROUND_COLORS.B06,
  textColor: TEXT_COLORS.T07,
}

export const KeyloggerView = {
  darkTextColor: TEXT_COLORS.T02,
  lightTextColor: TEXT_COLORS.T03,
  linkColor: TEXT_COLORS.T07,
  bordersColor: BACKGROUND_COLORS.B02,
  detailsPaneHeaderBg: BACKGROUND_COLORS.B03,
  detailsPaneBg: BACKGROUND_COLORS.B04,
  detailsPaneContentBg: BACKGROUND_COLORS.B01,
  tags: TagTheme,
  tabs: {
    activeBgColor: BACKGROUND_COLORS.B01,
    activeTextColor: TEXT_COLORS.T06,
    activeBorderColor: TEXT_COLORS.T06,
    disActiveBgColor: BACKGROUND_COLORS.B01,
    disActiveTextColor: TEXT_COLORS.T04,
    disActiveBorderColor: BACKGROUND_COLORS.B01,
    shadow: 'none',
  },
  checkbox: CheckboxTheme,
}

export const GalleryViewTheme = {
  defaultColors: {
    textColor: TEXT_COLORS.T02,
    bgColor: BACKGROUND_COLORS.B01,
    tags: TagTheme,
    photoGrid: PhotoGridTheme,
    appViewHeaderTool: AppViewHeaderToolTheme,
    appViewFilterTool: AppViewFilterToolTheme,
  },
  filter: {
    sortText: TEXT_COLORS.T03,
    bgColor: BACKGROUND_COLORS.B01,
    sortBorderBottomColor: BACKGROUND_COLORS.B03,
    dropDownArrowColor: TEXT_COLORS.T04,
  },
  photoDetails: {
    headerBgColor: BACKGROUND_COLORS.B03,
    bodyBgColor: BACKGROUND_COLORS.B04,
    labelTitleColor: TEXT_COLORS.T03,
    labelTextColor: TEXT_COLORS.T02,
    linkTextColor: TEXT_COLORS.T04,
    zoomIconBgColor: addAlpha(BACKGROUND_COLORS.B21, 0.5),
    iconColor: TEXT_COLORS.T01,
    actionIconColor: TEXT_COLORS.T20,
    imageBorderColor: BACKGROUND_COLORS.B09,
  },

  dialogBgColor: BACKGROUND_COLORS.B02,
}

export const PhotoGridCommonTheme = {
  textColor: TEXT_COLORS.T02,
  markerColor: BACKGROUND_COLORS.B28,
  checkColor: BACKGROUND_COLORS.B03,
  hoverBgColor: BACKGROUND_COLORS.B04,
  starColor: ICON_STAR_COLOR,
  imageContainer: BACKGROUND_COLORS.B09,
}

export const BrowserViewTheme = {
  defaultTextColor: TEXT_COLORS.T02,
  linkColor: TEXT_COLORS.T04,
  pipeColor: TEXT_COLORS.T09,
  groupByColor: TEXT_COLORS.T03,
  tags: TagTheme,
  tabs: TabsTheme,
  checkbox: CheckboxTheme,
  browserIcon: TEXT_COLORS.T02,
  expandIcon: TEXT_COLORS.T04,
  collapseIcon: TEXT_COLORS.T04,
  translateOnColor: BACKGROUND_COLORS.B21,
  translateOffColor: BACKGROUND_COLORS.B08,
  notebookOnColor: BACKGROUND_COLORS.B08,
  appViewHeaderTool: AppViewHeaderToolTheme,
  appViewFilterTool: AppViewFilterToolTheme,

  bookmarks: {
    lineBgColor: BACKGROUND_COLORS.B01,
    iconColor: BACKGROUND_COLORS.B09,
    borderColor: BACKGROUND_COLORS.B02,
    arrowIconColor: TEXT_COLORS.T04,
    emptyFilesTextColor: TEXT_COLORS.T02,
    notebookIconColor: TEXT_COLORS.T03,
    folderIconColor: TEXT_COLORS.T04,
    starColor: ICON_STAR_COLOR,
    starBorderColor: BACKGROUND_COLORS.B08,
    markerColor: BACKGROUND_COLORS.B21,
    newItemColor: BACKGROUND_COLORS.B28,
    hoverBgColor: BACKGROUND_COLORS.B02,
    checkBgColor: BACKGROUND_COLORS.B03,
    urlColor: TEXT_COLORS.T03,
    extractedColor: TEXT_COLORS.T03,
  },
  history: {
    lineBgColor: BACKGROUND_COLORS.B01,
    borderColor: BACKGROUND_COLORS.B02,
    titleColor: TEXT_COLORS.T04,
    arrowColor: TEXT_COLORS.T04,
    translateIconColor: TEXT_COLORS.T03,
    timeColor: TEXT_COLORS.T03,
    filterColor: TEXT_COLORS.T03,
    hoverBgColor: BACKGROUND_COLORS.B02,
    checkBgColor: BACKGROUND_COLORS.B03,
    marker1Color: BACKGROUND_COLORS.B21,
    marker2Color: BACKGROUND_COLORS.B28,
    browserColor: TEXT_COLORS.T03,
    actionIconColor: TEXT_COLORS.T03,
    starBorderColor: BACKGROUND_COLORS.B08,
  }
}
export const directory = {
  defaultTextColor: TEXT_COLORS.T02,
  linkColor: TEXT_COLORS.T04,
  pipeColor: TEXT_COLORS.T09,
  groupByColor: TEXT_COLORS.T03,
  tags: TagTheme,
  tabs: TabsTheme,
  radios: RadiosTheme,
  checkbox: CheckboxTheme,
  dateChooser: DateChooserTheme,
  starColor: ICON_STAR_COLOR,
  starBorderColor: BACKGROUND_COLORS.B08,
  expandIcon: TEXT_COLORS.T04,
  collapseIcon: TEXT_COLORS.T04,
  translateOnColor: BACKGROUND_COLORS.B21,
  translateOffColor: BACKGROUND_COLORS.B08,
  borderColor: BACKGROUND_COLORS.B02,
  notebookOnColor: BACKGROUND_COLORS.B08,
  appViewHeaderTool: AppViewHeaderToolTheme,
  appViewFilterTool: AppViewFilterToolTheme,
  extractedColor: TEXT_COLORS.T03,
  folderIconColor: TEXT_COLORS.T04,
  grid: VGridTheme,
  detailsPane: {
    headerBgColor: BACKGROUND_COLORS.B03,
    bodyBgColor: BACKGROUND_COLORS.B04,
    previewBgColor: BACKGROUND_COLORS.B01
  },
  appSymbols: appSymbols,
  genericTextColors: genericTextColors,
  treeNode: TreeNodeTheme,
}

export const SocialNetworksTheme = {
  textColor: TEXT_COLORS.T02,
  tags: TagTheme,
  tabs: TabsTheme,
  profileBgColor: BACKGROUND_COLORS.B01,
  infoBgColor: BACKGROUND_COLORS.B02,
  borderColor: BACKGROUND_COLORS.B02,
  profileTextColor: TEXT_COLORS.T03,
  menuItemBgColor: BACKGROUND_COLORS.B01,
  menuItemHoverColor: TEXT_COLORS.T08,
  selectedItemColor: BACKGROUND_COLORS.B21,
  newItemColor: BACKGROUND_COLORS.B28,
  newItemTextColor: TEXT_COLORS.T01,
  messageBorderColor: BACKGROUND_COLORS.B09,
  messageBgColor: BACKGROUND_COLORS.B01,
  commentBgColor: addAlpha(BACKGROUND_COLORS.B05, 0.5),
  messageIconsColor: TEXT_COLORS.T03,
  messageImageBorder: TEXT_COLORS.T09,
  linkColor: TEXT_COLORS.T04,
  mentionBgColor: BACKGROUND_COLORS.B01,
  followBgColor: BACKGROUND_COLORS.B01,
  sortByColor: TEXT_COLORS.T03,
  arrowColor: TEXT_COLORS.T04,
  titleInsideDropDownMenuColor: TEXT_COLORS.T04,
}

export const CalendarViewTheme = {
  textColor: TEXT_COLORS.T02,
  tags: TagTheme,
  tabsTheme: TabsTheme,
  checkboxTheme: CheckboxTheme,
  selectedItemColor: BACKGROUND_COLORS.B21,
  newItemColor: BACKGROUND_COLORS.B28,
  switchAccountEnable: TEXT_COLORS.T04,
  switchAccountDisable: TEXT_COLORS.T09,
  activeAccountsColor: [{
    bgColor: addAlpha(BACKGROUND_COLORS.B25, 0.65),
    textColor: TEXT_COLORS.T01,
    borderColor: BACKGROUND_COLORS.B25,
  }, {
    bgColor: addAlpha(BACKGROUND_COLORS.B26, 0.65),
    textColor: TEXT_COLORS.T01,
    borderColor: BACKGROUND_COLORS.B26,
  }, {
    bgColor: addAlpha(BACKGROUND_COLORS.B13, 0.65),
    textColor: TEXT_COLORS.T01,
    borderColor: BACKGROUND_COLORS.B13,
  }, {
    bgColor: addAlpha(BACKGROUND_COLORS.B27, 0.65),
    textColor: TEXT_COLORS.T01,
    borderColor: BACKGROUND_COLORS.B13,
  }, ],
  weeklyDateColor: TEXT_COLORS.T04,
  agendaBorderColor: BACKGROUND_COLORS.B02,
  agendaLocationColor: TEXT_COLORS.T03,
  agendaParticipantsColor: TEXT_COLORS.T03,
  agendaHoverBgColor: BACKGROUND_COLORS.B02,
  agendaActionIconColor: TEXT_COLORS.T03,
  agendaEmptyStarColor: TEXT_COLORS.T03,
  agendaNotebookIconColor: TEXT_COLORS.T03,
  weekGridTextColor: TEXT_COLORS.T03,
  weekGridBorderColor: TEXT_COLORS.T09,
  eventTag: {
    textColor: addAlpha(TEXT_COLORS.T02, 0.5),
    borderColor: addAlpha(TEXT_COLORS.T02, 0.5),
    backgroundColor: addAlpha(BACKGROUND_COLORS.B01, 0.3),
  },
  gridActionIconColor: TEXT_COLORS.T03,
  starColor: {
    fullStarStrokeColor: '#49AAC8',
    fullStarFillColor: '#49AAC8',
    emptyStarStrokeColor: TEXT_COLORS.T03,
    emptyStarFillColor: 'transparent',
  },
  eventHeaderColor: BACKGROUND_COLORS.B21,
  eventTitleColor: TEXT_COLORS.T01,
  eventCloseColor: TEXT_COLORS.T05,
  eventIconsColor: TEXT_COLORS.T03,
  eventTextFirstColor: TEXT_COLORS.T04,
  eventTextSecondColor: TEXT_COLORS.T02,
  eventLabelsColor: TEXT_COLORS.T03,
  eventBorderColor: addAlpha(TEXT_COLORS.T09, 0.7),
  eventIndicatorBgColor: addAlpha(BACKGROUND_COLORS.B32, 0.65),
  eventIndicatorTextColor: TEXT_COLORS.T01,
}

export const contacts = {
  fontWeight: 'normal',
  textColor: TEXT_COLORS.T02,
  textColorPale: TEXT_COLORS.T03,
  isFavorite: BACKGROUND_COLORS.B21,
  checkbox: CheckboxTheme,
  starColor: ICON_STAR_COLOR,
  starBorderColor: BACKGROUND_COLORS.B08,
  grid: GridGenericTheme,
  detailsPane: {
    headerBgColor: BACKGROUND_COLORS.B03,
    bodyBgColor: BACKGROUND_COLORS.B04,
    pieFilledPart: BACKGROUND_COLORS.B09,
    pieOtherPart: BACKGROUND_COLORS.B06,
  },
  appViewHeaderTool: AppViewHeaderToolTheme,
  appViewFilterTool: AppViewFilterToolTheme,
  appSymbols: appSymbols,
  genericTextColors: genericTextColors,
  defaultAvatar: DefaultAvatar,
}

const instantMessaging = {
  fontWeight: 'normal',
  isFavorite: BACKGROUND_COLORS.B21,
  checkbox: CheckboxTheme,
  starColor: ICON_STAR_COLOR,
  starBorderColor: BACKGROUND_COLORS.B08,
  seperationBorder: BACKGROUND_COLORS.B09,
  seperationBorderPale: BACKGROUND_COLORS.B02,
  grid: GridGenericTheme,
  additionalTheme: {
    numberCircle: circleNumberTheme,
  },
  chatArea: {
    bgColor: BACKGROUND_COLORS.B04,
    bgDetailsBar: BACKGROUND_COLORS.B01,
    borderColorDetailsBar: '#d6d6d6',
    // contactMessageBG: BACKGROUND_COLORS.B01,
  },
  bubbles: {
    targetMessageBGColor: BACKGROUND_COLORS.B24,
    targetMessageBorderColor: '#a1e89c',
    contactMessageBGColor: BACKGROUND_COLORS.B01,
    contactMessageBorderColor: 'silver',
    placeholderBGColor: 'rgba(255, 255, 255, 0.52)',
    placeholderBorderColor: '#ececec',
    dateBGColor: BACKGROUND_COLORS.B17,
    dateBorderColor: '#eaeaea',
    borderBottomColor: TEXT_COLORS.T09,
  },
  appSymbols: appSymbols,
  genericTextColors: genericTextColors,
  appViewHeaderTool: AppViewHeaderToolTheme,
  appViewFilterTool: AppViewFilterToolTheme,
}

const accounts = {
  fontWeight: 'normal',
  textColor: TEXT_COLORS.T02,
  textColorPale: TEXT_COLORS.T03,
  textColorLink: TEXT_COLORS.T17,
  isFavorite: BACKGROUND_COLORS.B21,
  checkbox: CheckboxTheme,
  starColor: ICON_STAR_COLOR,
  starBorderColor: BACKGROUND_COLORS.B08,
  grid: {
    headerColor: TEXT_COLORS.T17,
    bgColor: BACKGROUND_COLORS.B01,
    bgColorRowActive: BACKGROUND_COLORS.B02,
    bgColorRowHover: BACKGROUND_COLORS.B05,
    rowBorder: BACKGROUND_COLORS.B02,
    tags: TagTheme,
    status: BACKGROUND_COLORS.B30
  },
  detailsPane: {
    headerBgColor: BACKGROUND_COLORS.B03,
    bodyBgColor: BACKGROUND_COLORS.B04,
    pieFilledPart: BACKGROUND_COLORS.B09,
    pieOtherPart: BACKGROUND_COLORS.B06,
  },
  appSymbolColors: appSymbolColors,
  genericTextColors: genericTextColors,
  appViewHeaderTool: AppViewHeaderToolTheme,
  appViewFilterTool: AppViewFilterToolTheme,
}

const calls = {
  fontWeight: 'normal',
  textColor: TEXT_COLORS.T02,
  textColorPale: TEXT_COLORS.T03,
  textColorLink: TEXT_COLORS.T17,
  isFavorite: BACKGROUND_COLORS.B21,
  checkbox: CheckboxTheme,
  starColor: ICON_STAR_COLOR,
  starBorderColor: BACKGROUND_COLORS.B08,
  grid: GridGenericTheme,
  detailsPane: {
    headerBgColor: BACKGROUND_COLORS.B03,
    bodyBgColor: BACKGROUND_COLORS.B04,
    pieFilledPart: BACKGROUND_COLORS.B09,
    pieOtherPart: BACKGROUND_COLORS.B06,
  },
  appSymbols: appSymbols,
  genericTextColors: genericTextColors,
  appViewHeaderTool: AppViewHeaderToolTheme,
  appViewFilterTool: AppViewFilterToolTheme,
}

export const SnapshotsViewTheme = {
  appViewHeaderTool: AppViewHeaderToolTheme,
  appViewFilterTool: AppViewFilterToolTheme,
  photoGrid: PhotoGridTheme,
  gridActionIconColor: TEXT_COLORS.T01,
  gridTagsTheme: {
    textColor: BACKGROUND_COLORS.B29,
    borderColor: BACKGROUND_COLORS.B29,
    backgroundColor: BACKGROUND_COLORS.B01,
  },

  photoDetails: {
    headerBgColor: BACKGROUND_COLORS.B03,
    bodyBgColor: BACKGROUND_COLORS.B04,
    labelTitleColor: TEXT_COLORS.T03,
    labelTextColor: TEXT_COLORS.T02,
    linkTextColor: TEXT_COLORS.T04,
    zoomIconBgColor: addAlpha(BACKGROUND_COLORS.B21, 0.5),
    iconColor: TEXT_COLORS.T01,
    imageBorderColor: BACKGROUND_COLORS.B09,
    starColor: ICON_STAR_COLOR,
    starBorderColor: BACKGROUND_COLORS.B08,
    actionIconColor: TEXT_COLORS.T03,
    tagTheme: TagTheme,
  }
}

export const activityViewer = {
  textColor: 'yellow',
  slideBg: BACKGROUND_COLORS.B02,
  filmStripBg: BACKGROUND_COLORS.B21,
  controlsBg: BACKGROUND_COLORS.B04,
  controlsTextColor: TEXT_COLORS.T17,
  arrowsColor: TEXT_COLORS.T17,
  toolbarBackground: BACKGROUND_COLORS.B01,
  toolbarTextColor: TEXT_COLORS.T03,
  toolbarSelectColor: TEXT_COLORS.T17,
  infoTextColor: TEXT_COLORS.T03,
  infoTextHighlight: TEXT_COLORS.T02,
  infoBackground: BACKGROUND_COLORS.B08,
  dialogCloseBtnBg: addAlpha(BACKGROUND_COLORS.B21, 0.5),
  clickDot: {
    bgColor: addAlpha(BACKGROUND_COLORS.B22, 0.5),
    textColor: TEXT_COLORS.T01,
  },
  tabs: TabsTheme,
  appViewHeaderTool: AppViewHeaderToolTheme,
}
export const storyViewer = {
  viewerBackground: BACKGROUND_COLORS.B01,
  linkColor: TEXT_COLORS.T11,
  textColor: TEXT_COLORS.T02,
  urlPanelTitleColor: TEXT_COLORS.T02,
  urlPanelBackground: BACKGROUND_COLORS.B17,
  urlPanelContentBorder: '1px solid ' + TEXT_COLORS.T15,
  highlightColor: TEXT_COLORS.T09,
  slidePanelTitleColor: TEXT_COLORS.T02,
  slidePanelBackground: BACKGROUND_COLORS.B02,
  slidePanelContentBorder: '1px solid ' + TEXT_COLORS.T20,
  keyLoggerTitleColor: TEXT_COLORS.T01,
  keyLoggerPanelBackground: BACKGROUND_COLORS.B27,
  keyLoggerPanelContentBorder: '1px solid ' + TEXT_COLORS.T12,
  keyLoggerContextColor: TEXT_COLORS.T01,
  filmStripBg: BACKGROUND_COLORS.B21,
  controlsPanelBackground: BACKGROUND_COLORS.B02,
  controlsPanelTextColor: TEXT_COLORS.T17,
  controlsPanelDisabledTextColor: TEXT_COLORS.T03,
}

export const SummaryTheme = {
  textColor: TEXT_COLORS.T02,
  bgColor: TEXT_COLORS.T13,
  gridBgColor: TEXT_COLORS.T01,
  gridTopBorderColor: BACKGROUND_COLORS.B21,
  gridBorderColor: BACKGROUND_COLORS.B02,
  subTitleColor: TEXT_COLORS.T20,
  unreadProductsColor: BACKGROUND_COLORS.B21,
  readProductsColor: TEXT_COLORS.T20,
  sortItemColor: TEXT_COLORS.T17,
  statusBarHigh: BACKGROUND_COLORS.B23,
  statusBarMedium: BACKGROUND_COLORS.B21,
  statusBarLow: BACKGROUND_COLORS.B20,
  infoTitleBgColor: BACKGROUND_COLORS.B21,
  infoTitleTextColor: TEXT_COLORS.T01,
  contactInfoIconColor: TEXT_COLORS.T01,
  contactInfoViewColor: TEXT_COLORS.T17,
  contactInfoTimeColor: TEXT_COLORS.T20,
  contactInfoTitleColor: TEXT_COLORS.T02,
  contactStatusBarHoverColor: TEXT_COLORS.T20,
  gridShadow: 'rgba(23, 23, 23, 0.13)',
}

export const InformationTheme = {
  textColor: TEXT_COLORS.T02,
  activeTab: BACKGROUND_COLORS.B01,
  activeBorder: BACKGROUND_COLORS.B21,
}

const scTheme = {
  loginPage,
  header: headerTheme,
  globalNavBar,
  VGridRowRenderer,
  homepage: homepageTheme,
  timeline: TimeLine,
  notebook: Notebook,
  accounts,
  GridTheme,
  MenuIconTheme,
  contacts,
  CheckboxTheme,
  instantMessaging,
  ChatBubbleTheme,
  appSymbolColors,
  genericTextColors,
  circleNumberTheme,
  calls,
  GridGenericTheme,
  ListItemTheme,
  DefaultAvatar
}

export default scTheme
