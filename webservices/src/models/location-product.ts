import {Location} from '../common/types/Location';

import ProductModel from './product-model';

class LocationProduct extends ProductModel {
    public latitude: number;
    public longitude: number;
    public timestamp: number;

    static fromData(data: any): Location {
        let product = new LocationProduct();

        ProductModel._fromData(product, data);

        product.latitude = data.latitude;
        product.longitude = data.longitude;
        product.timestamp = data.timestamp;

        return product;
    }
}

export default LocationProduct;