import ProductModel from './product-model';

class ImageProduct extends ProductModel {
    protected date: number;
    protected width: number;
    protected height: number;
    protected path: string;
    protected extracted: number;
    protected thumbnail: string;
    protected url: string;

    static fromData(data: any) {
        let product = new ImageProduct();

        ProductModel._fromData(product, data);

        product.date = data.metadata.date_taken;
        product.width = data.metadata.width;
        product.height = data.metadata.height;
        product.path = data.file_path;
        product.extracted = data.timestamp;
        product.url = data.url;
        product.thumbnail = data.thumbnail;

        return product;
    }
}

export default ImageProduct;