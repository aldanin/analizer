import * as qs from 'querystring';

import axios from 'axios';
import * as config from 'config';
import * as Promise from 'bluebird';

import { AxiosPromise } from 'axios';

interface ApiQueryParams {
    sid?: string
    skip?: number
    limit?: number
}

interface BrowserApiQuery extends ApiQueryParams {
    url_type?: number
}

interface ImageApiQuery extends ApiQueryParams {
    image_category?: string
}

interface TagsApiQuery extends ApiQueryParams {
    tagtoadd?: string
    tagtodelete?: string
}

interface MarksApiQuery extends ApiQueryParams {
    markvalue?: string
}

interface ProductMeta extends ApiQueryParams {
    agentId: string
    productId?: string
    productType?: string

}

interface LoginApiQuery extends ApiQueryParams {
    username: string
    password: string
}

class ProductionApi {
    private apiAddress: string;
    private sessionToken: string;

    constructor(sessionToken?: string) {
        this.apiAddress = config.api.address;

        this.sessionToken = sessionToken;
    }

    public setSessionToken(sessionToken: string) {
        this.sessionToken = sessionToken;
    }

    public doLogin(username: string, password: string): Promise<AxiosPromise> {
        let uri = this.generateApiURI('login', {
            username: username,
            password: password
        });

        return Promise.resolve(axios.post(uri)).then((result) => result.data);
    }

    public doLogout(): Promise<AxiosPromise> {
        let uri = this.generateApiURI('logout');

        return axios.post(uri, {}).then((result) => result.data);
    }

    public fetchOperations(): Promise<AxiosPromise> {
        let uri = this.generateApiURI('operations');

        return axios.get(uri).then((result) => result.data.operations);
    }

    public fetchTargets(): Promise<AxiosPromise> {
        let uri = this.generateApiURI('targets');

        return axios.get(uri).then((result) => result.data.targets);
    }

    public fetchCollectors(): Promise<AxiosPromise> {
        let uri = this.generateApiURI('collectors');

        return axios.get(uri).then((result) => result.data.collectors);
    }

    public fetchResources(): Promise<AxiosPromise> {
        let uri = this.generateApiURI('resources');

        return axios.get(uri).then((result) => result.data.resources);
    }

    public fetchAgents(): Promise<AxiosPromise> {
        let uri = this.generateApiURI('agents');

        return axios.get(uri).then((result) => result.data.agents);
    }

    public fetchIMProducts(meta: ProductMeta, query: ApiQueryParams): Promise<AxiosPromise> {

        let uri = this.generateApiURI(`${meta.agentId}/chatconversations`, query);

        return Promise.resolve(axios.get(uri)).then((result) => result.data, query);
    }

    public fetchEmailProducts(meta: ProductMeta, query: ApiQueryParams): Promise<AxiosPromise> {

        let uri = this.generateApiURI(`${meta.agentId}/emailthreads`, query);

        return Promise.resolve(axios.get(uri)).then((result) => result.data.emailthreads);
    }

    public fetchBrowserHistoryProducts(meta: ProductMeta, query: BrowserApiQuery): Promise<AxiosPromise> {
        const updatedQuery = Object.assign({url_type: 0}, query);

        let uri = this.generateApiURI(`${meta.agentId}/browser`, updatedQuery);

        return Promise.resolve(axios.get(uri)).then((result) => result.data.browser_history);
    }

    public fetchBrowserBookmarkProducts(meta: ProductMeta): Promise<AxiosPromise> {
        let query: BrowserApiQuery = {
            url_type: 1,
            limit: 500,
            skip: 0
        };

        let uri = this.generateApiURI(`${meta.agentId}/browser`, query);

        return Promise.resolve(axios.get(uri)).then((result) => result.data.browser_bookmarks);
    }

    public fetchContactProducts(meta: ProductMeta, query: ApiQueryParams): Promise<AxiosPromise> {

        let uri = this.generateApiURI(`${meta.agentId}/contacts`, query);

        return Promise.resolve(axios.get(uri)).then((result) => result.data.contacts);
    }

