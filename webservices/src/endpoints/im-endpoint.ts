import Endpoint from './endpoint';

import IMProduct from '../models/im-product';

const ENDPOINT_IDENTIFIER = 'instant-messaging';

class IMEndpoint extends Endpoint implements WSFramework.Endpoint {
    constructor(logger: WSFramework.Logger) {
        super(logger);
    }

    protected _execute(request: any, response: any): Promise<object> {
        this.logger.audit('API REQUEST', `Attempting to fetch IM products for user: ${request.user}`);
        let meta = {agentId: request.params.resourceId};

        let pagination = {
            limit: request.query.limit || 25,
            skip: request.query.skip || 0
        };

        return this.api.fetchIMProducts(meta, pagination)
            .then((resources) => {
                this.logger.audit('API REQUEST', `Successfully fetched IM products for user: ${request.user}`);

                const result = IMProduct.fromData(resources)

                response.status(200).send(result);
            })
            .catch((e) => {
                let error = `Failed to fetch IM products with error. ${e}`;

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

export default IMEndpoint;