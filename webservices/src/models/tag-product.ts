import ProductModel from './product-model';

class TagProduct extends ProductModel {
    tags: string[];

    static fromData(data: any) {
        let product = new TagProduct();

        ProductModel._fromData(product, data);

        product.tags = data.producttags ? data.producttags : [];

        return product;
    }
}

export default TagProduct;