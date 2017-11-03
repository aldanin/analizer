import Endpoint from './endpoint';

import EmailProduct from '../models/email-product';

const ENDPOINT_IDENTIFIER = 'emails';

class EmailEndpoint extends Endpoint implements WSFramework.Endpoint {
    constructor(logger: WSFramework.Logger) {
        super(logger);
    }

    protected _execute(request: any, response: any): Promise<object> {
        this.logger.audit('API REQUEST', `Attempting to fetch email products for user: ${request.user}`);

        let meta = {agentId: request.params.resourceId};

        let pagination = {
            limit: request.query.limit || 10,
            skip: request.query.skip || 0
        };

        return this.api.fetchEmailProducts(meta, pagination)
            .map((thread) => {
                let participants = thread.participants.reduce((reduced, participant) => {
                    reduced[participant._id] = participant;

                    return reduced;
                }, {});

                return thread.emails.map((email) => EmailProduct.fromData(email, thread.app_name, participants));
            })
            .then((result) => {
                this.logger.audit('API REQUEST', `Successfully fetched email products for user: ${request.user}`);

                response.status(200).send(result);
            })
            .catch((e) => {
                let error = `Failed to fetch email products with error. ${e}`;

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