    public fetchLocationProducts(meta: ProductMeta, query: ApiQueryParams): Promise<AxiosPromise> {

        let uri = this.generateApiURI(`${meta.agentId}/maplocations`, query);

        return Promise.resolve(axios.get(uri)).then((result) => result.data.maplocations);
    }

    public fetchGalleryProducts(meta: ProductMeta, query: ImageApiQuery): Promise<AxiosPromise> {
        const updatedQuery = Object.assign({image_category: 'gallery'}, query);

        let uri = this.generateApiURI(`${meta.agentId}/images`, updatedQuery);

        return Promise.resolve(axios.get(uri)).then((result) => result.data.gallery);
    }

    public fetchSnapshotsProducts(meta: ProductMeta, query: ImageApiQuery): Promise<AxiosPromise> {
        const updatedQuery = Object.assign({image_category: 'snapshots'}, query);

        let uri = this.generateApiURI(`${meta.agentId}/images`, updatedQuery);

        return Promise.resolve(axios.get(uri)).then((result) => result.data.snapshots);
    }

    public fetchProductsSummery(meta: ProductMeta): Promise<AxiosPromise> {
        let uri = this.generateApiURI(`${meta.agentId}/endpoint_summary`);

        return Promise.resolve(axios.get(uri)).then((result) => result.data.unread_products);
    }

    public fetchFile(meta: ProductMeta, objId: string): Promise<AxiosPromise> {
        let uri = this.generateApiURI(`${meta.agentId}/files/${objId}`);

        let request = axios({
            method: 'GET',
            url: uri,
            responseType: 'arraybuffer'
        });

        return Promise.resolve(request).then((result) => Buffer.from(result.data));
    }

    public fetchAllTags(): Promise<AxiosPromise> {
        let uri = this.generateApiURI(`producttags`);

        return Promise.resolve(axios.get(uri)).then((result) => result.data);
    }

    public fetchProductTags(meta: ProductMeta): Promise<AxiosPromise> {
        let uri = this.generateApiURI(`${meta.agentId}/${meta.productType}/${meta.productId}/tags`);

        return Promise.resolve(axios.get(uri)).then((result) => result.data[`producttags${meta.productType}`]);
    }

    public addProductTag(meta: ProductMeta, tag: string): Promise<AxiosPromise> {
        let query = {tagtoadd: tag};
        let uri = this.generateApiURI(`${meta.agentId}/${meta.productType}/${meta.productId}/tags`, query);

        return Promise.resolve(axios.post(uri)).then((result) => result.data);
    }

    public deleteProductTag(meta: ProductMeta, tagId: string): Promise<AxiosPromise> {
        let query = {tagtodelete: tagId};
        let uri = this.generateApiURI(`${meta.agentId}/${meta.productType}/${meta.productId}/tags`, query);

        return Promise.resolve(axios.delete(uri)).then((result) => result.data);
    }

    public fetchProductMark(meta: ProductMeta, mark?: string): Promise<AxiosPromise> {
        let uri = this.generateApiURI(`${meta.agentId}/${meta.productType}/${meta.productId}/marks/${mark}`);

        return Promise.resolve(axios.get(uri)).then((result) => result.data);
    }

    public addProductMark(meta: ProductMeta, mark: string): Promise<AxiosPromise> {
        let query = {markvalue: 'true'};

        let uri = this.generateApiURI(`${meta.agentId}/${meta.productType}/${meta.productId}/marks/${mark}`, query);

        return Promise.resolve(axios.post(uri)).then((result) => result.data);
    }

    public deleteProductMark(meta: ProductMeta, mark: string): Promise<AxiosPromise> {
        let uri = this.generateApiURI(`${meta.agentId}/${meta.productType}/${meta.productId}/marks/${mark}`);

        return Promise.resolve(axios.delete(uri)).then((result) => result.data);
    }

    public generateApiURI(endpoint: string,
                          query?: BrowserApiQuery | ImageApiQuery | TagsApiQuery | MarksApiQuery | LoginApiQuery) {
        query = query || {};

        if (this.sessionToken) {
            query.sid = this.sessionToken;
        }

        return `${this.apiAddress}/${endpoint}?${qs.stringify(query)}`;
    }
}

export default ProductionApi;