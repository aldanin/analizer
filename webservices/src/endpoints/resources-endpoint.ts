import Endpoint from './endpoint';

const ENDPOINT_IDENTIFIER = 'resources';

class ResourcesEndpoint extends Endpoint implements WSFramework.Endpoint {
    constructor(logger: WSFramework.Logger) {
        super(logger);
    }

    protected _execute(request: any, response: any): Promise<object> {
        this.logger.audit('API REQUEST', `Attempting to fetch resources for user: ${request.user}`);

        return this.api.fetchResources()
            .then((resources) => {
                this.logger.audit('API REQUEST', `Successfully fetched resources for user: ${request.user}`);

                response.status(200).send(resources);
            })
            .catch((e) => {
                let error = `Failed to fetch resources with error. ${e}`;

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

export default ResourcesEndpoint;