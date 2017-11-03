import * as Promise from 'bluebird';

import Endpoint from './endpoint';

class ProductEndpoint extends Endpoint {
    constructor(logger: WSFramework.Logger) {
        super(logger);
    }

    protected attachProductMeta(product: any) {
        let productMeta: any = {
            isFavorite: true,
            isRead: true
        };

        return(<any>Object).assign(product, productMeta);
    }
}

export default ProductEndpoint;