import Endpoint from './endpoint';

const ENDPOINT_IDENTIFIER = 'user-logout';

class LogoutEndpoint extends Endpoint implements WSFramework.Endpoint {
    constructor(logger: WSFramework.Logger) {
        super(logger);
    }

    protected _execute(request: any, response: any): Promise<object> {
        this.logger.audit('API REQUEST', `User ${request.user.userInfo.id} has requested to log out`);

        return this.api.doLogout().then(() => {
            this.logger.audit('API REQUEST', `Logout successful for user with id: ${request.user.userInfo.id}`);

            response.status(200).send();
        }).catch((e) => {
            let error = `Logout attempt failed for username: ${request.user.userInfo.id}. ${e}`;

            this.logger.audit('API REQUEST', error);

            // We want the error to propagate
            throw e;
        });
    }

    protected isProtected(): boolean {
        return true;
    }

    static getIdentifier(): string {
        return ENDPOINT_IDENTIFIER;
    }

    static isProtected(): boolean {
        return true;
    }

    static getRequestValidators(): void {
        return null;
    }

    static getResponseValidators(): void {
        return null;
    }
}

export default LogoutEndpoint;