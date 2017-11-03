import Endpoint from './endpoint';

const ENDPOINT_IDENTIFIER = 'delete-tags';

class DeleteTagEndpoint extends Endpoint implements WSFramework.Endpoint {
  constructor(logger: WSFramework.Logger) {
    super(logger);
  }

  protected _execute(request: any, response: any): Promise<object> {
    this.logger.audit('API REQUEST', `Attempting to delete tag for user: ${request.user}`);

    let meta = {
      agentId: request.params.resourceId,
      productType: request.params.productType,
      productId: request.params.productId
    };

    return this.api.deleteProductTag(meta, request.params.tag)
        .then(() => {
          this.logger.audit('API REQUEST', `Successfully deleted tag for user: ${request.user}`);

          response.status(200).send();
        })
        .catch((e) => {
          let error = `Failed to delete tag with error. ${e}`;

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

export default DeleteTagEndpoint;