import * as types from './types';
import ProductionApi from './Production';
import { Contact } from 'common-interfaces/types/Contacts';
import { serverContactsDataMethodForTesting } from '../mockData/Contacts';
import { AgentData } from '../types/Agent'
import { OperationData } from '../types/Operation'
import { TargetData } from '../types/Target'
import { MailData } from 'common-interfaces/types/Mail';
import { GalleryData } from 'common-interfaces/types/Gallery';
import { SnapshotsData } from 'common-interfaces/types/Snapshots';
import { BookmarkData, HistoryData } from 'common-interfaces/types/Browser';
import { Location } from 'common-interfaces/types/Location';
import { getServerGalleryMockData } from '../mockData/Gallery';
import { getServerSnapshotsMockData } from '../mockData/Snapshots';
import { serverMailData } from '../mockData/Mail';
import { demoData as operationsDemoData } from '../mockData/Operation'
import { demoData as targetsDemoData } from '../mockData/Target'
import { getServerHistoryMockData, serverBookmarks } from '../mockData/Browser';
import { getServerLocationMockData } from '../mockData/Location';
import { getAgent } from '../mockData/Agent'
import { demoTagData } from '../mockData/Tags';
import { Conversations } from 'common-interfaces/types/InstantMessaging'
import { createIMMockDataFromRealSource } from '../mockData/InstantMessaging'
import { serverDemoSummary } from '../mockData/Summary'

class MockApi implements Partial<ProductionApi> {
  private sessionToken: string;

  public setSessionToken(sessionToken: string) {
    this.sessionToken = sessionToken;
  }

  public doLogin(username: string, password: string): Promise<any> {
    return new Promise((resolve, reject) => {
      if (username === 'admin' && password === 'service') {
        resolve({
          id_token: 'abcdefg-123456',
          user_info: {
            name: 'Chcuk Norris 2nd',
          },
        })
      } else {
        reject(new Error('Bad credentials'))
      }
    })
  }

  public doLogout(): Promise<any> {
    return Promise.resolve();
  }

  fetchAgents(): Promise<any> {
    const demoData = [
      getAgent('1'),
      getAgent('2'),
      getAgent('2'),
      getAgent('3'),
      getAgent('3'),
    ];
    return (getMockData(demoData) as Promise<AgentData[]>);
  }

  public fetchOperations(): Promise<any> {
    return (getMockData(operationsDemoData) as Promise<OperationData[]>);
  }

  public fetchTargets(): Promise<any> {
    return (getMockData(targetsDemoData) as Promise<TargetData[]>);
  }

  fetchGalleryProducts(meta: types.ProductMeta, query: types.ApiQueryParams): Promise<any> {
    return (getMockData(getServerGalleryMockData(query)) as Promise<GalleryData>);
  }

  fetchSnapshotsProducts(meta: types.ProductMeta, query: types.ApiQueryParams): Promise<any> {
    return (getMockData(getServerSnapshotsMockData(query)) as Promise<SnapshotsData>);
  }

  fetchEmailProducts(meta: types.ProductMeta): Promise<any> {
    return (getMockData(serverMailData) as Promise<MailData>);
  }

  public fetchBrowserHistoryProducts(meta: types.ProductMeta, query: types.ApiQueryParams): Promise<any> {
    return (getMockData(getServerHistoryMockData(query)) as Promise<HistoryData>);
  }

  public fetchBrowserBookmarkProducts(meta: types.ProductMeta): Promise<any> {
    return (getMockData(serverBookmarks) as Promise<BookmarkData>);
  }

  public addProductTag(meta: types.ProductMeta, tag: string): Promise<any> {
    return Promise.resolve();
  }

  public deleteProductTag(meta: types.ProductMeta, tagId: string): Promise<any> {
    return Promise.resolve();
  }

  public addProductMark(meta: types.ProductMeta, mark: string): Promise<any> {
    return Promise.resolve();
  }

  public deleteProductMark(meta: types.ProductMeta, mark: string): Promise<any> {
    return Promise.resolve();
  }

  public fetchLocationProducts(meta: types.ProductMeta, query: types.ApiQueryParams): Promise<any> {
    return (getMockData(getServerLocationMockData(query)) as Promise<Location>);
  }

  public fetchContactProducts(meta: types.ProductMeta, query: types.ApiQueryParams): Promise<any> {
    return (getMockData(serverContactsDataMethodForTesting(query)) as Promise<Contact>);
  }

  public fetchProductsSummery(meta: types.ProductMeta): Promise<any> {
    return Promise.resolve(serverDemoSummary)

  }

  public fetchAllTags(): Promise<any> {
    return Promise.resolve(demoTagData);
  }

  public fetchIMProducts(meta: types.ProductMeta, query: types.ApiQueryParams): Promise<any> {
    return (getMockData(createIMMockDataFromRealSource(query)) as Promise<Conversations>);
  }
}

function getMockData(data: any) {
  return new Promise((resolve, reject) => {
    setTimeout(
      () => {
        resolve(data)
      },
      500)
  })
}

export default MockApi;
