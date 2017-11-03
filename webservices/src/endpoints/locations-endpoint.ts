import Endpoint from './endpoint';

import LocationProduct from '../models/location-product';

const ENDPOINT_IDENTIFIER = 'location';

class LocationEndpoint extends Endpoint implements WSFramework.Endpoint {
    constructor(logger: WSFramework.Logger) {
        super(logger);
    }

    protected _execute(request: any, response: any): Promise<object> {
        this.logger.audit('API REQUEST', `Attempting to fetch location products for user: ${request.user}`);

        let meta = {agentId: request.params.resourceId};

        let pagination = {
            limit: request.query.limit || 10,
            skip: request.query.skip || 0
        };

        return this.api.fetchLocationProducts(meta)
            .map((locationProduct) => LocationProduct.fromData(locationProduct))
            .then((result) => {
                this.logger.audit('API REQUEST', `Successfully fetched location products for user: ${request.user}`);

                response.status(200).send(result);
            })
            .catch((e) => {
                let error = `Failed to fetch location products with error. ${e}`;

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

export default LocationEndpoint;