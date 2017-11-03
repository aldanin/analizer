import * as jwt from 'jsonwebtoken';
import * as config from 'config';

import {StringValidator, ObjectValidator} from '../lib/validators';

import Endpoint from './endpoint';

const ENDPOINT_IDENTIFIER = 'user-login';

class LoginEndpoint extends Endpoint implements WSFramework.Endpoint {
    constructor(logger: WSFramework.Logger) {
        super(logger);

        this.logger = logger;
    }

    protected _execute(request: any, response: any): Promise<object> {
        let requestBody = request.body;

        this.logger.audit('API REQUEST', `Login attempt with username: ${requestBody.username}`);

        return this.api.doLogin(requestBody.username, requestBody.password)
            .then((result) => {
                if (result.status.code < 0) {
                    throw new Error(result.status.msg);
                }

                this.logger.audit('API REQUEST', `Login successful for user with id: ${result.userinfo.id}`);

                let token = jwt.sign({sid: result.sid, userInfo: result.userinfo}, config.authSecret);

                response.status(200).send({sessionToken: token, userInfo: result.userinfo});
            })
            .catch((e) => {
                let error = `Login attempt failed for username: ${requestBody.username}. ${e}`;

                this.logger.audit('API REQUEST', error);

                // We want the error to propagate
                throw e;
            });
    }

    protected isProtected(): boolean {
        return true;
    }

    static isProtected(): boolean {
        return false;
    }

    static getIdentifier(): string {
        return ENDPOINT_IDENTIFIER;
    }

    static getRequestValidators() {
        return new ObjectValidator({
            username: new StringValidator(),
            password: new StringValidator()
        });
    }

    static getResponseValidators() {
        return new ObjectValidator({
            sessionToken: new StringValidator(),
            userInfo: new ObjectValidator({
                name: new StringValidator()
            })
        });
    }
}

export default LoginEndpoint;