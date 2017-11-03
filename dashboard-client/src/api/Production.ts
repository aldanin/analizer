import * as qs from 'querystring';
import axios from 'axios';
import { AxiosPromise } from 'axios'
import * as Promise from 'bluebird';

import config from '../config';

import { getSessionData } from '../helpers/SessionToken';

import * as types from './types';

class ProductionApi {
  private apiAddress: string;
  private sessionToken: string;

  static getApiAddress() {
    return config.webservices.address;
  }

  constructor() {
    this.apiAddress = ProductionApi.getApiAddress();

    this.sessionToken = getSessionData() ? getSessionData() : null;
  }

  public setSessionToken(sessionToken: string) {
    this.sessionToken = sessionToken;
  }

  public doLogin(username: string, password: string): Promise<AxiosPromise> {
    let uri = this.generateApiURI('user/login');

    let request = Promise.resolve(this.post(uri, {username: username, password: password}));

    return request.then((result) => result.data).catch((e) => {
      throw new Error(e.response.data.error);
    });
  }

  public doLogout(): Promise<AxiosPromise> {
    let uri = this.generateApiURI('logout');

    return Promise.resolve(this.post(uri, {})).then((result) => result.data);
  }

  public fetchOperations(): AxiosPromise {
    let uri = this.generateApiURI('management/operations');

    return Promise.resolve(this.get(uri)).then((result) => result.data);
  }

  public fetchTargets(): AxiosPromise {
    let uri = this.generateApiURI('management/targets');

    return Promise.resolve(this.get(uri)).then((result) => result.data);
  }

  public fetchResources(): AxiosPromise {
    let uri = this.generateApiURI('management/resources');

    return Promise.resolve(this.get(uri)).then((result) => result.data);
  }

  public fetchAgents(): AxiosPromise {
    let uri = this.generateApiURI('management/agents');
    return this.get(uri).then((result) => Promise.resolve(result.data));

    // return Promise.resolve(this.get(uri)).then((result) => result.data);
  }

  public fetchIMProducts(meta: types.ProductMeta, query: types.ApiQueryParams): AxiosPromise {
    let uri = this.generateApiURI(`appdata/${meta.agentId}/im`, query);

    return this.get(uri).then((result) => result.data);
  }

  public fetchEmailProducts(meta: types.ProductMeta): AxiosPromise {
    let uri = this.generateApiURI(`appdata/${meta.agentId}/emails`);

    return Promise.resolve(this.get(uri)).then((result) => result.data);
  }

  public fetchBrowserHistoryProducts(meta: types.ProductMeta, query: types.ApiQueryParams): AxiosPromise {
    let uri = this.generateApiURI(`appdata/${meta.agentId}/browser/history`, query);

    return Promise.resolve(this.get(uri)).then((result) => result.data);
  }

  public fetchBrowserBookmarkProducts(meta: types.ProductMeta): AxiosPromise {
    let uri = this.generateApiURI(`appdata/${meta.agentId}/browser/bookmarks`);

    return Promise.resolve(this.get(uri)).then((result) => result.data);
  }

  public fetchContactProducts(meta: types.ProductMeta, query: types.ApiQueryParams): AxiosPromise {
    let uri = this.generateApiURI(`appdata/${meta.agentId}/contacts`, query);

    return Promise.resolve(this.get(uri)).then((result) => result.data);
  }

  public fetchLocationProducts(meta: types.ProductMeta, query: types.ApiQueryParams): AxiosPromise {
    let uri = this.generateApiURI(`appdata/${meta.agentId}/locations`, query);

    return Promise.resolve(this.get(uri)).then((result) => result.data);
  }

  public fetchGalleryProducts(meta: types.ProductMeta, query: types.ApiQueryParams): AxiosPromise {
    let uri = this.generateApiURI(`appdata/${meta.agentId}/images/gallery`, query);

    return Promise.resolve(this.get(uri)).then((result) => result.data);
  }

  public fetchSnapshotsProducts(meta: types.ProductMeta, query: types.ApiQueryParams): AxiosPromise {
    let uri = this.generateApiURI(`appdata/${meta.agentId}/images/snapshots`, query);

    return Promise.resolve(this.get(uri)).then((result) => result.data);
  }

  public fetchProductsSummery(meta: types.ProductMeta): AxiosPromise {
    let uri = this.generateApiURI(`appdata/${meta.agentId}/summery`);

    return Promise.resolve(this.get(uri)).then((result) => result.data);
  }

  public fetchFile(meta: types.ProductMeta, objId: string): AxiosPromise {
    let uri = this.generateApiURI(`${meta.agentId}/files/${objId}`);

    return Promise.resolve(this.get(uri)).then((result) => result.data);
  }

  public fetchAllTags(): AxiosPromise {
    let uri = this.generateApiURI(`tags`);

    return Promise.resolve(this.get(uri)).then((result) => result.data);
  }

  public fetchProductTags(meta: types.ProductMeta): AxiosPromise {
    let uri = this.generateApiURI(`tags/${meta.agentId}/${meta.productType}/${meta.productId}`);

    return Promise.resolve(this.get(uri)).then((result) => result.data[`producttags${meta.productType}`]);
  }

  public addProductTag(meta: types.ProductMeta, tag: string): AxiosPromise {
    let uri = this.generateApiURI(`tags/${meta.agentId}/${meta.productType}/${meta.productId}/${tag}`);

    return Promise.resolve(this.post(uri)).then((result) => result.data);
  }

  public deleteProductTag(meta: types.ProductMeta, tagId: string): AxiosPromise {
    let uri = this.generateApiURI(`tags/${meta.agentId}/${meta.productType}/${meta.productId}/${tagId}`);

    return Promise.resolve(this.delete(uri)).then((result) => result.data);
  }

  public fetchProductMark(meta: types.ProductMeta, mark?: string): AxiosPromise {
    let uri = this.generateApiURI(`marker/${meta.agentId}/${meta.productType}/${meta.productId}/${mark}`);

    return Promise.resolve(this.get(uri)).then((result) => result.data);
  }

  public addProductMark(meta: types.ProductMeta, mark: string): AxiosPromise {
    let query = {markvalue: 'true'};

    let uri = this.generateApiURI(`marker/${meta.agentId}/${meta.productType}/${meta.productId}/${mark}`, query);

    return Promise.resolve(this.post(uri)).then((result) => result.data);
  }

  public deleteProductMark(meta: types.ProductMeta, mark: string): AxiosPromise {
    let uri = this.generateApiURI(`marker/${meta.agentId}/${meta.productType}/${meta.productId}/${mark}`);

    return Promise.resolve(this.delete(uri)).then((result) => result.data);
  }

  public generateApiURI(endpoint: string,
                        query?: types.BrowserApiQuery |
                          types.ImageApiQuery |
                          types.TagsApiQuery |
                          types.MarksApiQuery |
                          types.LoginApiQuery |
                          types.IMApiQuery) {
    query = query || {};

    return `${this.apiAddress}/${endpoint}?${qs.stringify(query)}`;
  }

  private delete(uri: string) {
    let headers = this.sessionToken ? {bearer: this.sessionToken} : null;

    return (<any> axios)({method: 'DELETE', url: uri, headers, json: true});
  }

  private post(uri: string, data?: object) {
    let headers = this.sessionToken ? {bearer: this.sessionToken} : null;

    return (<any> axios)({method: 'POST', url: uri, data: data, headers, json: true});
  }

  private get(uri: string) {
    let headers = this.sessionToken ? {bearer: this.sessionToken} : null;

    return (<any> axios)({method: 'GET', url: uri, headers: headers, json: true});
  }
}

export default ProductionApi;
