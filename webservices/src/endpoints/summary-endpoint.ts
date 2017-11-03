import Endpoint from './endpoint';

import Summery from '../models/summery';

const ENDPOINT_IDENTIFIER = 'summery';

class SummeryEndpoint extends Endpoint implements WSFramework.Endpoint {
    constructor(logger: WSFramework.Logger) {
        super(logger);
    }

    protected _execute(request: any, response: any): Promise<object> {
        this.logger.audit('API REQUEST', `Attempting to fetch summery products for user: ${request.user}`);

        let meta = {agentId: request.params.resourceId};

        return this.api.fetchProductsSummery(meta)
            .then((summery) => Summery.fromData(summery))
            .then((result) => {
                this.logger.audit('API REQUEST', `Successfully fetched summery products for user: ${request.user}`);

                response.status(200).send(result);
            })
            .catch((e) => {
                let error = `Failed to fetch summery products with error. ${e}`;

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

export default SummeryEndpoint;