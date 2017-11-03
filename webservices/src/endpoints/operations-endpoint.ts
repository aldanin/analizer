import Endpoint from './endpoint';

const ENDPOINT_IDENTIFIER = 'operations';

class OperationsEndpoint extends Endpoint implements WSFramework.Endpoint {
    constructor(logger: WSFramework.Logger) {
        super(logger);
    }

    protected _execute(request: any, response: any): Promise<object> {
        this.logger.audit('API REQUEST', `Attempting to fetch operations for user: ${request.user}`);

        return this.api.fetchOperations()
            .then((operations) => {
                this.logger.audit('API REQUEST', `Successfully fetched operations`);

                response.status(200).send(operations.map((operation) => ({
                    id: operation.id,
                    name: operation.name
                })));
            })
            .catch((e) => {
                let error = `Failed to fetch operations with error. ${e}`;

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

export default OperationsEndpoint;