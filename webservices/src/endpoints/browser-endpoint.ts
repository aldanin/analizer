import Endpoint from './endpoint';

import BrowserProduct from '../models/browser-product';

const ENDPOINT_IDENTIFIER = 'browser';

class EmailEndpoint extends Endpoint implements WSFramework.Endpoint {
    constructor(logger: WSFramework.Logger) {
        super(logger);
    }

    protected _execute(request: any, response: any): Promise<object> {
        this.logger.audit('API REQUEST', `Attempting to fetch browser products for user: ${request.user}`);

        let meta = {agentId: request.params.resourceId};

        let pagination = {
            limit: request.query.limit || 50,
            skip: request.query.skip || 0
        };

        let reqHandler = this.api.fetchBrowserHistoryProducts.bind(this.api);

        if (request.params.type === 'bookmarks') {
            reqHandler = this.api.fetchBrowserBookmarkProducts.bind(this.api);
        }

        return reqHandler(meta, pagination)
            .map((browserProduct) => BrowserProduct.fromData(browserProduct))
            .then((browser) => {
                this.logger.audit('API REQUEST', `Successfully fetched browser products for user: ${request.user}`);

                response.status(200).send(browser);
            })
            .catch((e) => {
                let error = `Failed to fetch browser products with error. ${e}`;

                this.logger.audit('API REQUEST', error);

                // We want the error to propagate
                throw e;
            });
    }

    protected isProtected(): boolean {
        return true;
    }

    static getIdentifier() {
        return ENDPOINT_IDENTIFIER;
    }

    static isProtected() {
        return true;
    }

    static getRequestValidators() {
        return null;
    }

    static getResponseValidators() {
        return null;
    }
}

export default EmailEndpoint;