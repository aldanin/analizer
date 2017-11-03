import Endpoint from './endpoint';

const ENDPOINT_IDENTIFIER = 'targets';

class TargetsEndpoint extends Endpoint implements WSFramework.Endpoint {
    constructor(logger: WSFramework.Logger) {
        super(logger);
    }

    protected _execute(request: any, response: any): Promise<object> {
        this.logger.audit('API REQUEST', `Attempting to fetch targets for user: ${request.user}`);

        return this.api.fetchTargets()
            .then((targets) => {
                this.logger.audit('API REQUEST', `Successfully fetched targets`);

                response.status(200).send(targets.map((targetData) => ({
                    id: targetData.id,
                    name: targetData.name,
                    operationId: targetData.Operations_id
                })));
            })
            .catch((e) => {
                let error = `Failed to fetch targets with error. ${e}`;

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

export default TargetsEndpoint;