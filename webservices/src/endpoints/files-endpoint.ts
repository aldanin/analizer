import Endpoint from './endpoint';

const ENDPOINT_IDENTIFIER = 'file';

class EmailEndpoint extends Endpoint implements WSFramework.Endpoint {
    constructor(logger: WSFramework.Logger) {
        super(logger);
    }

    protected _execute(request: any, response: any): Promise<object> {
        this.logger.audit('API REQUEST', `Attempting to fetch file products for user: ${request.user}`);

        let meta = {agentId: request.params.resourceId};

        return this.api.fetchFile(meta, request.params.objectId)
            .then((file) => {
                this.logger.audit('API REQUEST', `Successfully fetched file products for user: ${request.user}`);

                response.set('Content-Type', 'application/octet-stream').status(200).send(file);
            })
            .catch((e) => {
                let error = `Failed to fetch file products with error. ${e}`;

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