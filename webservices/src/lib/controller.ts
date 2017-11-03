import * as config from 'config';
import * as jwt from 'jsonwebtoken';

import ObjectValidator from './validators/object-validator';

const FIELD_ERROR = 'error';

const VALIDATION_PATH_ROOT = 'root';

const HTTP_STATUS_ERROR = 500;
const HTTP_STATUS_UNAUTHORIZED = 401;

class Controller implements WSFramework.Controller {
    private endpoint;
    private logger: WSFramework.Logger;

    constructor(endpoint: any, logger: WSFramework.Logger) {
        this.endpoint = endpoint;
        this.logger = logger;
    }

    public mount(): WSFramework.RequestHandler {
        this.logger.info('Controller', `Mounting ${this.endpoint.getIdentifier()} endpoint`);

        return this.endpointHandler.bind(this);
    }

    private endpointHandler(request: any, response: any, next: any): void {
        response.sendNative = response.send.bind(response);

        let errHandler = (e) => {
            let error = e;

            let httpStatus = HTTP_STATUS_ERROR;

            if (typeof e === 'object' && e.type === 'validationError') {
                error = 'Something went wrong';

                this.logger.error('Controller', `Internal error occurred: ${e.message}`);
            } else if (typeof e === 'object' && e.name === 'JsonWebTokenError') {
                error = e.message;
                httpStatus = HTTP_STATUS_UNAUTHORIZED;

                this.logger.error('Controller', `Internal error occurred: ${error}`);
            }

            error = error.response ? error.response.data : error.toString();

            response.status(httpStatus).sendNative(JSON.stringify({
                error: error
            }));
        };

        try {
            if (this.endpoint.isProtected()) {
                // Will throw error if invalid token is given
                let tokenPayload = jwt.verify(request.query.bearer || request.get('bearer'), config.authSecret);

                tokenPayload.toString = () => {
                    let user = tokenPayload.userInfo;

                    return `[UserId: ${user.id}, UserName: ${user.name}]`;
                };

                Object.defineProperty(request, 'user', {
                    value: tokenPayload
                });

                // Response is always a JSON object
                response.set('Content-Type', 'application/json');
            }

            request.body = this.validateRequestBody(request.body);

            let extendedResponse = this.extendResponseObject(response);

            new this.endpoint(this.logger).execute(request, extendedResponse, next).catch(errHandler);
        } catch (e) {
            errHandler(e);
        }
    }

    private validateRequestBody(requestBody: any): Object {
        let endpoint = this.endpoint;

        let requestValidators = new ObjectValidator({});

        if (endpoint.getRequestValidators()) {
            requestValidators = endpoint.getRequestValidators();
        }

        return requestValidators.validate(requestBody, VALIDATION_PATH_ROOT);
    }

    private extendResponseObject(response: any): any {
        let endpoint = this.endpoint;

        response.send = (responseBody: any) => {
            responseBody = responseBody || {};

            let responseValidator = endpoint.getResponseValidators();

            let validatedResponseBody = responseBody;

            // If there is an error we don't want to validate
            if (responseBody.hasOwnProperty(FIELD_ERROR)) {
                // Filter out all extra data and send error to the client
                return response.sendNative(JSON.stringify({[FIELD_ERROR]: responseBody[FIELD_ERROR]}));
            }

            if (responseValidator) {
                validatedResponseBody = responseValidator.validate(responseBody, VALIDATION_PATH_ROOT);
            }

            return response.sendNative(JSON.stringify(validatedResponseBody));
        };

        return response;
    }
}

export default Controller;