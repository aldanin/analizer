import Endpoint from './endpoint';

import ContactProduct from '../models/contact-product';

const ENDPOINT_IDENTIFIER = 'contacts';

class ContactsEndpoint extends Endpoint implements WSFramework.Endpoint {
    constructor(logger: WSFramework.Logger) {
        super(logger);
    }

    protected _execute(request: any, response: any): Promise<object> {
        this.logger.audit('API REQUEST', `Attempting to fetch contact products for user: ${request.user}`);

        let meta = {agentId: request.params.resourceId};

        let pagination = {
            limit: request.query.limit || 50,
            skip: request.query.skip || 0
        };

        return this.api.fetchContactProducts(meta, pagination)
            .map((contact) => ContactProduct.fromData(contact))
            .then((result) => {
                this.logger.audit('API REQUEST', `Successfully fetched contact products for user: ${request.user}`);

                response.status(200).send(result);
            })
            .catch((e) => {
                let error = `Failed to fetch contact products with error. ${e}`;

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

export default ContactsEndpoint;