import Model from './model';

interface ProductMetaInterface {
    _id: string
    producttags: string[]
    starred: boolean
    read: boolean
}

class ProductModel extends Model {
    public id: string;
    public tags: string[];
    public isFavorite: boolean;
    public isRead: boolean;

    static _fromData(product: any, data: ProductMetaInterface, extraData?: any) {
        product.id = data._id;
        product.tags = data.producttags || [];
        product.isFavorite = Boolean(data.starred);
        product.isRead = Boolean(data.read);
    }
}

export default ProductModel;
