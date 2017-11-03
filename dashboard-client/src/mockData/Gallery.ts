import { GalleryData } from 'common-interfaces/types/Gallery';
import * as API from '../api/types'

export const demoGalleryData = {
  photos: [
    {
      id: 1,
      name: '1',
      url: 'https://images3.alphacoders.com/112/thumb-1920-112487.jpg',
      date: 1489496646795,
      type: 'JPEG',
      width: 1920,
      height: 1080,
      orientation: 0,
      path: 'images/1.jpg',
      extracted: 1489496646795,
      tags: ['Image'],
      isFavorite: false,
      isRead: true,
    },
    {
      id: 2,
      name: '2',
      url: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSBsmXGwBX' +
      'qXWspw4-7PbKx8cQpIUrOzzXQmMWMVRBZyZrsROZCzQ',
      date: 1489496646795,
      type: 'JPEG',
      width: 400,
      height: 400,
      orientation: 0,
      path: 'images/2.png',
      extracted: 1489496646795,
      tags: ['2'],
      isFavorite: true,
      isRead: true,
    },
    {
      id: 3,
      name: '3',
      url: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9Gc' +
      'SnO_61Pe1UJiOtZ_OfLPh6g_Kmtip_AQhBGO-j9GGM91Il3Jye6w',
      date: 1489496646795,
      type: 'JPG',
      width: 400,
      height: 400,
      orientation: 0,
      path: 'images/3.jpg',
      extracted: 1489496646795,
      tags: [],
      isFavorite: false,
      isRead: false,
    },
    {
      id: 4,
      name: '4',
      url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCKNyJI' +
      'Pu5ZAfgVnWnAYU3pO5kao59f0PAo0EZHhkGJJceugSf',
      date: 1489496646795,
      type: 'JPG',
      width: 400,
      height: 400,
      orientation: 0,
      path: 'images/4.jpg',
      extracted: 1489496646795,
      tags: [],
      isFavorite: false,
      isRead: true,
    },
    {
      id: 5,
      name: '5',
      url: 'http://wallpaperpulse.com/img/262419.jpg',
      date: 1489496646795,
      type: 'JPG',
      width: 400,
      height: 400,
      orientation: 0,
      path: 'images/5.jpg',
      extracted: 1489496646795,
      tags: [],
      isFavorite: true,
      isRead: false,
    },
    {
      id: 6,
      name: '6',
      url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfMwCfRMVv' +
      'WXcPxtUz3fzT85qdJ_SJXZqcsJm0ycenzDL5tuQ_PA',
      date: 1489496646795,
      type: 'PNG',
      width: 400,
      height: 400,
      orientation: 0,
      path: 'images/6.png',
      extracted: 1489496646795,
      tags: [],
      isFavorite: true,
      isRead: false,
    },
    {
      id: 7,
      name: '7',
      url: 'http://www.pixelstalk.net/wp-content/uploads/2016/06/Jungle-Wallpaper-Backgrounds-HD.jpg',
      date: 1489496646795,
      type: 'PNG',
      width: 400,
      height: 400,
      orientation: 0,
      path: 'images/7.png',
      extracted: 1489496646795,
      tags: [],
      isFavorite: false,
      isRead: false,
    },
    {
      id: 8,
      name: '8',
      url: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcT3UlLc' +
      'Kko2uMVbvKsasp0F6AkVRaARiCbOS8Q1WV7SixvMvceMDQ',
      date: 1489496646795,
      type: 'PNG',
      width: 400,
      height: 400,
      orientation: 0,
      path: 'images/8.png',
      extracted: 1489496646795,
      tags: [],
      isFavorite: true,
      isRead: true,
    },
  ],
  timerIndicator: 1489496646795,
  updateTimeIndicator: 172800,
};

// tslint:disable
export const serverGalleryData: GalleryData[] = [{
  id: '5988887fcc87e87fe77d1fb4',
  tags: ['fooboooo'],
  isFavorite: true,
  isRead: false,
  width: '5312',
  height: '2988',
  path: '/storage/emulated/0/DCIM/Camera/20170726_105922.jpg',
  url: 'data:image/gif;base64,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',
  extracted: '2017-07-26 10:59:22.696',
  date: '2017-07-26 10:59:22.696',
  thumbnail: '5988887fcc87e87fe77d1fb2',
}];
// tslint:enable

const galleryServerPhotos = (Array(100).fill(0).map((e, i) => i + 1)).map(index => {
  const pic = Object.assign({}, serverGalleryData[0]);
  pic.id = pic.id + '_' + index;
  pic.thumbnail = pic.thumbnail + '_' + index;
  return pic
})

export const getServerGalleryMockData = (query: API.ApiQueryParams) => {
  return galleryServerPhotos.slice(query.skip, query.skip + query.limit);
}
