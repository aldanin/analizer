import ProductModel from './product-model';

class MarkerProduct extends ProductModel {
    protected key: string;
    protected value: string;

    static fromData(data: any) {
        let product = new MarkerProduct();

        product.key = data.markkey;
        product.value = data.markvalue;

        return product;
    }
}

export default MarkerProduct;