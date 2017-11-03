import * as Promise from 'bluebird';

import RSApi from '../api';

class Endpoint {
    protected logger: WSFramework.Logger;
    protected api: any;

    constructor(logger: WSFramework.Logger) {
        this.logger = logger;
    }

    execute(request: any, response: any): Promise<object> {
        this.api = new RSApi();

        if(this.isProtected() && request.user) {
            this.api.setSessionToken(request.user.sid);
        }

        return this._execute(request, response);
    }

    protected _execute(request: any, response: any) {
        return new Promise.reject('_execute is not implemented');
    }

    protected isProtected() {
        return false;
    }
}

export default Endpoint;