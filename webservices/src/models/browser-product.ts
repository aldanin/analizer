import ProductModel from './product-model';

class BrowserProduct extends ProductModel {
    protected timestamp: number;
    protected name: string;
    protected icon: string;
    protected type: string;
    protected browser: string;
    protected parentId: number;
    protected hitRate: string;
    protected url: string;

    static fromData(data: any) {
        let product = new BrowserProduct();

        ProductModel._fromData(product, data);

        product.timestamp = data.last_access || 0;
        product.name = data.title || 'N/A';
        product.icon = data.browser_type;
        product.type = 'site';
        product.browser = data.browser_type;
        product.parentId = null;
        product.hitRate = data.hit_rate || 0;
        product.url = data.url;

        return product;
    }
}

export default BrowserProduct;