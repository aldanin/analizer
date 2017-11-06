import * as types from './types';
import ProductionApi from './Production';
import { Contact } from 'common-interfaces/types/Contacts';
import { serverContactsDataMethodForTesting } from '../mockData/Contacts';
import { AgentData } from '../types/Agent'
import { OperationData } from '../types/Operation'
import { TargetData } from '../types/Target'
import { demoData as operationsDemoData } from '../mockData/Operation'
import { demoData as targetsDemoData } from '../mockData/Target'
import { getAgent } from '../mockData/Agent'
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

  public addProductMark(meta: types.ProductMeta, mark: string): Promise<any> {
    return Promise.resolve();
  }

  public deleteProductMark(meta: types.ProductMeta, mark: string): Promise<any> {
    return Promise.resolve();
  }

  public fetchContactProducts(meta: types.ProductMeta, query: types.ApiQueryParams): Promise<any> {
    return (getMockData(serverContactsDataMethodForTesting(query)) as Promise<Contact>);
  }

  public fetchProductsSummery(meta: types.ProductMeta): Promise<any> {
    return Promise.resolve(serverDemoSummary)

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
