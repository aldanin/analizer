import Endpoint from './endpoint';

import TagProduct from '../models/tag-product';

const ENDPOINT_IDENTIFIER = 'tags';

class TagEndpoint extends Endpoint implements WSFramework.Endpoint {
    constructor(logger: WSFramework.Logger) {
        super(logger);
    }

    protected _execute(request: any, response: any): Promise<object> {
        this.logger.audit('API REQUEST', `Attempting to fetch tags for user: ${request.user}`);

        let meta = {
            agentId: request.params.resourceId,
            productType: request.params.productType,
            productId: request.params.productId
        };

        return this.api.fetchProductTags(meta)
            .map((tagProduct) => TagProduct.fromData(tagProduct))
            .then((result) => {
                this.logger.audit('API REQUEST', `Successfully fetched tags for user: ${request.user}`);

                response.status(200).send(result[0]);
            })
            .catch((e) => {
                let error = `Failed to fetch tags with error. ${e}`;

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

export default TagEndpoint;