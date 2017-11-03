import ProductModel from './product-model';

class EmailProduct extends ProductModel {
    protected app: string;
    protected from: string;
    protected to: string[];
    protected cc: string[];
    protected bcc: string[];
    protected subject: string;
    protected body: string;
    protected attachments: string[];
    protected timestamp: number;

    static fromData(data: any, appName: string, participants: any) {
        let product = new EmailProduct();

        ProductModel._fromData(product, data);

        product.app = appName;
        product.from = data.from ? participants[data.from].identifier : '';
        product.to = data.to ? data.to.map(pid => participants[pid].identifier) : [];
        product.cc = data.cc ? data.cc.map(pid => participants[pid].identifier) : [];
        product.bcc = data.bcc ? data.bcc.map(pid => participants[pid].identifier) : [];
        product.subject = data.subject;
        product.body = data.body;
        product.attachments = [];
        product.timestamp = data.timestamp;

        return product;
    }
}

export default EmailProduct;