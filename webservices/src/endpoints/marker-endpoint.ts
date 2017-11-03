import Endpoint from './endpoint';

import MarkerProduct from '../models/marker-product';

const ENDPOINT_IDENTIFIER = 'markers';

class MarkerEndpoint extends Endpoint implements WSFramework.Endpoint {
  constructor(logger: WSFramework.Logger) {
    super(logger);
  }

  protected _execute(request: any, response: any): Promise<object> {
    this.logger.audit('API REQUEST', `Attempting to fetch mark for user: ${request.user}`);

    let meta = {
      agentId: request.params.resourceId,
      productType: request.params.productType,
      productId: request.params.productId
    };

    return this.api.fetchProductMark(meta, request.params.type)
        .then((result) => {
          let marker = MarkerProduct.fromData(result);

          this.logger.audit('API REQUEST', `Successfully fetched mark for user: ${request.user}`);

          response.status(200).send(marker);
        })
        .catch((e) => {
          let error = `Failed to fetch mark with error. ${e}`;

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

export default MarkerEndpoint;