import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { GalleryWidgetProps, Gallery } from './GalleryAppViewer'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import * as injectTapEventPlugin from 'react-tap-event-plugin';
import { demoGalleryData } from '../mockData/Gallery';
injectTapEventPlugin();

it('renders without crashing', () => {
  const div = document.createElement('div');
  const props: GalleryWidgetProps = {
    keyword: '',
    galleryData: {
      photos: demoGalleryData.photos,
      timerIndicator: 1489496646795,
      updateTimeIndicator: 432000,
      filter: 'DateAsc',
    },
    isFetching: false,
    isFirstRequest: false,
    isError: false,
    loadGallery: () => null,
    setStar: () => null,
    addTag: () => null,
    removeTag: () => null,
    sort: () => null,
    imageOption: () => null,
    show: () => null,
    tags: () => null,
    requestGalleryUpdate: () => null,
    extractNow: () => null,
    params: {},
    getFullSizeImage: () => null,
    setUnRead: () => null,
    setRead: () => null,
    addToNotebook: () => null,
    askForTranslate: () => null,
    askForTranscript: () => null,
    exportItem: () => null,
    selectItem: () => null,
    isFirstLoading: false,
  };
  ReactDOM.render(
    <MuiThemeProvider>
      <Gallery
        galleryData={props.galleryData}
        isFetching={props.isFetching}
        isFirstRequest={props.isFirstRequest}
        isError={props.isError}
        loadGallery={props.loadGallery}
        setStar={props.setStar}
        addTag={props.addTag}
        removeTag={props.removeTag}
        sort={props.sort}
        imageOption={props.imageOption}
        show={props.show}
        tags={props.tags}
        requestGalleryUpdate={props.requestGalleryUpdate}
        extractNow={props.extractNow}
        params={props.params}
        getFullSizeImage={props.getFullSizeImage}
        setUnRead={props.setUnRead}
        setRead={props.setRead}
        addToNotebook={props.addToNotebook}
        askForTranslate={props.askForTranslate}
        askForTranscript={props.askForTranscript}
        exportItem={props.exportItem}
        keyword={props.keyword}
        selectItem={props.selectItem}
        isFirstLoading={props.isFirstLoading}
      />
    </MuiThemeProvider>,
    div);
});
