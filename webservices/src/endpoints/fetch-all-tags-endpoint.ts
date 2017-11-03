import Endpoint from './endpoint';

import TagProduct from '../models/tag-product';

const ENDPOINT_IDENTIFIER = 'tags';

class FetchAllTagsEndpoint extends Endpoint implements WSFramework.Endpoint {
    constructor(logger: WSFramework.Logger) {
        super(logger);
    }

    protected _execute(request: any, response: any): Promise<object> {
        this.logger.audit('API REQUEST', `Attempting to fetch tags for user: ${request.user}`);

        return this.api.fetchAllTags()
          .get('producttags')
          .map(results => results.tagname)
          .then((result) => {
              this.logger.audit('API REQUEST', `Successfully fetched tags for user: ${request.user}`);

              response.status(200).send(result);
          })
          .catch((e) => {
              let error = `Failed to fetch tags with error. ${e}`;

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

export default FetchAllTagsEndpoint;