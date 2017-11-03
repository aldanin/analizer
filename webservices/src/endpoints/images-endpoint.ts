import Endpoint from './endpoint';

import ImageProduct from '../models/image-product';

const ENDPOINT_IDENTIFIER = 'image';

class ImageEndpoint extends Endpoint implements WSFramework.Endpoint {
    constructor(logger: WSFramework.Logger) {
        super(logger);
    }

    protected _execute(request: any, response: any): Promise<object> {
        this.logger.audit('API REQUEST', `Attempting to fetch image products for user: ${request.user}`);

        let meta = {agentId: request.params.resourceId};

        let pagination = {
            limit: request.query.limit || 10,
            skip: request.query.skip || 0
        };

        let reqHandler = this.api.fetchGalleryProducts.bind(this.api);

        if (request.params.type === 'snapshots') {
            reqHandler = this.api.fetchSnapshotsProducts.bind(this.api);
        }

        return reqHandler(meta, pagination)
            .map((product) => ImageProduct.fromData(product))
            .map((product) => {
                if (!product.thumbnail) return product;

                return this.fetchImageThumbnailBase64(meta, product.thumbnail).then((data) => {
                    product.url = data;

                    return product;
                });
            })
            .then((result) => {
                this.logger.audit('API REQUEST', `Successfully fetched image products for user: ${request.user}`);

                response.status(200).send(result);
            })
            .catch((e) => {
                let error = `Failed to fetch image products with error. ${e}`;

                this.logger.audit('API REQUEST', error);

                // We want the error to propagate
                throw e;
            });
    }

    protected fetchImageThumbnailBase64(meta: object, thumbnailId: string) {
        return this.api.fetchFile(meta, thumbnailId)
            .then((thumbnail) => `data:image/gif;base64,${thumbnail.toString('base64')}`);
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

export default ImageEndpoint;